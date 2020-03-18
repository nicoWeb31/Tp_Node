import mysql from "mysql";

class DbConnection {

  constructor() {
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'exercice_node_js'
    });
  }

  performQuery(request, values=[]) {
    return new Promise((resolve, reject) => {
      console.warn(request);
      this.connection.query(request, values, (err, rows, fields) => {
        if (err) {
          return reject(err);
        }
        return resolve({ rows, fields });
      });
    });
  }

}

export default DbConnection;