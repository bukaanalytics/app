package com.github.bukaanalytics.common.model;

/**
 * Created by touchtenmac-19 on 5/6/17.
 */

public class Product {
    public String id;
    public String name;
    public String sellerId;

    public Product(String _id, String _name, String _sellerId){
        id = _id;
        name = _name;
        sellerId = _sellerId;
    }
}
