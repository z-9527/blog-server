const handleUserRouter = (req,res)=>{
    const { method, query, path } = req

    //登录
    if (method === 'POST' && path === '/api/user/login') {
        return {
            msg: '登录'
        }
    }
}
module.exports = handleUserRouter