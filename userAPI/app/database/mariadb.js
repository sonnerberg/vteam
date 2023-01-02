const mariadb = require('mariadb');
const db = require('../config/mariadb.json');

const pool = mariadb.createPool({
    host: db.host,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectionLimit: db.connectionLimit,
});

exports.queryDatabase = async (sql, placeholder = []) => {
    let conn;

    try {
        conn = await pool.getConnection();
        const rows = await conn.query(sql, placeholder);
        return rows;
    } catch (err) {
        // console.log(err.text);
        return {
            error: {
                status: 500,
                message: err.text,
                type: 'Database error',
            },
        };
    } finally {
        if (conn) {
            conn.end();
        }
    }
};

exports.closePool = () => {
    pool.end();
};
