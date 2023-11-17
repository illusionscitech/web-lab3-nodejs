// 创建服务器
const http = require('http');
 
// const express = require('express');
// const app = express();
// const port = 3000;

// // 静态文件服务
// app.use(express.static('public'));

//将服务器回调函数引入
const serverHandler = require('../app')

// function renderBlogPage(blogId, res) {
//     // 假设您有一个函数来根据 blogId 获取博客内容
//     const blogData = getBlogData(blogId);

//     // 读取模板文件
//     fs.readFile('blogTemplate.html', 'utf8', (err, template) => {
//         if (err) {
//             res.writeHead(500, {'Content-Type': 'text/html'});
//             res.end('Server Error');
//             return;
//         }

//         // 替换模板中的占位符
//         let pageContent = template.replace(/{{title}}/g, blogData.title)
//                                   .replace(/{{author}}/g, blogData.author)
//                                   .replace(/{{content}}/g, blogData.content);

//         res.writeHead(200, {'Content-Type': 'text/html'});
//         res.end(pageContent);
//     });
// }


// const server = http.createServer(async (req, res) => {
//     if (req.url === '/' || req.url === '/public/Blog_page.html') {
//         // 读取并返回 HTML 文件内容
//         const filePath = path.join(__dirname,'..', 'public','Blog_page.html');
//         fs.readFile(filePath, 'utf8', (err, data) => {
//             if (err) {
//                 res.writeHead(500, { 'Content-Type': 'text/plain' });
//                 res.end('Internal Server Error');
//                 return;
//             }

//             res.writeHead(200, { 'Content-Type': 'text/html' });
//             res.end(data);
//         });

//     } else if (req.url.startsWith('/blog/')||req.url === '/public/blogTemplate.html') {
//         // 处理博客详情页请求
//         const blogId = req.url.split('/')[2];
//         res.end('这里是主页');
//         renderBlogPage(blogId, res);
//     } else {
//         // 处理其他请求
//         await serverHandler(req, res);
//     }
// });

 
const server = http.createServer(serverHandler);
 
// server.listen(PORT, () => {
//     // 监听成功执行的回调
//     console.log('server running at port 5000.....');
// })
server.listen(3000, '127.0.0.1', () => {

    console.log('Server running at http://127.0.0.1:3000/');
    
    });
// 启动服务器
// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}/`);
// });
    