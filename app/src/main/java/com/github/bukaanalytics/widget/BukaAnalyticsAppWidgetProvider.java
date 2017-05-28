package com.github.bukaanalytics.widget;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.widget.RemoteViews;

import com.github.bukaanalytics.R;
import com.github.bukaanalytics.common.HTTPRequestHelper;
import com.github.bukaanalytics.widget.widgetalarm.WidgetAlarm;
import com.google.gson.JsonObject;

/**
 * Created by fawwaz.muhammad on 04/05/17.
 */

public class BukaAnalyticsAppWidgetProvider extends AppWidgetProvider {

    public static final String ACTION_AUTO_UPDATE = "AUTO_UPDATE";

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        final int count = appWidgetIds.length;
        int newOrder = 0;

        for (int i = 0; i < count; i++) {
            int widgetId = appWidgetIds[i];

            RemoteViews remoteViews = new RemoteViews(context.getPackageName(), R.layout.widget);

            getUnread(context, appWidgetManager, remoteViews, widgetId);

            Intent intent = new Intent(context, BukaAnalyticsAppWidgetProvider.class);
            intent.setAction(AppWidgetManager.ACTION_APPWIDGET_UPDATE);
            intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, appWidgetIds);

            PendingIntent pendingIntent = PendingIntent.getBroadcast(context,
                    0, intent, PendingIntent.FLAG_UPDATE_CURRENT);

//            appWidgetManager.updateAppWidget(widgetId, remoteViews);
        }
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        super.onReceive(context, intent);
        if(intent.getAction().equals(ACTION_AUTO_UPDATE)) {
            AppWidgetManager.getInstance(context).updateAppWidget(new ComponentName(context, BukaAnalyticsAppWidgetProvider.class), new RemoteViews(context.getPackageName(), R.layout.widget));
        }
    }

    @Override
    public void onEnabled(Context context) {
        WidgetAlarm widgetAlarm = new WidgetAlarm(context);
        widgetAlarm.startAlarm();
    }

    @Override
    public void onDisabled(Context context) {
        WidgetAlarm widgetAlarm = new WidgetAlarm(context);
        widgetAlarm.stopAlarm();
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
}
