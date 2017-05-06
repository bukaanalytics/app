package com.github.bukaanalytics.common.model;

import android.content.ContentValues;
import android.content.Context;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import android.util.Log;

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
    private static final String TABLE_PRODUCTS = "products";

    // Product Table Columns
    private static final String KEY_PRODUCT_ID = "id";
    private static final String KEY_PRODUCT_NAME = "name";
    private static final String KEY_PRODUCT_SELLERID = "sellerId";

    // Instance
    private static BukaAnalyticsSqliteOpenHelper sInstance;

    private BukaAnalyticsSqliteOpenHelper(Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        String CREATE_POSTS_TABLE = "CREATE TABLE " + TABLE_PRODUCTS +
                "(" +
                KEY_PRODUCT_ID + " STRING PRIMARY KEY," + // Define a primary key
                KEY_PRODUCT_NAME + " TEXT" +
                ")";
        db.execSQL(CREATE_POSTS_TABLE);
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        if (oldVersion != newVersion) {
            // Simplest implementation is to drop all old tables and recreate them
            db.execSQL("DROP TABLE IF EXISTS " + TABLE_PRODUCTS);
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

    public void addProduct(Product product){
        SQLiteDatabase db = getWritableDatabase();

        // It's a good idea to wrap our insert in a transaction. This helps with performance and ensures
        // consistency of the database.
        db.beginTransaction();
        try {
            ContentValues values = new ContentValues();
            values.put(KEY_PRODUCT_ID, product.id);
            values.put(KEY_PRODUCT_NAME, product.name);
            values.put(KEY_PRODUCT_SELLERID, product.sellerId);

            // Notice how we haven't specified the primary key. SQLite auto increments the primary key column.
            db.insertOrThrow(TABLE_PRODUCTS, null, values);
            db.setTransactionSuccessful();
        } catch (Exception e) {
            Log.d(TAG, "Error while trying to add post to database");
        } finally {
            db.endTransaction();
        }
    }

    public List<Product> getAllProducts() {
        List<Product> posts = new ArrayList<>();

        // SELECT * FROM POSTS
        // LEFT OUTER JOIN USERS
        // ON POSTS.KEY_POST_USER_ID_FK = USERS.KEY_USER_ID
        String PRODUCTS_SELECT_QUERY =
                String.format("SELECT * FROM %s ", TABLE_PRODUCTS);

        // "getReadableDatabase()" and "getWriteableDatabase()" return the same object (except under low
        // disk space scenarios)
        SQLiteDatabase db = getReadableDatabase();
        Cursor cursor = db.rawQuery(PRODUCTS_SELECT_QUERY, null);
        try {
            if (cursor.moveToFirst()) {
                do {
                    Product newProduct = new Product(cursor.getString(cursor.getColumnIndex(KEY_PRODUCT_NAME)),
                                                        cursor.getString(cursor.getColumnIndex(KEY_PRODUCT_ID)),
                                                        cursor.getString(cursor.getColumnIndex(KEY_PRODUCT_SELLERID)));
                    posts.add(newProduct);
                } while(cursor.moveToNext());
            }
        } catch (Exception e) {
            Log.d(TAG, "Error while trying to get posts from database");
        } finally {
            if (cursor != null && !cursor.isClosed()) {
                cursor.close();
            }
        }
        return posts;
    }

}
