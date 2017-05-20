package com.github.bukaanalytics.common.model;

/**
 * Created by touchtenmac-19 on 5/6/17.
 */

public class Product {
    public String id;
    public String name;
    public int price;
    public int sellerId;

    public Product(String _id, String _name, int _price, int _sellerId){
        id = _id;
        name = _name;
        price = _price;
        sellerId = _sellerId;
    }
}
