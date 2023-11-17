const querystring = require('querystring')
const handleBlogRoute = require('./src/routes/blog')
const fs = require('fs');
const path = require('path');

// 在 renderBlogPage 函数内部根据 blogId 获取博客数据并渲染页面
async function renderBlogPage(blogId, req, res, templateData) {
    try {
        // 在这里根据博客的 ID 获取博客数据
        const blogData = await getBlogDataById(blogId);

        if (blogData) {
            // 如果找到对应博客数据，可以使用它来渲染页面
            // 示例：渲染博客页面
            res.writeHead(200, { 'Content-Type': 'text/html' });
            // 在模板数据中插入博客内容
            const renderedPage = templateData.replace('{{blogContent}}', blogData.content);
            res.end(renderedPage);
        } else {
            // 如果未找到对应博客数据，返回 404 错误
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Blog not found');
        }
    } catch (error) {
        console.error(error);
        // 处理异常情况，返回500 Internal Server Error
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.write('Internal Server Error(3)');
        res.end();
    }
}


//处理post数据
const getPostData = (req) => {
        const promise = new Promise((resolve, reject) => {
            if (req.method !== 'POST') {
                resolve({})
                return;
            }
            if (req.headers['content-type'] !== 'application/json') {
                resolve({})
                return;
            }
 
            let postData = ''
                //返回的是数据段
            req.on('data', (chunk) => {
                postData += chunk.toString();
            })
 
            req.on('end', () => {
                if (!postData) {
                    resolve({})
                    return;
                }
                resolve(JSON.parse(postData))
            })
        })
        return promise;
    }
    //这里面是服务器的业务代码
const serverHandler = async (req, res) => {
    try {
        if (req.url === '/' || req.url === '/public/Blog_page.html') {
            // 读取并返回 HTML 文件内容
            const filePath = path.join(__dirname,'.', 'public','Blog_page.html');
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                    return;
                }
    
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
            });
    
        } else if (req.url.startsWith('/blog/')||req.url === '/public/blogTemplate.html') {
            const filePath = path.join(__dirname,'.', 'public','blogTemplate.html');
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error(2)');
                    return;
                }
    
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(data);
                // const blogId = req.url.split('/')[2];
                // const basePath ='/api/blog/list'
                // const relativePath = 'author=行者'; // 相对路径
                // newpath = `${basePath}?${relativePath}`;
                // //解析query
                // req.query = querystring.parse(newpath.split('?')[1]);
                // console.log(newpath);
                // const postData =  getPostData(req);
                // req.body = postData;
                // const blogData = handleBlogRoute(req, res);
                // jsondata = JSON.stringify(blogData);
                // console.log(jsondata);
                // // renderBlogPage(blogId, req, res, data);
                // // 处理博客详情页请求
                // // const blogId = req.url.split('/')[2];
                // res.end(data);
                // console.log(req.url);
            });
        } else{
            //设置返回的数据类型(响应格式)
            res.setHeader('Content-Type', 'application/json')
                //获取path
            const url = req.url;
            req.path = url.split('?')[0] //问号分割取前半段
                //解析query
            req.query = querystring.parse(url.split('?')[1]);
            // console.log(url);
        
            //下面的函数返回的是一个promise,这是一个异步的过程，意思是这个还没走完代码就会往下执行别的步骤，
            //这样可能会导致有些路由访问不到，因为数据还没处理完
            // getPostData(req).then(
            //     (postData) => {
            const postData = await getPostData(req);
            req.body = postData;
                    //路由返回数据结果(将请求和响应传入)
            const blogData = await handleBlogRoute(req, res);
            if (blogData) {
                // console.log(JSON.stringify(blogData));
                // 如果拿到了，就结束请求，返回一个响应
                jsondata = JSON.stringify(blogData)
                res.end(JSON.stringify(blogData));
                return;
            }

            res.writeHead(404, { 'Content-Type': 'text/plain' }); //无格式正文
            res.write('404 Not Found(1)');
            res.end(); //终止响应   
        }
    }
    catch (error) {
        console.error(error);
        // 处理异常情况，返回500 Internal Server Error
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.write('Internal Server Error(3)');
        res.end();
    }
}
 
module.exports = serverHandler;