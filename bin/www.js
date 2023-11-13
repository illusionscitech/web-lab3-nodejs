//创建服务器
const http = require('http');
 
//将服务器回调函数引入
const serverHandler = require('../app')
 
 
const server = http.createServer(serverHandler);
 
// server.listen(PORT, () => {
//     // 监听成功执行的回调
//     console.log('server running at port 5000.....');
// })
server.listen(3000, '127.0.0.1', () => {

    console.log('Server running at http://127.0.0.1:3000/');
    
    });
    