package com.github.bukaanalytics.common;

import android.app.IntentService;
import android.content.Intent;
import android.support.annotation.Nullable;

import com.github.bukaanalytics.common.model.BukaAnalyticsSqliteOpenHelper;
import com.github.bukaanalytics.common.model.Product;
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

    private void addProducts() {
//        Ion.with(getApplicationContext())
//                .load("https://api.bukalapak.com/v2/users/7183893/products.json")
//                .asJsonObject()
//                .setCallback(new FutureCallback<JsonObject>() {
//                    @Override
//                    public void onCompleted(Exception e, JsonObject result) {
//                        JsonArray products = result.getAsJsonArray("products");
//                        for (int i = 0; i < products.size(); i++) {
//                            JsonObject product = products.get(i).getAsJsonObject();
//                            String id = product.get("id").getAsString();
//                            String name = product.get("name").getAsString();
//                            String sellerId = product.get("seller_id").getAsString();
//
//                            Product newProduct = new Product(id, name, sellerId);
//                            BukaAnalyticsSqliteOpenHelper db = BukaAnalyticsSqliteOpenHelper.getInstance(getApplicationContext());
//
//                            db.addProduct(newProduct);
//                        }
//                    }
//                });
    }

    @Override
    protected void onHandleIntent(@Nullable Intent intent) {
        addProducts();
    }
}
