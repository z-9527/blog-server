const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const { getCookieExpires } = require('../utils/util')

const handleUserRouter = (req, res) => {
    const { method, query, path } = req

    //登录
    if (method === 'GET' && path === '/api/user/login') {
        // const { username, password } = req.body
        const { username, password } = req.query
        const result = login(username, password)
        return result.then(data => {
            if (data.username) {
                const info = { ...data }
                delete info.password
                //操作cookie
                res.setHeader('Set-Cookie', `username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`)
                return new SuccessModel(info)
            } else {
                return new ErrorModel('登录失败')
            }
        })
    }
    //测试登录
    if (method === 'GET' && path === '/api/user/login-test') {
        if (req.cookie.username) {
            return Promise.resolve(
                new SuccessModel({
                    username: req.cookie.username
                })
            )
        } else {
            return Promise.resolve(
                new ErrorModel('尚未登录')
            )
        }
    }
}
module.exports = handleUserRouter