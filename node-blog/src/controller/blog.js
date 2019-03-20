const { execSql } = require('../db/mysql')

//获取博客列表
const getList = (keyword, author) => {
    let sql = `select * from blogs where 1=1 `
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }
    if (author) {
        sql += `and author='${author}'`
    }
    sql += `order by createTime desc;`    //按时间倒序
    return execSql(sql)
}

//获取博客详情
const getDetail = (id) => {
    let sql = `select * from blogs where id='${id}'`
    return execSql(sql).then(rows => {
        return rows[0]
    })
}

//新增博客
const addBlog = (blogData = {}) => {
    const { title, content, createTime, author } = blogData
    let sql = `insert into blogs(title,content,createTime,author)
        values('${title}','${content}',${createTime},'${author}')
    `
    return execSql(sql).then(insertData => {
        return {
            id: insertData.insertId
        }
    })
}

//删除博客 
const deleteBlog = (id) => {
    const author = 'zzh'
    const sql = `delete from blogs where id='${id}' and author='${author}'`
    return execSql(sql).then(result => {
        return result.affectedRows > 0
    })
}

//更新博客
const updateBlog = (id, blogData = {}) => {
    const { title, content } = blogData
    const sql = `update blogs set title='${title}',content='${content}' where id=${id}`
    return execSql(sql).then(result => {
        return result.affectedRows > 0
    })
}


module.exports = {
    getList,
    getDetail,
    addBlog,
    deleteBlog,
    updateBlog
}