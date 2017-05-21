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

  openDatabase() {
    this.db = SQLite.openDatabase({
      name: config.dbname,
    }, null);
  }

  getWeeklyView(param, callback) {
    this.db.executeSql(`
      SELECT SUM(${config.col.stas.view_count})
      FROM ${config.tables.stats}
      WHERE ${config.col.stats.date} BETWEEN ? AND ?
      GROUP BY ${config.col.stats.day_name}
      `, [param.start_date, param.end_date], (t, r) => {
        callback(t, r);
      });
  }

}

export const db = new BLSqlite();
