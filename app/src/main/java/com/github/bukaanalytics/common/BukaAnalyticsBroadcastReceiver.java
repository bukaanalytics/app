package com.github.bukaanalytics.common;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

/**
 * Created by fawwaz.muhammad on 05/05/17.
 */

public class BukaAnalyticsBroadcastReceiver extends BroadcastReceiver {
    public static final int REQUEST_CODE = 12345;
    public static final String ACTION = "com.github.bukaanalytics.checkapi";

    @Override
    public void onReceive(Context context, Intent intent) {
        Intent i = new Intent(context, BukaAnalyticsIntentService.class);
        context.startService(i);
    }
}
