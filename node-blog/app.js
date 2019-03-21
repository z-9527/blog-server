const http = require('http')
const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const { getPostData, cookieToObj } = require('./src/utils/util')

const serverHandle = async (req, res) => {
    // 设置返回格式 JSON
    res.setHeader('Content-type', 'application/json')

    //处理路由和参数
    const url = req.url
    req.path = url.split('?')[0]
    req.query = querystring.parse(url.split('?')[1])

    //处理cookie
    req.cookie = cookieToObj(req.headers.cookie)

    //处理post数据
    const bodyData = await getPostData(req)
    req.body = bodyData

    //博客路由
    const blogResult = handleBlogRouter(req, res)
    if (blogResult) {
        blogResult.then(blogData => {
            res.end(
                JSON.stringify(blogData)
            )
        })
        return
    }

    //用户路由
    const userResult = handleUserRouter(req, res)
    if (userResult) {
        userResult.then(userData => {
            res.end(
                JSON.stringify(userData)
            )
        })
        return
    }

    res.end('404')
}

const server = http.createServer(serverHandle)
server.listen(8888)