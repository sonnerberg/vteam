const mariadb = require('mariadb');
const db = require('../config/mariadb.json');

const pool = mariadb.createPool({
    host: db.host,
    user: db.user,
    password: db.password,
    database: db.database,
    connectionLimit: 5,
});

exports.queryDatabase = async (sql) => {
    // TODO fix better err
    let conn;

    try {
        conn = await pool.getConnection();
        const rows = await conn.query(sql);
        return rows;
    } catch (err) {
        return 'failed';
    } finally {
        if (conn) {
            conn.end();
        }
    }
};
