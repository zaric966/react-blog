let ipUrl = 'http://127.0.0.1:7001/';

let servicePath = {
    getArticleList: ipUrl+'getArticleList',//首页接口
    getArticleById: ipUrl+'getArticleById/', //详细页接口
    getTypeInfo: ipUrl+'getTypeInfo',        //文章类别
    getListById: ipUrl+'getListById/'        //根据类别id获得list
}
export default servicePath