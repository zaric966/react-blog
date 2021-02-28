module.exports = options => {
    return async function adminauth(ctx,next) {
        console.log('---->我是openID',ctx.session.openId);
        if (ctx.session.openId){
            await next();
        }else {
            ctx.body = {data: '还未登录'};
        }
    }
}