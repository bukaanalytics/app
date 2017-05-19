package com.github.bukaanalytics.common.model;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;

import com.github.bukaanalytics.common.HTTPRequestHelper;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by fawwaz.muhammad on 05/05/17.
 */

public class BukaAnalyticsSqliteOpenHelper extends SQLiteOpenHelper {
    // debugging only
    private String TAG = "BASqliteOpenHelper";

    // Database Info
    private static final String DATABASE_NAME = "baDatabase";
    private static final int DATABASE_VERSION = 1;

    // Table Names
    private static final String TABLE_USERS = "users";
    private static final String TABLE_PRODUCTS = "products";
    private static final String TABLE_STATS = "stats";

    //User Table Columns
    private static final String KEY_USER_ID = "seller_id";
    private static final String KEY_USER_NAME = "name";

    // Product Table Columns
    private static final String KEY_PRODUCT_ID = "product_id";
    private static final String KEY_PRODUCT_NAME = "name";
    private static final String KEY_PRODUCT_PRICE = "price";
    private static final String KEY_PRODUCT_SELLERID = "seller_id";

    // Stat Table Columns
    private static final String KEY_STAT_ID = "id";
    private static final String KEY_STAT_DATE = "date";
    private static final String KEY_STAT_DAYNAME = "day_name";
    private static final String KEY_STAT_PRODUCTID = "product_id";
    private static final String KEY_STAT_VIEWCOUNT = "view_count";
    private static final String KEY_STAT_VIEWTOTAL = "view_total";
    private static final String KEY_STAT_SOLDCOUNT = "sold_count";
    private static final String KEY_STAT_SOLDTOTAL = "sold_total";
    private static final String KEY_STAT_INTERESTCOUNT = "interest_count";
    private static final String KEY_STAT_INTERESTTOTAL = "interest_total";

    private static final String MLAB_API_KEY = "8wDpSrJX4XU4tX_ff56Y39I98Tnn4xb0";

    // Instance
    private static BukaAnalyticsSqliteOpenHelper sInstance;

    private BukaAnalyticsSqliteOpenHelper(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        Log.d(TAG, "onCreate: mau exec CREATE TABLE");

        String CREATE_USERS_TABLE = "CREATE TABLE IF NOT EXISTS " + TABLE_USERS +
                "(" +
                KEY_USER_ID + " INTEGER PRIMARY KEY," + // Define a primary key
                KEY_USER_NAME + " TEXT" +
                ")";

        String CREATE_PRODUCTS_TABLE = "CREATE TABLE IF NOT EXISTS " + TABLE_PRODUCTS +
                "(" +
                KEY_PRODUCT_ID + " TEXT PRIMARY KEY," +
                KEY_PRODUCT_NAME + " TEXT," +
                KEY_PRODUCT_PRICE + " INTEGER," +
                KEY_PRODUCT_SELLERID + " INTEGER," +
                "FOREIGN KEY("+KEY_PRODUCT_SELLERID+") REFERENCES "+TABLE_USERS+"("+KEY_USER_ID+")"+
                ")";

        String CREATE_STAT_TABLE = "CREATE TABLE IF NOT EXISTS " + TABLE_STATS +
                "(" +
                KEY_STAT_ID + " INTEGER PRIMARY KEY," +
                KEY_STAT_DATE + " TEXT," +
                KEY_STAT_DAYNAME + " TEXT," +
                KEY_STAT_PRODUCTID + " TEXT," +
                KEY_STAT_VIEWCOUNT + " INTEGER," +
                KEY_STAT_VIEWTOTAL + " INTEGER," +
                KEY_STAT_SOLDCOUNT + " INTEGER," +
                KEY_STAT_SOLDTOTAL + " INTEGER," +
                KEY_STAT_INTERESTCOUNT + " INTEGER," +
                KEY_STAT_INTERESTTOTAL + " INTEGER," +
                "FOREIGN KEY("+KEY_STAT_PRODUCTID+") REFERENCES "+TABLE_PRODUCTS+"("+KEY_PRODUCT_ID+")"+
                ")";

        db.execSQL(CREATE_USERS_TABLE);
        db.execSQL(CREATE_PRODUCTS_TABLE);
        db.execSQL(CREATE_STAT_TABLE);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        if (oldVersion != newVersion) {
            // Simplest implementation is to drop all old tables and recreate them
            db.execSQL("DROP TABLE IF EXISTS " + TABLE_USERS);
            db.execSQL("DROP TABLE IF EXISTS " + TABLE_PRODUCTS);
            db.execSQL("DROP TABLE IF EXISTS " + TABLE_STATS);
            onCreate(db);
        }
    }

