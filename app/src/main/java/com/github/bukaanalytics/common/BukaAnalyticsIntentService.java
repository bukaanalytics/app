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

import java.text.SimpleDateFormat;
import java.util.Calendar;

/**
 * Created by fawwaz.muhammad on 05/05/17.
 */

public class BukaAnalyticsIntentService extends IntentService {
    public BukaAnalyticsIntentService() {
        super("BukaAnalytics");
    }

    private void findTopStories() {
        Ion.with(getApplicationContext())
                .load("https://hacker-news.firebaseio.com/v0/topstories.json")
                .asJsonArray()
                .setCallback(new FutureCallback<JsonArray>() {
                    @Override
                    public void onCompleted(Exception e, JsonArray result) {
                        String topStoryId = result.get(0).getAsString();
                        getStory(topStoryId);
                    }
                });
    }

    private void getStory(String storyId){
        Ion.with(getApplicationContext())
                .load("https://hacker-news.firebaseio.com/v0/item/"+storyId+".json")
                .asJsonObject()
                .setCallback(new FutureCallback<JsonObject>() {
                    @Override
                    public void onCompleted(Exception e, JsonObject result) {
                        String title = result.get("title").getAsString();

                        Calendar calendar = Calendar.getInstance();
                        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MMM-dd HH:mm");
                        String time = sdf.format(calendar.getTime());

                        Post hnpost = new Post();
                        hnpost.text = time + " >> " + title;

                        BukaAnalyticsSqliteOpenHelper db = BukaAnalyticsSqliteOpenHelper.getInstance(getApplicationContext());
                        db.addPost(hnpost);

                    }
                });
    }

    @Override
    protected void onHandleIntent(@Nullable Intent intent) {
        findTopStories();
        WakefulBroadcastReceiver.completeWakefulIntent(intent);
    }
}
