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

module.exports = {
    getPostData
}