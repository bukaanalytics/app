package com.github.bukaanalytics;

import retrofit2.Call;
import retrofit2.http.GET;

/**
 * Created by habibridho on 5/25/17.
 */

public interface ApiInterface {
    @GET("/notifications/unreads.json")
    Call<BLNotif> getUnreadNotifications();
}
