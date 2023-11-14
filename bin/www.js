//创建服务器
const http = require('http');
const fs = require('fs');
const path = require('path');
 
//将服务器回调函数引入
const serverHandler = require('../app')

const server = http.createServer(async (req, res) => {
    // 处理静态文件
    // if (req.url.startsWith('/public/Blog_page.html')) {
    //     const filePath = path.join(__dirname, req.url);
    //     fs.readFile(filePath, (err, data) => {
    //         if (err) {
    //             res.writeHead(404, { 'Content-Type': 'text/plain' });
    //             res.write('404 Not Found');
    //             res.end();
    //         } else {
    //             res.writeHead(200, { 'Content-Type': 'text/html' });
    //             res.write(data);
    //             res.end();
    //         }
    //     });
    if (req.url === '/' || req.url === '/public/Blog_page.html') {
        // 读取并返回 HTML 文件内容
        const filePath = path.join(__dirname,'..', 'public','Blog_page.html');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    } else {
        // 处理其他请求
        await serverHandler(req, res);
    }
});

 
// const server = http.createServer(serverHandler);
 
// server.listen(PORT, () => {
//     // 监听成功执行的回调
//     console.log('server running at port 5000.....');
// })
server.listen(3000, '127.0.0.1', () => {

    console.log('Server running at http://127.0.0.1:3000/');
    
    });
    