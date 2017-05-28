package com.github.bukaanalytics.common.model;

/**
 * Created by habibridho on 5/28/17.
 */

public class Token {
    public int id;
    public int user_id;
    public String token;

    public Token(int _id, int _user_id, String _token) {
        id = _id;
        user_id = _user_id;
        token = _token;
    }
}
