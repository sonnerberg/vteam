const db = require('./mariadb.json');

exports.testFuncOne = () => {
    return db.database;
};

exports.testFuncTwo = () => {
    return db.user;
};
