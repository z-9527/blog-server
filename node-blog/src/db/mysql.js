const mysql = require('mysql')
const { MYSQL_CONF } = require('../config/db')

//创建连接对象
const connection = mysql.createConnection(MYSQL_CONF)

//开始连接
connection.connect()

//执行sql语句
function execSql(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err)
                return
            }
            resolve(result)
        })
    })
}

//断开连接
// connection.end()

module.exports = {
    execSql
}