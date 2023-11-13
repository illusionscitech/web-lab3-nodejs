class BaseModel {
    //构造函数
    constructor(data, message) {
        //数据可能是对象或者string，如果是string，直接message返回
        if (typeof data == 'string') {
            this.message = data
            data = null
            message = null
        }
        if (data) {
            this.data = data
        }
        if (message) {
            this.message = message
        }
    }
}
 
//根据基类，下面是成功与失败的模型
 
class SuccessModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.errno = 0;
    }
}
 
 
class ErrorModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.errno = -1;
    }
}
 
module.exports = {
    SuccessModel,
    ErrorModel
}