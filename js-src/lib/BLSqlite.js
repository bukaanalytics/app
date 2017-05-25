import SQLite from 'react-native-sqlite-storage';

const config = {
  dbname: 'baDatabase',
  dbversion: 1,
  tables: {
    users: 'users',
    products: 'products',
    stats: 'stats',
  },
  col: {
    users: {
      id: 'seller_id',
      name: 'name',
    },
    products: {
      id: 'product_id',
      name: 'name',
      price: 'price',
      seller_id: 'seller_id',
    },
    stats: {
      id: 'id',
      date: 'date',
      day_name: 'day_name',
      product_id: 'product_id',
      view_count: 'view_count',
      view_total: 'view_total',
      sold_count: 'sold_count',
      sold_total: 'sold_total',
      interest_count: 'interest_count',
      interest_total: 'interest_total',
    },
  },
};


class BLSqlite {

  constructor() {
    this.openDatabase();
    this.createTablesIfNotExists();
  }

  openDatabase() {
    this.db = SQLite.openDatabase({
      name: config.dbname,
    }, null);
  }

  getWeeklyView(param, callback) {
    console.log("Weekly view is ");
    console.log(param);
    this.db.executeSql(`
      SELECT
        ${config.col.stats.day_name} as day_name,
        SUM(${config.col.stats.view_count}) as daily_view
      FROM ${config.tables.stats}
      WHERE ${config.col.stats.date} BETWEEN ? AND ?
      GROUP BY ${config.col.stats.day_name}
      `, [param.start_date, param.end_date], results => {
        console.log("results inside executeSql");
        console.log(results);
        callback(this.parseWeeklyViewResult(results));
      });
  }

  getWeeklyRevenueAttribution(param, callback) {
    this.db.executeSql(`
      SELECT name,
             ( terjual * price ) AS revenue
      FROM   (SELECT product_id,
                     SUM(sold_count) AS terjual
              FROM   stats
              WHERE  DATE BETWEEN ? AND ?
              GROUP  BY product_id) AS A
             JOIN products AS B
               ON A.product_id = B.product_id
      ORDER  BY revenue DESC
      LIMIT  5
    `, [param.start_date, param.end_date], results => {
      callback(this.parseWeeklyRevenueAttribution(results));
    });
  }

  getWeeklyTopViewedProduct(param, callback) {
    this.db.executeSql(`
      SELECT name,
             view
      FROM   (SELECT product_id,
                     SUM(view_count) AS view
              FROM   stats
              WHERE  DATE BETWEEN ? AND ?
              GROUP  BY product_id) AS A
             JOIN products AS B
               ON A.product_id = B.product_id
      ORDER  BY view DESC
      LIMIT  5
    `, [param.start_date, param.end_date], results => {
      callback(this.parseWeeklyViewProduct(results));
    });
  }

  getWeeklyLeastViewedProduct(param, callback) {
    this.db.executeSql(`
      SELECT name,
             view
      FROM   (SELECT product_id,
                     SUM(view_count) AS view
              FROM   stats
              WHERE  DATE BETWEEN ? AND ?
              GROUP  BY product_id) AS A
             JOIN products AS B
               ON A.product_id = B.product_id
      ORDER  BY view ASC
      LIMIT  5
    `, [param.start_date, param.end_date], results => {
      callback(this.parseWeeklyViewProduct(results));
    });
  }

  getWeeklyConvertionRate(param, callback) {
    this.db.executeSql(`
      SELECT SUM(${config.col.stats.sold_count}) AS sold_accumulated,
             SUM(${config.col.stats.view_count}) AS view_accumulated
      FROM   ${config.tables.stats}
      WHERE  DATE BETWEEN ? AND ?
      `, [param.start_date, param.end_date], results => {
        callback(this.parseWeeklyConvertionRate(results));
      });
  }

