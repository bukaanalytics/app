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
    public int marketViewCount;
    public int marketTotalViewCount;
    public int marketSoldCount;
    public int marketTotalSoldCount;
    public int marketInterestCount;
    public int marketTotalInterestCount;

    public Stat(String date, int dateEpoch, String dayName, String productId, int viewCount, int totalViewCount, int soldCount, int totalSoldCount, int interestCount, int totalInterestCount, int marketViewCount, int marketTotalViewCount, int marketSoldCount, int marketTotalSoldCount, int marketInterestCount, int marketTotalInterestCount) {
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
        this.marketViewCount = marketViewCount;
        this.marketTotalViewCount = marketTotalViewCount;
        this.marketSoldCount = marketSoldCount;
        this.marketTotalSoldCount = marketTotalSoldCount;
        this.marketInterestCount = marketInterestCount;
        this.marketTotalInterestCount = marketTotalInterestCount;
    }
}
