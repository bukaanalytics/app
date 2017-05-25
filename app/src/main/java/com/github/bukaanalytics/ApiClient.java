package com.github.bukaanalytics;

import android.util.Base64;

import java.io.IOException;

import okhttp3.Interceptor;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import retrofit2.Retrofit;

/**
 * Created by habibridho on 5/25/17.
 */

public class ApiClient {
    static Retrofit getClient() {

        OkHttpClient okHttpClient = new OkHttpClient().newBuilder().addInterceptor(new Interceptor() {
            @Override
            public okhttp3.Response intercept(Chain chain) throws IOException {
                Request originalRequest = chain.request();

                String appended = "32856476" + ":" + "9RQ3MbQlP4Fac16iv4e";
                String auth= Base64.encodeToString(appended.getBytes(), Base64.NO_WRAP);
                Request.Builder builder = originalRequest.newBuilder().header("Authorization", auth);

                Request newRequest = builder.build();
                return chain.proceed(newRequest);
            }
        }).build();


        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("https://api.bukalapak.com/v2")
                .client(okHttpClient)
                .build();


        return retrofit;
    }
}
