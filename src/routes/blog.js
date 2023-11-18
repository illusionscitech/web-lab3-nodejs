
const querystring = require('querystring')
const getList = require('../controller/blog')
const Model = require('../model/responseModel')
// const execSQL = require('../db/nosql')




//处理博客相关的路由,定义处理路由的逻辑
const handleBlogRoute = async(req, res) => {
    // const id = req.query.id
    // const blogData = req.body
    const method = req.method;
    const url = req.url;
    const path = url.split('?')[0] //问号分割取前半段
     
    //更新博客 blogData = {}是设置空对象，防止没有传
    // const updatedBlog = (id, blogData = {}) => {
    //     console.log('id', id);
    //     console.log('blogData', blogData);
    //     return true
    // }
    
    if (method === 'GET' && req.path === '/api/blog/list') {
 
        const id1 = req.query.id || '';
        // console.log(id1);
        const author = req.query.author || '';
        const title = req.query.title || '';
        const keyword = req.query.keyword || '';
        const listData = await getList.getList(id1,author,title, keyword); //根据参数获取数据
        console.log(listData);
        return new Model.SuccessModel(listData)
            // return {
            //     message: '获取博客列表的接口'
            // }
    }
    if (method === 'GET' && path === '/api/blog/detail') {
        return {
            message: '获取博客详情的接口'
        }
    }
    if (method === 'POST' && path === '/api/blog/new') {
        return {
            message: '新建博客的接口'
        }
    }
    if (method === 'POST' && path === '/api/blog/update') {
        // const updatedBlogData = updatedBlog(blogData)
        // if (updatedBlogData) {
        //     return new Model.SuccessModel('更新博客成功')
        // }
    }
    if (method === 'POST' && path === '/api/blog/delete') {
        return {
            message: '删除博客的接口'
        }
    }
}
module.exports = handleBlogRoute;