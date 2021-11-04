
/**
 * 参数 
 *     userName 用户名
 *     password 密码
 */
const loginURL = "/user/login";

/**
 * 参数
 *     userName: 用户名
 *     password: 密码
 *     gender:   性别
 */
const register = "/user/register";

/**
 * 参数
 *     userName: 账号
 */
const existAccount = "/user/isExist"

/**
 * 参数 （模拟）
 *  num
 */
const picture = "/mock/img"

/**
 * 
 */
const blog = "/square/loadMore"

/**
 * 判断用户是否登录，并获取个人信息
 */
const isLogin = "/user/isLogin"
/**
 * 
 */
const attenBlog = "/blog/loadMore"

/**
 * 参数
 * userId
 */
const fan = "/user_relation/getfans";

/**
 * 参数
 * userId
 */
const follow = "/user_relation/getfollows"; 

/**
 * 参数
 */
const provideBlog = "/profile/loadMore/";
export {
    loginURL,
    register,
    existAccount,
    picture,
    blog,
    attenBlog,
    isLogin,
    fan,
    follow,
    provideBlog,
}
