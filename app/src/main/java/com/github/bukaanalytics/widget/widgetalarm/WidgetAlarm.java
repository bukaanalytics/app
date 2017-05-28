package com.github.bukaanalytics.widget.widgetalarm;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;

import com.github.bukaanalytics.common.BukaAnalyticsBroadcastReceiver;
import com.github.bukaanalytics.widget.BukaAnalyticsAppWidgetProvider;

/**
 * Created by touchtenmac-19 on 5/26/17.
 */

public class WidgetAlarm {
    private final int ALARM_ID = 0;
    private final int INTERVAL_MILLIS = 10000;

    private Context mContext;


    public WidgetAlarm(Context context)
    {
        mContext = context;
    }


    public void startAlarm()
    {
        // Construct an intent that will execute the AlarmReceiver
        Intent intent = new Intent(BukaAnalyticsAppWidgetProvider.ACTION_AUTO_UPDATE);
        // Create a PendingIntent to be triggered when the alarm goes off
        final PendingIntent pIntent = PendingIntent.getBroadcast(
                mContext, ALARM_ID, intent, PendingIntent.FLAG_CANCEL_CURRENT);
        // Setup periodic alarm every every half hour from this point onwards
        long firstMillis = System.currentTimeMillis(); // alarm is set right away
        AlarmManager alarm = (AlarmManager) mContext.getSystemService(Context.ALARM_SERVICE);
        // First parameter is the type: ELAPSED_REALTIME, ELAPSED_REALTIME_WAKEUP, RTC_WAKEUP
        // Interval can be INTERVAL_FIFTEEN_MINUTES, INTERVAL_HALF_HOUR, INTERVAL_HOUR, INTERVAL_DAY
        alarm.setInexactRepeating(AlarmManager.RTC_WAKEUP, firstMillis,
                1000 * 60 * 5, pIntent);
    }


    public void stopAlarm()
    {
        Intent alarmIntent = new Intent(BukaAnalyticsAppWidgetProvider.ACTION_AUTO_UPDATE);
        PendingIntent pendingIntent = PendingIntent.getBroadcast(mContext, ALARM_ID, alarmIntent, PendingIntent.FLAG_CANCEL_CURRENT);

        AlarmManager alarmManager = (AlarmManager) mContext.getSystemService(Context.ALARM_SERVICE);
        alarmManager.cancel(pendingIntent);
    }
}