    public static synchronized BukaAnalyticsSqliteOpenHelper getInstance(Context context) {
        // Use the application context, which will ensure that you
        // don't accidentally leak an Activity's context.
        // See this article for more information: http://bit.ly/6LRzfx
        if (sInstance == null) {
            sInstance = new BukaAnalyticsSqliteOpenHelper(context.getApplicationContext());
        }
        return sInstance;
    }

    public void addStat(Stat stat){
        SQLiteDatabase db = getWritableDatabase();

        // It's a good idea to wrap our insert in a transaction. This helps with performance and ensures
        // consistency of the database.
        db.beginTransaction();
        try {
            ContentValues values = new ContentValues();
            values.put(KEY_STAT_DATE, stat.date);
            values.put(KEY_STAT_DAYNAME, stat.dayName);
            values.put(KEY_STAT_PRODUCTID, stat.productId);
            values.put(KEY_STAT_VIEWCOUNT, stat.viewCount);
            values.put(KEY_STAT_VIEWTOTAL, stat.totalViewCount);
            values.put(KEY_STAT_SOLDCOUNT, stat.soldCount);
            values.put(KEY_STAT_SOLDTOTAL, stat.totalSoldCount);
            values.put(KEY_STAT_INTERESTCOUNT, stat.interestCount);
            values.put(KEY_STAT_INTERESTTOTAL, stat.totalInterestCount);


            // Notice how we haven't specified the primary key. SQLite auto increments the primary key column.
            db.insertOrThrow(TABLE_STATS, null, values);
            db.setTransactionSuccessful();
        }
        catch (SQLException e) {
            Log.d(TAG, "SQLException: " + e.getMessage());
        }
        catch (Exception e) {
            Log.d(TAG, "Error while trying to add post to database: " + e.getMessage());
        } finally {
            db.endTransaction();
        }
    }

    public void addProduct(Product product){
        SQLiteDatabase db = getWritableDatabase();

        // It's a good idea to wrap our insert in a transaction. This helps with performance and ensures
        // consistency of the database.
        db.beginTransaction();
        try {
            ContentValues values = new ContentValues();
            values.put(KEY_PRODUCT_ID, product.id);
            values.put(KEY_PRODUCT_NAME, product.name);
            values.put(KEY_PRODUCT_PRICE, product.price);
            values.put(KEY_PRODUCT_SELLERID, product.sellerId);

            // Notice how we haven't specified the primary key. SQLite auto increments the primary key column.
            db.insertOrThrow(TABLE_PRODUCTS, null, values);
            db.setTransactionSuccessful();
        }
        catch (SQLException e) {
            Log.d(TAG, "SQLException: " + e.getMessage());
        }
        catch (Exception e) {
            Log.d(TAG, "Error while trying to add post to database: " + e.getMessage());
        } finally {
            db.endTransaction();
        }
    }

    public void addUser(User user){
        SQLiteDatabase db = getWritableDatabase();

        // It's a good idea to wrap our insert in a transaction. This helps with performance and ensures
        // consistency of the database.
        db.beginTransaction();
        try {
            ContentValues values = new ContentValues();
            values.put(KEY_USER_ID, user.id);
            values.put(KEY_USER_NAME, user.name);

            // Notice how we haven't specified the primary key. SQLite auto increments the primary key column.
            db.insertOrThrow(TABLE_USERS, null, values);
            db.setTransactionSuccessful();
        }
        catch (SQLException e) {
            Log.d(TAG, "SQLException: " + e.getMessage());
        }
        catch (Exception e) {
            Log.d(TAG, "Error while trying to add post to database: " + e.getMessage());
        } finally {
            db.endTransaction();
        }
    }

