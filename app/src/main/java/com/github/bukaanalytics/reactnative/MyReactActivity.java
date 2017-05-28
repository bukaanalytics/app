package com.github.bukaanalytics.reactnative;

import android.app.Activity;
import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.KeyEvent;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.common.LifecycleState;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;
import com.facebook.react.shell.MainReactPackage;
import com.github.bukaanalytics.BuildConfig;
import com.github.bukaanalytics.common.BukaAnalyticsBroadcastReceiver;
import com.github.bukaanalytics.common.HTTPRequestHelper;
import com.github.bukaanalytics.common.model.BukaAnalyticsSqliteOpenHelper;
import com.github.bukaanalytics.common.model.Product;
import com.github.bukaanalytics.common.model.Stat;
import com.horcrux.svg.RNSvgPackage;

import org.pgsqlite.SQLitePluginPackage;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by habibridho on 5/4/17.
 */

public class MyReactActivity extends Activity implements DefaultHardwareBackBtnHandler {
    private ReactRootView mReactRootView;
    private ReactInstanceManager mReactInstanceManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        mReactRootView = new ReactRootView(this);
        mReactInstanceManager = ReactInstanceManager.builder()
                .setApplication(getApplication())
                .setBundleAssetName("index.android.bundle")
                .setJSMainModuleName("index.android")
                .addPackage(new MainReactPackage())
                .addPackage(new SQLitePluginPackage())
                .addPackage(new RNSvgPackage())
                .setUseDeveloperSupport(BuildConfig.DEBUG)
                .setInitialLifecycleState(
                        LifecycleState.RESUMED)
                .build();
        mReactRootView.startReactApplication(mReactInstanceManager, "HelloWorld", null);
        fetchData();
        scheduleAlarm();
        setContentView(mReactRootView);
    }

    @Override
    public void invokeDefaultOnBackPressed() {
        super.onBackPressed();
    }


    @Override
    public void onBackPressed() {
        if (mReactInstanceManager != null) {
            mReactInstanceManager.onBackPressed();
        } else {
            super.onBackPressed();
        }
    }
    @Override
    protected void onPause() {
        super.onPause();

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onHostPause(this);
        }
    }

    @Override
    protected void onResume() {
        super.onResume();

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onHostResume(this, this);
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

        if (mReactInstanceManager != null) {
            mReactInstanceManager.onHostDestroy(this);
        }
    }

    @Override
    public boolean onKeyUp(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_MENU && mReactInstanceManager != null) {
            mReactInstanceManager.showDevOptionsDialog();
            return true;
        }
        return super.onKeyUp(keyCode, event);
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
                                  AlarmManager.INTERVAL_HALF_DAY / 4 , pIntent);
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
}
