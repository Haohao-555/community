
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
 * 
 */
const attenBlog = "/blog/loadMore"
export {
    loginURL,
    register,
    existAccount,
    picture,
    blog,
    attenBlog
}
