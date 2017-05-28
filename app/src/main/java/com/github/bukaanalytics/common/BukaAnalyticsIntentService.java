package com.github.bukaanalytics.common;

import android.app.AlarmManager;
import android.app.IntentService;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.support.annotation.Nullable;
import android.support.v4.content.WakefulBroadcastReceiver;

import com.github.bukaanalytics.common.model.BukaAnalyticsSqliteOpenHelper;
import com.github.bukaanalytics.common.model.Product;
import com.github.bukaanalytics.common.model.Stat;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by fawwaz.muhammad on 05/05/17.
 */

public class BukaAnalyticsIntentService extends IntentService {
    public BukaAnalyticsIntentService() {
        super("BukaAnalytics");
    }

    private void fetchData() {
        final int activeUserId = 9925909; //TODO get active userId from login
        final HTTPRequestHelper HTTPHelper = new HTTPRequestHelper();
        final BukaAnalyticsSqliteOpenHelper db = BukaAnalyticsSqliteOpenHelper.getInstance(getApplicationContext());

        //Get product list from cloud database
        HTTPHelper.fetchProducts(activeUserId, getApplicationContext(), new HTTPRequestHelper.ProductsCallback() {
            @Override
            public void onCompleted(Exception e, List<Product> productsResult) {
                if((productsResult != null) && (productsResult.size() > 0)) {
                    //Insert products into local database
                    db.addProducts(productsResult);
                }

                ArrayList<String> productIds= new ArrayList<>();
                //get all productIds
                for (int i = 0; i < productsResult.size(); i++) {
                    productIds.add(productsResult.get(i).id);
                }
                final String[] productIdsArray = productIds.toArray(new String[0]);

                //Get stat list from cloud database, for all product ids
                HTTPHelper.fetchStats(productIdsArray, getApplicationContext(), new HTTPRequestHelper.StatsCallback() {
                    @Override
                    public void onCompleted(Exception e, List<Stat> statsResult) {
                        if((statsResult != null) && (statsResult.size() > 0)) {
                            //Current solution for 'Stats' table without unique column
                            db.deleteStats(productIdsArray);
                            //Insert stats into local database
                            db.addStats(statsResult);
                        }
                    }
                });
            }
        });

    }

    @Override
    protected void onHandleIntent(@Nullable Intent intent) {
        fetchData();
        scheduleAlarm();
        WakefulBroadcastReceiver.completeWakefulIntent(intent);
    }

    private void scheduleAlarm () {
        // Construct an intent that will execute the AlarmReceiver
        Intent intent = new Intent(getApplicationContext(), BukaAnalyticsBroadcastReceiver.class);
        // Create a PendingIntent to be triggered when the alarm goes off
        final PendingIntent pIntent = PendingIntent.getBroadcast(
                this, BukaAnalyticsBroadcastReceiver.REQUEST_CODE,
                intent, PendingIntent.FLAG_UPDATE_CURRENT);
        // Setup periodic alarm every every half hour from this point onwards
        long firstMillis = System.currentTimeMillis(); // alarm is set right away
        AlarmManager alarm = (AlarmManager) this.getSystemService(Context.ALARM_SERVICE);
        // First parameter is the type: ELAPSED_REALTIME, ELAPSED_REALTIME_WAKEUP, RTC_WAKEUP
        // Interval can be INTERVAL_FIFTEEN_MINUTES, INTERVAL_HALF_HOUR, INTERVAL_HOUR, INTERVAL_DAY
        alarm.setInexactRepeating(AlarmManager.RTC_WAKEUP, firstMillis,
                                  AlarmManager.INTERVAL_DAY / 3, pIntent);
    }
}
