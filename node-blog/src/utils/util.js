/**
 * node获取post传来的数据
 * @param {obj} req 
 */
const getPostData = (req) => {
    return new Promise((resolve, reject) => {
        if (req.method !== 'POST' || req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()
        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(JSON.parse(postData))
        })
    })
}
/**
 * 将cookie字符串转换为对象
 * @param {str} cookie 
 */
const cookieToObj = (cookie) => {
    let obj = {}
    if (cookie) {
        cookie.split(';').forEach(item => {
            const keyValue = item.split('=')
            const key = keyValue[0].trim()
            const value = keyValue[1].trim()
            obj[key] = value
        })
    }
    return obj
}
/**
 * 获取cookie的过期时间,默认是一天
 * @param {num} exdays 
 */
const getCookieExpires = (exdays = 1) => {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    return d.toGMTString()
}

module.exports = {
    getPostData,
    cookieToObj,
    getCookieExpires
}