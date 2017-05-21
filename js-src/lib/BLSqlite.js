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
  }

  openDatabase() {
    this.db = SQLite.openDatabase({
      name: config.dbname,
    }, null);
  }

  getWeeklyView(param, callback) {
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

  parseWeeklyViewResult(results) {
    const retval = {};
    const result_length = results.rows.length;
    for (let i = 0; i < result_length; i++) {
      const row = results.rows.item(i);
      retval[`${row.day_name}`] = row.daily_view;
    }
    return retval;
  }

}

export const Sqlite = new BLSqlite();
