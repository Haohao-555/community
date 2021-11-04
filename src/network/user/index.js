import { require_get, require_post } from "../require"
import { loginURL, existAccount, register, isLogin } from "../url";

/**
 *  登录
 */
function req_login(context, params = {}) {
    return require_post(loginURL, params, context);
}

/**
 * 注册
 */
function req_register(context, params = {}) {
    return require_post(register, params, context);
}

/**
 * 判断账号是否存在
 */
function req_existAccount(context, params = {}) {
    return require_post(existAccount, params, context);
}
/**
 * 判断是否登录
 */
function req_userInfo(context, params = {}) {
    return require_get(isLogin, params, context);
}
export {
    req_login,
    req_register,
    req_existAccount,
    req_userInfo
}