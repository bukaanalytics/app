package com.github.bukaanalytics.widget;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.util.Base64;
import android.widget.RemoteViews;

import com.github.bukaanalytics.ApiClient;
import com.github.bukaanalytics.ApiInterface;
import com.github.bukaanalytics.R;

import java.io.IOException;
import java.util.Random;

import okhttp3.Interceptor;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

/**
 * Created by fawwaz.muhammad on 04/05/17.
 */

public class BukaAnalyticsAppWidgetProvider extends AppWidgetProvider {
    ApiInterface apiInterface;

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        final int count = appWidgetIds.length;
        int newOrder = 0;

        for (int i = 0; i < count; i++) {
            int widgetId = appWidgetIds[i];
            String number = String.format("%03d", (new Random().nextInt(900) + 100));
            String newOrderStr = "0";

            RemoteViews remoteViews = new RemoteViews(context.getPackageName(), R.layout.widget);
            remoteViews.setTextViewText(R.id.textView_content_new_order, newOrderStr);
            remoteViews.setTextViewText(R.id.textView_content_unread_msg, number);
            remoteViews.setTextViewText(R.id.textView_content_complaint, number);
            remoteViews.setTextViewText(R.id.textView_content_nego, number);

            Intent intent = new Intent(context, BukaAnalyticsAppWidgetProvider.class);
            intent.setAction(AppWidgetManager.ACTION_APPWIDGET_UPDATE);
            intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, appWidgetIds);

            PendingIntent pendingIntent = PendingIntent.getBroadcast(context,
                    0, intent, PendingIntent.FLAG_UPDATE_CURRENT);

            appWidgetManager.updateAppWidget(widgetId, remoteViews);
        }
    }

    private void getNewOrder() {
        Call call = apiInterface.getUnreadNotifications();
        call.enqueue(new Callback() {
            @Override
            public void onResponse(Call call, Response response) {
                // set new order di sini
            }

            @Override
            public void onFailure(Call call, Throwable t) {

            }
        });
    }
}
