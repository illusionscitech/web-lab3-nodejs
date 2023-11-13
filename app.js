// //将blog回调函数引入
// const handleBlogRoute = require('./src/routes/blog')
// //写回到函数，将createServer中的回调函数抽离了出来，目的是更好的维护
// const serverHandler = async (req, res) => {
//     //这里面是服务器的业务代码

//     // 处理请求路径
//     const url = req.url;
//     req.path = url.split('?')[0]; // 问号分割取前半段
        
//     //1.设置返回的数据类型
//     res.setHeader('Content-Type', 'application/json')
//         //路由返回数据结果(将请求和响应传入)
//         const blogData = await handleBlogRoute(req, res)
//         if (blogData) {
//             //如果拿到了，就结束请求，返回一个响应
//             res.end(
//                 JSON.stringify(blogData)
//             );
//             //响应之后，下面的代码不再执行，所以return一下
//             return;
//         }

//         // // 根据 req.path 进行其他路由的判断
//         // if (req.path === '/api/xxx') {
//         //     // 处理 /api/xxx 路由的逻辑
//         //     res.end(JSON.stringify({ message: 'Handling /api/xxx route' }));
//         //     return;
//         // }
//         //如果不是上面的路由，就会返回下面的结果
//         res.writeHead(404, { 'Content-Type': 'text/plain' }); //无格式正文
//         res.write('404 Not Found');
//         res.end(); //终止响应
//     // //2.数据格式
//     // const responseData = {
//     //     name: 'alva',
//     //     age: 21
//     // }
 
//     // res.end(
//     //     JSON.stringify(responseData)
//     // )
// }
 
// module.exports = serverHandler;

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
const serverHandler = (req, res) => {
    //设置返回的数据类型(响应格式)
    res.setHeader('Content-Type', 'application/json')
        //获取path
    const url = req.url;
    req.path = url.split('?')[0] //问号分割取前半段
        //解析query
    req.query = querystring.parse(url.split('?')[1]);
 
    //下面的函数返回的是一个promise,这是一个异步的过程，意思是这个还没走完代码就会往下执行别的步骤，
    //这样可能会导致有些路由访问不到，因为数据还没处理完
    getPostData(req).then(
        (postData) => {
            req.body = postData
                //路由返回数据结果(将请求和响应传入)
            const blogData = handleBlogRoute(req, res)
            if (blogData) {
                //如果拿到了，就结束请求，返回一个响应
                res.end(
                    JSON.stringify(blogData)
                );
                //响应之后，下面的代码不再执行，所以return一下
                return;
            }
            //如果不是上面的路由，就会返回下面的结果
            res.writeHead(404, { 'Content-Type': 'text/plain' }); //无格式正文
            res.write('404 Not Found');
            res.end(); //终止响应
        }
    )
}
 
module.exports = serverHandler;