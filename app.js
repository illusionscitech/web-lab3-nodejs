const querystring = require('querystring')
const handleBlogRoute = require('./src/routes/blog')

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
        //设置返回的数据类型(响应格式)
        res.setHeader('Content-Type', 'application/json')
            //获取path
        const url = req.url;
        req.path = url.split('?')[0] //问号分割取前半段
            //解析query
        req.query = querystring.parse(url.split('?')[1]);
    
        //下面的函数返回的是一个promise,这是一个异步的过程，意思是这个还没走完代码就会往下执行别的步骤，
        //这样可能会导致有些路由访问不到，因为数据还没处理完
        // getPostData(req).then(
        //     (postData) => {
        const postData = await getPostData(req);
        req.body = postData;
                //路由返回数据结果(将请求和响应传入)
        const blogData = await handleBlogRoute(req, res);
        if (blogData) {
            console.log(blogData);
            // 如果拿到了，就结束请求，返回一个响应
            res.end(JSON.stringify(blogData));
            return;
        }

                // if (blogDataPromise instanceof Promise) {
                //     blogDataPromise.then(blogData => {
                //         res.end(JSON.stringify(blogData));
                //     });
                //     return;
                // }else{
                //     // res.end(
                //     //     JSON.stringify(blogDataPromise)
                //     // );
                // }

                // const blogData = handleBlogRoute(req, res)
                // if (blogData) {
                //     console.log(blogData);
                //     // res.json(blogData);
                //     // 如果拿到了，就结束请求，返回一个响应
                //     res.end(
                //         JSON.stringify(blogData)
                //     );
                    // blogData.then(blogData => {
                    //     //如果拿到了，就结束请求，返回一个响应
                    //     res.end(
                    //         JSON.stringify(blogData)
                    //     );
                    // })
                    //响应之后，下面的代码不再执行，所以return一下
                //     return;
                // }
                //如果不是上面的路由，就会返回下面的结果
        res.writeHead(404, { 'Content-Type': 'text/plain' }); //无格式正文
        res.write('404 Not Found');
        res.end(); //终止响应
        
        
          
    }
    catch (error) {
        console.error(error);
        // 处理异常情况，返回500 Internal Server Error
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.write('Internal Server Error');
        res.end();
    }
}
 
module.exports = serverHandler;