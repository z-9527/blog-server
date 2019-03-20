const { getList, getDetail, addBlog, deleteBlog, updateBlog } = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
    const { method, query, path } = req
    const { id } = query

    //获取博客列表
    if (method === 'GET' && path === '/api/blog/list') {
        const { keyword, author } = query
        const result = getList(keyword, author)
        return result.then(list => {
            if (list) {
                return new SuccessModel(list)
            } else {
                return new ErrorModel('查询失败')
            }

        })
    }
    //获取博客詳情
    if (method === 'GET' && path === '/api/blog/detail') {
        const result = getDetail(id)
        return result.then(detail => {
            if (detail) {
                return new SuccessModel(detail)
            } else {
                return new ErrorModel('没有相关博客')
            }
        })
    }
    //新增博客
    if (method === 'POST' && path === '/api/blog/add') {
        let body = {
            ...req.body,
            createTime: Date.now()
        }
        const result = addBlog(body)
        return result.then(data => {
            if (data.id) {
                return new SuccessModel(data)
            } else {
                return new ErrorModel('新建博客失败')
            }
        })
    }
    //刪除博客
    if (method === 'POST' && path === '/api/blog/delete') {
        const result = deleteBlog(id)
        return result.then(status => {
            if (status) {
                return new SuccessModel('删除博客成功')
            } else {
                return new ErrorModel('删除博客失败')
            }
        })
    }
    //更新博客
    if (method === 'POST' && path === '/api/blog/update') {
        const result = updateBlog(id, req.body)
        return result.then(status => {
            if (status) {
                return new SuccessModel('更新博客成功')
            } else {
                return new ErrorModel('更新博客失败')
            }
        })
    }
}

module.exports = handleBlogRouter