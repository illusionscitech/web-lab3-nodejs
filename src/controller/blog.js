const execSQL = require('../db/nosql')
//博客相关的方法
// async function getList(author, keyword){
    
const getList = async (id1, author, title, keyword) => {
    
    let findQuery = {};
    if (id1) {
      const str = id1;
      const num = parseInt(str);
      findQuery.id = num;
    }
    if (title) {
      findQuery.title = title;
    }
    if (author) {
    findQuery.author = author;
    }
    if (keyword) {
    findQuery.content = keyword;
    }
    // console.log(findQuery);
    // const jsonData = await execSQL.execSQL(findQuery);
    const jsonData = await execSQL.execSQL(findQuery);
    // console.log(jsonData);
    return jsonData
    // return [{
    //     id: 1,
    //     title: '标题一',
    //     content: '内容一',
    //     author: '张三',
    //     createAt: 161055518935 //date.now()获取的时间戳
    // },
    // {
    //     id: 2,
    //     title: '标题二',
    //     content: '内容二',
    //     author: '李四',
    //     createAt: 161055535044 //date.now()获取的时间戳
    // },
    // {
    //     id: 3,
    //     title: '标题二',
    //     content: '内容二',
    //     author: '李四',
    //     createAt: 161055535044 //date.now()获取的时间戳
    // }
    // ]
}

 
module.exports = {
    getList
}