  getBidSuggestion(param, callback) {
    console.log('param is :',param );
    this.db.executeSql(`
      SELECT name,
             ( ratio * price * 0.1 ) AS bid_suggestion
      FROM   (SELECT with_ads.product_id,
                     ( CASE
                         WHEN with_ads.view_iklan <= without_ads.VIEW THEN -1
                         WHEN with_ads.sold_iklan <= without_ads.sold THEN -1
                         ELSE ( ( with_ads.sold_iklan - without_ads.sold ) /
                                ( with_ads.view_iklan -
                                         without_ads.VIEW ) )
                       END ) AS ratio
              FROM   (SELECT Avg(view_count) AS view_iklan,
                             Avg(sold_count) AS sold_iklan,
                             product_id
                      FROM   stats
                      WHERE  date BETWEEN ? AND ?
                      GROUP  BY product_id) AS with_ads
                     JOIN (SELECT Avg(view_count) AS VIEW,
                                  Avg(sold_count) AS sold,
                                  product_id
                           FROM   stats
                           WHERE  date BETWEEN ? AND ?
                           GROUP  BY product_id) AS without_ads
                       ON with_ads.product_id = without_ads.product_id
              WHERE  ratio > 0) AS A
             JOIN products AS B
               ON A.product_id = B.product_id
      `, [param.start_ads, param.end_ads, param.start_no_ads, param.end_no_ads], results => {
        callback(this.parseBidSuggestion(results));
      });
  }

  createTablesIfNotExists() {
    this.db.executeSql(`
      CREATE TABLE IF NOT EXISTS users (
        seller_id INTEGER PRIMARY KEY,
        name TEXT
      )`);
    this.db.executeSql(`
      CREATE TABLE IF NOT EXISTS products(
        product_id TEXT PRIMARY KEY,
        name TEXT,
        price INTEGER,
        seller_id INTEGER,
        FOREIGN KEY(seller_id) REFERENCES users(seller_id)
      )`);
    this.db.executeSql(`
      CREATE TABLE IF NOT EXISTS products(
        id INTEGER PRIMARY KEY,
        date TEXT,
        day_name TEXT,
        product_id TEXT,
        view_count INTEGER,
        view_total INTEGER,
        sold_count INTEGER,
        sold_total INTEGER,
        interest_count INTEGER,
        interest_total INTEGER
      )`);
  }

  insertUser(param) {
    this.db.executeSql(`
      INSERT INTO users (
        seller_id,
        name
      ) VALUES (?, ?)
      `, [param.user_id, param.name]);
  }

  insertProducts(param) {
    this.db.executeSql(`
      INSERT INTO users (
        product_id,
        name,
        price,
        seller_id
      ) VALUES (?, ?, ?, ?)
      `, [param.product_id, param.name, param.price, param.seller_id]);
  }

  insertStats(param) {
    this.db.executeSql(`
      INSERT INTO users (
        date,
        day_name,
        product_id,
        view_count,
        view_total,
        sold_count,
        sold_total,
        interest_count,
        interest_total
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [param.date, param.day_name, param.product_id, param.view_count, param.view_total, param.sold_count, param.sold_total, param.interest_count, param.interest_total]);
  }
  // ==================
  // Private Functions
  // ==================
  parseWeeklyViewResult(results) {
    const retval = {};
    const result_length = results.rows.length;
    for (let i = 0; i < result_length; i++) {
      const row = results.rows.item(i);
      retval[`${row.day_name}`] = row.daily_view;
    }
    return retval;
  }

  parseWeeklyRevenueAttribution(results) {
    const retval = [];
    const result_length = results.rows.length;
    for (let i = 0; i < result_length; i++) {
      const row = results.rows.item(i);
      retval.push({
        name: row.name,
        attribution: row.revenue,
      });
    }
    return retval;
  }

  parseWeeklyViewProduct(results) {
    const retval = [];
    const result_length = results.rows.length;
    for (let i = 0; i < result_length; i++) {
      const row = results.rows.item(i);
      retval.push({
        item: row.name,
        view: row.view,
      });
    }
    return retval;
  }

  parseWeeklyConvertionRate(results) {
    const retval = {};
    const result_length = results.rows.length;
    for (let i = 0; i < result_length; i++) {
      const row = results.rows.item(i);
      retval.view_accumulated = row.view_accumulated;
      retval.sold_accumulated = row.sold_accumulated;
    }
    return retval;
  }

  parseBidSuggestion(results) {
    const retval = [];
    const result_length = results.rows.length;
    for (let i = 0; i < result_length; i++) {
      const row = results.rows.item(i);
      retval.push({
        item: row.name,
        bid_suggestion: row.bid_suggestion,
      });
    }
    return retval;
  }

}

export const Sqlite = new BLSqlite();
