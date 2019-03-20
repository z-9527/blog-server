const env = process.env.NODE_ENV //环境参数

//数据库配置
let MYSQL_CONF

if (env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '12345678',
        port: '3306',
        database: 'myblog'
    }
}

if (env === 'production') {

}

module.exports = {
    MYSQL_CONF
}