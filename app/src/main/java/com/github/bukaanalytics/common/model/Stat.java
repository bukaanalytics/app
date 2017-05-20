package com.github.bukaanalytics.common.model;

/**
 * Created by touchtenmac-19 on 5/6/17.
 */

public class Stat {
    public String date;
    public int dateEpoch;
    public String dayName;
    public String productId;
    public int viewCount;
    public int totalViewCount;
    public int soldCount;
    public int totalSoldCount;
    public int interestCount;
    public int totalInterestCount;

    public Stat(String date, int dateEpoch, String dayName, String productId, int viewCount, int totalViewCount, int soldCount, int totalSoldCount, int interestCount, int totalInterestCount) {
        this.date = date;
        this.dateEpoch = dateEpoch;
        this.dayName = dayName;
        this.productId = productId;
        this.viewCount = viewCount;
        this.totalViewCount = totalViewCount;
        this.soldCount = soldCount;
        this.totalSoldCount = totalSoldCount;
        this.interestCount = interestCount;
        this.totalInterestCount = totalInterestCount;
    }
}
