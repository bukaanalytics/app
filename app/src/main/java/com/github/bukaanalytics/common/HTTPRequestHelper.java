package com.github.bukaanalytics.common;

import android.content.Context;
import android.util.Log;

import com.google.gson.JsonArray;
import com.koushikdutta.async.future.FutureCallback;
import com.koushikdutta.ion.Ion;

/**
 * Created by touchtenmac-19 on 5/11/17.
 */

public class HTTPRequestHelper {

    private String TAG = "HTTPRequestHelper";

    public interface JSONArrayCallback {
        void onCompleted(Exception e, JsonArray result);
    }

    private JSONArrayCallback jsonArrayCallback;

    public HTTPRequestHelper() {
        this.jsonArrayCallback = null;
    }

    public void getAsJSONArray(String URL, final Context context, final JSONArrayCallback callback) {
        this.jsonArrayCallback = callback;

        Ion.with(context)
        .load(URL)
        .asJsonArray()
        .setCallback(new FutureCallback<JsonArray>() {
            @Override
            public void onCompleted(Exception e, JsonArray result) {
                Log.d(TAG, "onCompleted: "+result);
                jsonArrayCallback.onCompleted(e, result);
            }
        });

    }
}
