package com.github.bukaanalytics;

import com.google.gson.annotations.SerializedName;

/**
 * Created by habibridho on 5/25/17.
 */

public class BLNotif {
    @SerializedName("messages")
    public int messages;
    @SerializedName("transactions_need_action_as_seller")
    public int transactionNeedActionAsSeller;
    @SerializedName("transactions_need_action_as_buyer")
    public int transactionNeedActionAsBuyer;
    @SerializedName("unread_notifications")
    public int unreadNotifications;
    @SerializedName("cart_items")
    public int cartItems;
}
