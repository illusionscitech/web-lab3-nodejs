//博客相关的方法
const getList = (author, keyword) => {
    //从数据库里面拿数据
    //先做假数据
    return [{
            id: 1,
            title: '标题一',
            content: '内容一',
            author: '张三',
            createAt: 161055518935 //date.now()获取的时间戳
        },
        {
            id: 2,
            title: '标题二',
            content: '内容二',
            author: '李四',
            createAt: 161055535044 //date.now()获取的时间戳
        },
        {
            id: 3,
            title: '标题二',
            content: '内容二',
            author: '李四',
            createAt: 161055535044 //date.now()获取的时间戳
        }
    ]
}
 
module.exports = {
    getList
}