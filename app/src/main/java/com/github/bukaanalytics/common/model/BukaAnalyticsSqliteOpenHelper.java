package com.github.bukaanalytics.common.model;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.MatrixCursor;
import android.database.SQLException;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.text.TextUtils;
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
    private static final String TABLE_TOKENS = "tokens";

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
    private static final String KEY_STAT_DATEEPOCH = "date_epoch";
    private static final String KEY_STAT_DAYNAME = "day_name";
    private static final String KEY_STAT_PRODUCTID = "product_id";
    private static final String KEY_STAT_VIEWCOUNT = "view_count";
    private static final String KEY_STAT_VIEWTOTAL = "view_total";
    private static final String KEY_STAT_SOLDCOUNT = "sold_count";
    private static final String KEY_STAT_SOLDTOTAL = "sold_total";
    private static final String KEY_STAT_INTERESTCOUNT = "interest_count";
    private static final String KEY_STAT_INTERESTTOTAL = "interest_total";

    private static final String KEY_STAT_MARKETVIEWCOUNT = "market_view_count";
    private static final String KEY_STAT_MARKETVIEWTOTAL = "market_view_total";
    private static final String KEY_STAT_MARKETSOLDCOUNT = "market_sold_count";
    private static final String KEY_STAT_MARKETSOLDTOTAL = "market_sold_total";
    private static final String KEY_STAT_MARKETINTERESTCOUNT = "market_interest_count";
    private static final String KEY_STAT_MARKETINTERESTTOTAL = "market_interest_total";

    // Tokens Table Columns
    private static final String KEY_TOKEN_ID = "id";
    private static final String KEY_TOKEN_USER_ID = "user_id";
    private static final String KEY_TOKEN_TOKEN = "token";

    private static final String MLAB_API_KEY = "8wDpSrJX4XU4tX_ff56Y39I98Tnn4xb0";

    // Instance
    private static BukaAnalyticsSqliteOpenHelper sInstance;

    public BukaAnalyticsSqliteOpenHelper(Context context) {
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
                KEY_STAT_DATEEPOCH + " INTEGER," +
                KEY_STAT_DAYNAME + " TEXT," +
                KEY_STAT_PRODUCTID + " TEXT," +
                KEY_STAT_VIEWCOUNT + " INTEGER," +
                KEY_STAT_VIEWTOTAL + " INTEGER," +
                KEY_STAT_SOLDCOUNT + " INTEGER," +
                KEY_STAT_SOLDTOTAL + " INTEGER," +
                KEY_STAT_INTERESTCOUNT + " INTEGER," +
                KEY_STAT_INTERESTTOTAL + " INTEGER," +
                KEY_STAT_MARKETVIEWCOUNT + " INTEGER," +
                KEY_STAT_MARKETVIEWTOTAL + " INTEGER," +
                KEY_STAT_MARKETSOLDCOUNT + " INTEGER," +
                KEY_STAT_MARKETSOLDTOTAL + " INTEGER," +
                KEY_STAT_MARKETINTERESTCOUNT + " INTEGER," +
                KEY_STAT_MARKETINTERESTTOTAL + " INTEGER," +
                "FOREIGN KEY("+KEY_STAT_PRODUCTID+") REFERENCES "+TABLE_PRODUCTS+"("+KEY_PRODUCT_ID+")"+
                ")";

        String CREATE_TOKENS_TABLE = "CREATE TABLE IF NOT EXISTS " + TABLE_TOKENS +
                "(" +
                KEY_TOKEN_ID + " INTEGER PRIMARY KEY," +
                KEY_TOKEN_USER_ID + " INTEGER," +
                KEY_TOKEN_TOKEN + " TEXT" +
                ")";

        db.execSQL(CREATE_USERS_TABLE);
        db.execSQL(CREATE_PRODUCTS_TABLE);
        db.execSQL(CREATE_STAT_TABLE);
        db.execSQL(CREATE_TOKENS_TABLE);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        if (oldVersion != newVersion) {
            // Simplest implementation is to drop all old tables and recreate them
            db.execSQL("DROP TABLE IF EXISTS " + TABLE_USERS);
            db.execSQL("DROP TABLE IF EXISTS " + TABLE_PRODUCTS);
            db.execSQL("DROP TABLE IF EXISTS " + TABLE_STATS);
            db.execSQL("DROP TABLE IF EXISTS " + TABLE_TOKENS);
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

    public void addStats(List<Stat> stats){
        SQLiteDatabase db = getWritableDatabase();

        // It's a good idea to wrap our insert in a transaction. This helps with performance and ensures
        // consistency of the database.
        db.beginTransaction();
        try {
            for (int i = 0; i < stats.size(); i++) {
                Stat stat = stats.get(i);
                ContentValues values = new ContentValues();
                values.put(KEY_STAT_DATE, stat.date);
                values.put(KEY_STAT_DATEEPOCH, stat.dateEpoch);
                values.put(KEY_STAT_DAYNAME, stat.dayName);
                values.put(KEY_STAT_PRODUCTID, stat.productId);
                values.put(KEY_STAT_VIEWCOUNT, stat.viewCount);
                values.put(KEY_STAT_VIEWTOTAL, stat.totalViewCount);
                values.put(KEY_STAT_SOLDCOUNT, stat.soldCount);
                values.put(KEY_STAT_SOLDTOTAL, stat.totalSoldCount);
                values.put(KEY_STAT_INTERESTCOUNT, stat.interestCount);
                values.put(KEY_STAT_INTERESTTOTAL, stat.totalInterestCount);

                values.put(KEY_STAT_MARKETVIEWCOUNT, stat.marketViewCount);
                values.put(KEY_STAT_MARKETVIEWTOTAL, stat.marketTotalViewCount);
                values.put(KEY_STAT_MARKETSOLDCOUNT, stat.marketSoldCount);
                values.put(KEY_STAT_MARKETSOLDTOTAL, stat.marketTotalSoldCount);
                values.put(KEY_STAT_MARKETINTERESTCOUNT, stat.marketInterestCount);
                values.put(KEY_STAT_MARKETINTERESTTOTAL, stat.marketTotalInterestCount);

                // Notice how we haven't specified the primary key. SQLite auto increments the primary key column.
                db.insertOrThrow(TABLE_STATS, null, values);
            }
            db.setTransactionSuccessful();
        }
        catch (SQLException e) {
            Log.d(TAG, "addStats(), SQLException: " + e.getMessage());
        }
        catch (Exception e) {
            Log.d(TAG, "addStats() Error: " + e.getMessage());
        } finally {
            db.endTransaction();
        }
    }

    public void addProducts(List<Product> products){
        SQLiteDatabase db = getWritableDatabase();

        // It's a good idea to wrap our insert in a transaction. This helps with performance and ensures
        // consistency of the database.
        db.beginTransaction();
        try {
            for (int i = 0; i < products.size(); i++) {
                Product product = products.get(i);
                ContentValues values = new ContentValues();
                values.put(KEY_PRODUCT_ID, product.id);
                values.put(KEY_PRODUCT_NAME, product.name);
                values.put(KEY_PRODUCT_PRICE, product.price);
                values.put(KEY_PRODUCT_SELLERID, product.sellerId);

                // Notice how we haven't specified the primary key. SQLite auto increments the primary key column.
                db.insertOrThrow(TABLE_PRODUCTS, null, values);
            }
            db.setTransactionSuccessful();
        }
        catch (SQLException e) {
            Log.d(TAG, "addProducts(), SQLException: " + e.getMessage());
        }
        catch (Exception e) {
            Log.d(TAG, "addProducts() Error: " + e.getMessage());
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
            Log.d(TAG, "addUser(), SQLException: " + e.getMessage());
        }
        catch (Exception e) {
            Log.d(TAG, "addUser Error: " + e.getMessage());
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
            if(cursor != null && cursor.getCount() > 0) {
                if (cursor.moveToFirst()) {
                    do {
                        Product newProduct = new Product(cursor.getString(cursor.getColumnIndex(KEY_PRODUCT_ID)),
                                cursor.getString(cursor.getColumnIndex(KEY_PRODUCT_NAME)),
                                cursor.getInt(cursor.getColumnIndex(KEY_PRODUCT_PRICE)),
                                cursor.getInt(cursor.getColumnIndex(KEY_PRODUCT_SELLERID)));
                        products.add(newProduct);
                    } while(cursor.moveToNext());
                }
            }
        } catch (Exception e) {
            Log.d(TAG, "getProducts() Error: " + e.getMessage());
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
            if(cursor != null && cursor.getCount() > 0) {
                if (cursor.moveToFirst()) {
                    do {
                        Stat newStat = new Stat(cursor.getString(cursor.getColumnIndex(KEY_STAT_DATE)),
                                cursor.getInt(cursor.getColumnIndex(KEY_STAT_DATEEPOCH)),
                                cursor.getString(cursor.getColumnIndex(KEY_STAT_DAYNAME)),
                                cursor.getString(cursor.getColumnIndex(KEY_STAT_PRODUCTID)),
                                cursor.getInt(cursor.getColumnIndex(KEY_STAT_VIEWCOUNT)),
                                cursor.getInt(cursor.getColumnIndex(KEY_STAT_VIEWTOTAL)),
                                cursor.getInt(cursor.getColumnIndex(KEY_STAT_SOLDCOUNT)),
                                cursor.getInt(cursor.getColumnIndex(KEY_STAT_SOLDTOTAL)),
                                cursor.getInt(cursor.getColumnIndex(KEY_STAT_INTERESTCOUNT)),
                                cursor.getInt(cursor.getColumnIndex(KEY_STAT_INTERESTTOTAL)),
                                cursor.getInt(cursor.getColumnIndex(KEY_STAT_MARKETVIEWCOUNT)),
                                cursor.getInt(cursor.getColumnIndex(KEY_STAT_MARKETVIEWTOTAL)),
                                cursor.getInt(cursor.getColumnIndex(KEY_STAT_MARKETSOLDCOUNT)),
                                cursor.getInt(cursor.getColumnIndex(KEY_STAT_MARKETSOLDTOTAL)),
                                cursor.getInt(cursor.getColumnIndex(KEY_STAT_MARKETINTERESTCOUNT)),
                                cursor.getInt(cursor.getColumnIndex(KEY_STAT_MARKETINTERESTTOTAL)));
                        stats.add(newStat);
                    } while(cursor.moveToNext());
                }
            }
        } catch (Exception e) {
            Log.d(TAG, "getStats() Error: " + e.getMessage());
        } finally {
            if (cursor != null && !cursor.isClosed()) {
                cursor.close();
            }
        }
        return stats;
    }

    public void deleteStats(String[] productIds) {
        if(productIds.length > 0){
            SQLiteDatabase db = getWritableDatabase();

            db.beginTransaction();
            try {
                String joined = TextUtils.join("\",\"",productIds);
                String args = "\"" + joined + "\"";
                String query = String.format("DELETE FROM %s WHERE %s IN (%s)", TABLE_STATS, KEY_STAT_PRODUCTID, args);
                db.execSQL(query);

                db.setTransactionSuccessful();
            }
            catch (SQLException e) {
                Log.d(TAG, "deleteStats(), SQLException: " + e.getMessage());
            }
            catch (Exception e) {
                Log.d(TAG, "deleteStats Error: " + e.getMessage());
            } finally {
                db.endTransaction();
            }
        }
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

    public ArrayList<Cursor> getData(String Query){
        //get writable database
        SQLiteDatabase sqlDB = this.getWritableDatabase();
        String[] columns = new String[] { "message" };
        //an array list of cursor to save two cursors one has results from the query
        //other cursor stores error message if any errors are triggered
        ArrayList<Cursor> alc = new ArrayList<Cursor>(2);
        MatrixCursor Cursor2= new MatrixCursor(columns);
        alc.add(null);
        alc.add(null);

        try{
            String maxQuery = Query ;
            //execute the query results will be save in Cursor c
            Cursor c = sqlDB.rawQuery(maxQuery, null);

            //add value to cursor2
            Cursor2.addRow(new Object[] { "Success" });

            alc.set(1,Cursor2);
            if (null != c && c.getCount() > 0) {

                alc.set(0,c);
                c.moveToFirst();

                return alc ;
            }
            return alc;
        } catch(SQLException sqlEx){
            Log.d("printing exception", sqlEx.getMessage());
            //if any exceptions are triggered save the error message to cursor an return the arraylist
            Cursor2.addRow(new Object[] { ""+sqlEx.getMessage() });
            alc.set(1,Cursor2);
            return alc;
        } catch(Exception ex){
            Log.d("printing exception", ex.getMessage());

            //if any exceptions are triggered save the error message to cursor an return the arraylist
            Cursor2.addRow(new Object[] { ""+ex.getMessage() });
            alc.set(1,Cursor2);
            return alc;
        }
    }
}
