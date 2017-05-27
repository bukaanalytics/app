package com.github.bukaanalytics.widget;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.nfc.Tag;
import android.util.Log;
import android.widget.RemoteViews;

import com.github.bukaanalytics.R;
import com.github.bukaanalytics.common.HTTPRequestHelper;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Random;

/**
 * Created by fawwaz.muhammad on 04/05/17.
 */

public class BukaAnalyticsAppWidgetProvider extends AppWidgetProvider {

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        final int count = appWidgetIds.length;
        int newOrder = 0;

        for (int i = 0; i < count; i++) {
            int widgetId = appWidgetIds[i];

            RemoteViews remoteViews = new RemoteViews(context.getPackageName(), R.layout.widget);

            getUnread(context, appWidgetManager, remoteViews, widgetId);
            getNotifByType("report", context, appWidgetManager, remoteViews, widgetId);
            getNotifByType("nego", context, appWidgetManager, remoteViews, widgetId);

            Intent intent = new Intent(context, BukaAnalyticsAppWidgetProvider.class);
            intent.setAction(AppWidgetManager.ACTION_APPWIDGET_UPDATE);
            intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, appWidgetIds);

            PendingIntent pendingIntent = PendingIntent.getBroadcast(context,
                    0, intent, PendingIntent.FLAG_UPDATE_CURRENT);

//            appWidgetManager.updateAppWidget(widgetId, remoteViews);
        }
    }

    private void getUnread(Context context, final AppWidgetManager appWidgetManager, final RemoteViews remoteViews, final int widgetId) {
        HTTPRequestHelper helper = new HTTPRequestHelper();
        helper.getAsJSONObject("https://api.bukalapak.com/v2/notifications/unreads.json", context.getApplicationContext(), new HTTPRequestHelper.JSONObjectCallback() {
            @Override
            public void onCompleted(Exception e, JsonObject result) {
                String needAction = result.get("transactions_need_action_as_seller").getAsString();
                String unreadMsg = result.get("messages").getAsString();

                remoteViews.setTextViewText(R.id.textView_content_need_action, needAction);
                remoteViews.setTextViewText(R.id.textView_content_unread_msg, unreadMsg);

                appWidgetManager.updateAppWidget(widgetId, remoteViews);
            }
        });
    }

    private void getNotifByType(final String type, Context context, final AppWidgetManager appWidgetManager, final RemoteViews remoteViews, final int widgetId) {
        HTTPRequestHelper helper = new HTTPRequestHelper();
        String url = "https://api.bukalapak.com/v2/notifications/list.json?type[]=" + type;
        String url2 = "https://api.bukalapak.com/v2/notifications/list.json?type[]=nego";
        helper.getAsJSONObject(url2, context.getApplicationContext(), new HTTPRequestHelper.JSONObjectCallback() {
            @Override
            public void onCompleted(Exception e, JsonObject result) {
                JsonArray data = result.get("data").getAsJsonArray();
                String statStr = String.valueOf(data.size());

                if (type.equals("report")) {
                    remoteViews.setTextViewText(R.id.textView_content_complaint, statStr);
                } else if (type.equals("nego")) {
                    remoteViews.setTextViewText(R.id.textView_content_nego, statStr);
                }

                appWidgetManager.updateAppWidget(widgetId, remoteViews);
            }
        });
    }
}