    public List<Product> getProducts(int userId) {
        List<Product> products = new ArrayList<>();

        // SELECT * FROM POSTS
        // LEFT OUTER JOIN USERS
        // ON POSTS.KEY_POST_USER_ID_FK = USERS.KEY_USER_ID
        String PRODUCTS_SELECT_QUERY =
                String.format("SELECT * FROM %s WHERE %s = %d", TABLE_PRODUCTS, KEY_PRODUCT_SELLERID, userId);

        // "getReadableDatabase()" and "getWriteableDatabase()" return the same object (except under low
        // disk space scenarios)
        SQLiteDatabase db = getReadableDatabase();
        Cursor cursor = db.rawQuery(PRODUCTS_SELECT_QUERY, null);
        try {
            if (cursor.moveToFirst()) {
                do {
                    Product newProduct = new Product(cursor.getString(cursor.getColumnIndex(KEY_PRODUCT_ID)),
                                                        cursor.getString(cursor.getColumnIndex(KEY_PRODUCT_NAME)),
                                                        cursor.getInt(cursor.getColumnIndex(KEY_PRODUCT_PRICE)),
                                                        cursor.getInt(cursor.getColumnIndex(KEY_PRODUCT_SELLERID)));
                    products.add(newProduct);
                } while(cursor.moveToNext());
            }
        } catch (Exception e) {
            Log.d(TAG, "Error while trying to get products from database");
        } finally {
            if (cursor != null && !cursor.isClosed()) {
                cursor.close();
            }
        }
        return products;
    }

    public List<Stat> getStats(String productId) {
        List<Stat> stats = new ArrayList<>();

        String STATS_SELECT_QUERY =
                String.format("SELECT * FROM %s WHERE %s = '%s'", TABLE_STATS, KEY_STAT_PRODUCTID, productId);

        SQLiteDatabase db = getReadableDatabase();
        Cursor cursor = db.rawQuery(STATS_SELECT_QUERY, null);
        try {
            if (cursor.moveToFirst()) {
                do {
                    Stat newStat = new Stat(cursor.getString(cursor.getColumnIndex(KEY_STAT_DATE)),
                            cursor.getString(cursor.getColumnIndex(KEY_STAT_DAYNAME)),
                            cursor.getString(cursor.getColumnIndex(KEY_STAT_PRODUCTID)),
                            cursor.getInt(cursor.getColumnIndex(KEY_STAT_VIEWCOUNT)),
                            cursor.getInt(cursor.getColumnIndex(KEY_STAT_VIEWTOTAL)),
                            cursor.getInt(cursor.getColumnIndex(KEY_STAT_SOLDCOUNT)),
                            cursor.getInt(cursor.getColumnIndex(KEY_STAT_SOLDTOTAL)),
                            cursor.getInt(cursor.getColumnIndex(KEY_STAT_INTERESTCOUNT)),
                            cursor.getInt(cursor.getColumnIndex(KEY_STAT_INTERESTTOTAL)));
                    stats.add(newStat);
                } while(cursor.moveToNext());
            }
        } catch (Exception e) {
            Log.d(TAG, "Error while trying to get stats from database");
        } finally {
            if (cursor != null && !cursor.isClosed()) {
                cursor.close();
            }
        }
        return stats;
    }

    public void fetchUsers(final Context context) {

        HTTPRequestHelper httpRequestHelper = new HTTPRequestHelper();
        httpRequestHelper.getAsJSONArray("https://api.mlab.com/api/1/databases/bukaanalytics/collections/users?apiKey=" + MLAB_API_KEY,
            context.getApplicationContext(), new HTTPRequestHelper.JSONArrayCallback() {
                @Override
                public void onCompleted(Exception e, JsonArray result) {
                    BukaAnalyticsSqliteOpenHelper db = BukaAnalyticsSqliteOpenHelper.getInstance(context);
                    for (int i = 0; i < result.size(); i++) {
                        JsonObject product = result.get(i).getAsJsonObject();
                        int id = product.get("seller_id").getAsInt();
                        String name = product.get("name").getAsString();
                        User newUser = new User(id, name);

                        db.addUser(newUser);
                    }
                }
            });
    }

