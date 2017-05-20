package com.github.bukaanalytics.common;

import android.app.IntentService;
import android.content.Intent;
import android.support.annotation.Nullable;
import android.support.v4.content.WakefulBroadcastReceiver;

import com.github.bukaanalytics.common.model.BukaAnalyticsSqliteOpenHelper;
import com.github.bukaanalytics.common.model.Post;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.koushikdutta.async.future.FutureCallback;
import com.koushikdutta.ion.Ion;

/**
 * Created by fawwaz.muhammad on 05/05/17.
 */

public class BukaAnalyticsIntentService extends IntentService {
    public BukaAnalyticsIntentService() {
        super("BukaAnalytics");
    }

    @Override
    protected void onHandleIntent(@Nullable Intent intent) {
        WakefulBroadcastReceiver.completeWakefulIntent(intent);
    }
}
