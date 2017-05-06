package com.github.bukaanalytics.common;

import android.content.Context;
import android.content.Intent;
import android.support.v4.content.WakefulBroadcastReceiver;

/**
 * Created by fawwaz.muhammad on 05/05/17.
 */

public class BukaAnalyticsWakefulBroadcastReceiver extends WakefulBroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        Intent i = new Intent(context, BukaAnalyticsIntentService.class);
        startWakefulService(context,i);
    }

}