    public void fetchUser(int userId, final Context context) {

        HTTPRequestHelper httpRequestHelper = new HTTPRequestHelper();
        httpRequestHelper.getAsJSONArray("https://api.mlab.com/api/1/databases/bukaanalytics/collections/users?q={'seller_id':" + userId + "}&apiKey=" + MLAB_API_KEY,
                context.getApplicationContext(), new HTTPRequestHelper.JSONArrayCallback() {
                    @Override
                    public void onCompleted(Exception e, JsonArray result) {
                        BukaAnalyticsSqliteOpenHelper db = BukaAnalyticsSqliteOpenHelper.getInstance(context);

                        JsonObject product = result.get(0).getAsJsonObject();
                        int id = product.get("seller_id").getAsInt();
                        String name = product.get("name").getAsString();
                        User newUser = new User(id, name);

                        db.addUser(newUser);
                    }
                });
    }

    public void fetchProductsAndStats(int userId, final Context context) {
//        String query = "{'seller_id':" + userId + "}";
        HTTPRequestHelper httpRequestHelper = new HTTPRequestHelper();
        httpRequestHelper.getAsJSONArray("https://api.mlab.com/api/1/databases/bukaanalytics/collections/products?q={'seller_id':" + userId + "}&apiKey=" + MLAB_API_KEY,
            context.getApplicationContext(), new HTTPRequestHelper.JSONArrayCallback() {
                @Override
                public void onCompleted(Exception e, JsonArray result) {
                Log.d(TAG, "fetchProductsAndStats onCompleted: " + result);
                BukaAnalyticsSqliteOpenHelper db = BukaAnalyticsSqliteOpenHelper.getInstance(context);
                ArrayList<Product> productList = new ArrayList<Product>();
                for (int i = 0; i < result.size(); i++) {
                    JsonObject product = result.get(i).getAsJsonObject();
                    String id = product.get("product_id").getAsString();
                    String name = product.get("name").getAsString();
                    int price = product.get("price").getAsInt();
                    int sellerId = product.get("seller_id").getAsInt();
                    Product newProduct = new Product(id, name, price, sellerId);

                    productList.add(newProduct);
                    db.addProduct(newProduct);
                }
                fetchStats(productList, context);
                }
            });
    }

    public void fetchStats(ArrayList<Product> products, final Context context) {
        for (int i = 0; i < products.size(); i++) {
            HTTPRequestHelper httpRequestHelper = new HTTPRequestHelper();
            Log.d(TAG, "https://api.mlab.com/api/1/databases/bukaanalytics/collections/stats?q={'product_id':" + products.get(i).id + "}&apiKey=" + MLAB_API_KEY);
            httpRequestHelper.getAsJSONArray("https://api.mlab.com/api/1/databases/bukaanalytics/collections/stats?q={'product_id':'" + products.get(i).id + "'}&apiKey=" + MLAB_API_KEY,
                context.getApplicationContext(), new HTTPRequestHelper.JSONArrayCallback() {
                    @Override
                    public void onCompleted(Exception e, JsonArray result) {
                        Log.d(TAG, "fetchStats onCompleted: " + result);
                        BukaAnalyticsSqliteOpenHelper db = BukaAnalyticsSqliteOpenHelper.getInstance(context);
                        for (int i = 0; i < result.size(); i++) {
                            JsonObject stat = result.get(i).getAsJsonObject();
                            String date = stat.get("date").getAsString();
                            String dayName = stat.get("day_name").getAsString();
                            String productId = stat.get("product_id").getAsString();
                            int viewCount = stat.get("view_count").getAsInt();
                            int viewTotal = stat.get("view_total").getAsInt();
                            int soldCount = stat.get("sold_count").getAsInt();
                            int soldTotal = stat.get("sold_total").getAsInt();
                            int interestCount = stat.get("interest_count").getAsInt();
                            int interestTotal = stat.get("interest_total").getAsInt();
                            Stat newStat = new Stat(date, dayName, productId, viewCount, viewTotal, soldCount, soldTotal, interestCount, interestTotal);

                            db.addStat(newStat);
                        }

                    }
                });
        }
    }

}
