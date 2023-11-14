const execSQL = require('../db/nosql')
//博客相关的方法
// async function getList(author, keyword){
    
const getList = async (author, keyword) => {
    //从数据库里面拿数据(根据用户以及关键字)
      //由于我们要做拼接，改成let
    //   let sql = `select * from blogs where`
    //   if (author) {
    //       sql += ` author =  '${author}' `
    //   }
    //   if (keyword) {
    //       sql += `and title like '%${keyword}%' ` //模糊查询
    //   }
    let findQuery = {};
    if (author) {
    findQuery.author = author;
    }
    if (keyword) {
    findQuery.title = { $regex: `.*${keyword}.*`, $options: 'i' }; // 模糊查询，不区分大小写
    }
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
// const getList = (author, keyword) => {
//     //从数据库里面拿数据
//     //先做假数据
//     return [{
//             id: 1,
//             title: '标题一',
//             content: '内容一',
//             author: '张三',
//             createAt: 161055518935 //date.now()获取的时间戳
//         },
//         {
//             id: 2,
//             title: '标题二',
//             content: '内容二',
//             author: '李四',
//             createAt: 161055535044 //date.now()获取的时间戳
//         },
//         {
//             id: 3,
//             title: '标题二',
//             content: '内容二',
//             author: '李四',
//             createAt: 161055535044 //date.now()获取的时间戳
//         }
//     ]
// }
 
module.exports = {
    getList
}