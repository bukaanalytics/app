package com.github.bukaanalytics.common;

import android.content.Context;
import android.util.Log;

import com.github.bukaanalytics.common.model.Product;
import com.github.bukaanalytics.common.model.Stat;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.koushikdutta.async.future.FutureCallback;
import com.koushikdutta.ion.Ion;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by touchtenmac-19 on 5/11/17.
 */

public class HTTPRequestHelper {

    private String TAG = "HTTPRequestHelper";
    private static final String MLAB_API_KEY = "8wDpSrJX4XU4tX_ff56Y39I98Tnn4xb0";

    public interface JSONArrayCallback {
        void onCompleted(Exception e, JsonArray result);
    }

    public interface ProductsCallback {
        void onCompleted(Exception e, List<Product> productsResult);
    }

    public interface StatsCallback {
        void onCompleted(Exception e, List<Stat> statsResult);
    }

    private JSONArrayCallback jsonArrayCallback;
    private ProductsCallback productsCallback;
    private StatsCallback statsCallback;

    public HTTPRequestHelper() {
        this.jsonArrayCallback = null;
        this.productsCallback = null;
        this.statsCallback = null;
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

    public void fetchProducts(int userId, final Context context, ProductsCallback callback) {
        this.productsCallback = callback;

        getAsJSONArray("https://api.mlab.com/api/1/databases/bukaanalytics/collections/products?q={'seller_id':" + userId + "}&apiKey=" + MLAB_API_KEY,
            context.getApplicationContext(), new JSONArrayCallback() {
                @Override
                public void onCompleted(Exception e, JsonArray result) {
                    ArrayList<Product> productList = new ArrayList<>();
                    if(result != null) {
                        for (int i = 0; i < result.size(); i++) {
                            JsonObject product = result.get(i).getAsJsonObject();
                            String id = product.get("product_id").getAsString();
                            String name = product.get("name").getAsString();
                            int price = product.get("price").getAsInt();
                            int sellerId = product.get("seller_id").getAsInt();
                            Product newProduct = new Product(id, name, price, sellerId);

                            productList.add(newProduct);
                        }
                    }
                    productsCallback.onCompleted(e, productList);
                }
            });
    }

    public void fetchStats(String[] productIds, final Context context, StatsCallback callback) {
        this.statsCallback = callback;

        StringBuilder sb = new StringBuilder();
        if(productIds.length > 0){
            sb.append("[");
            for (int i = 0; i < productIds.length-1; i++) {
                sb.append("\"" + productIds[i] + "\",");
            }
            sb.append("\"" + productIds[productIds.length-1] + "\"]");
        }
        else{
            sb.append("[]");
        }

        getAsJSONArray("https://api.mlab.com/api/1/databases/bukaanalytics/collections/stats?q={'product_id':{'$in':" + sb.toString() + "}}&apiKey=" + MLAB_API_KEY,
                context.getApplicationContext(), new JSONArrayCallback() {
                    @Override
                    public void onCompleted(Exception e, JsonArray result) {
                        ArrayList<Stat> statList = new ArrayList<>();
                        if(result != null) {
                            for (int i = 0; i < result.size(); i++) {
                                JsonObject stat = result.get(i).getAsJsonObject();
                                String date = stat.get("date").getAsString();
                                int dateEpoch = stat.get("date_epoch").getAsInt();
                                String dayName = stat.get("day_name").getAsString();
                                String productId = stat.get("product_id").getAsString();
                                int viewCount = stat.get("view_count").getAsInt();
                                int viewTotal = stat.get("view_total").getAsInt();
                                int soldCount = stat.get("sold_count").getAsInt();
                                int soldTotal = stat.get("sold_total").getAsInt();
                                int interestCount = stat.get("interest_count").getAsInt();
                                int interestTotal = stat.get("interest_total").getAsInt();
                                Stat newStat = new Stat(date, dateEpoch,dayName, productId, viewCount, viewTotal, soldCount, soldTotal, interestCount, interestTotal);

                                statList.add(newStat);
                            }
                        }
                        statsCallback.onCompleted(e, statList);
                    }
                });
    }
}
