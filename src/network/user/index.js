import { require_get, require_post, require_patch } from "../require"
import { loginURL, existAccount, register, isLogin, changeUserInfo, changePaw, logout, userInfo } from "../url";

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
/**
 * 修改个人信息
 */
function req_changeUesrInfo(context, params = {}) {
    return require_patch(changeUserInfo, params, context);
}
/**
 * 修改密码
 */
function req_changePaw(context, params = {}) {
    return require_patch(changePaw, params, context);
}
/**
 * 退出登录
 */
function req_logout(context, params = {}) {
    return require_post(logout, params, context);
}
/**
 * 获取用户信息
 */
function req_info(context, params = {}) {
    return require_get(userInfo+`/${params.userName}`, params, context);
}
export {
    req_login,
    req_register,
    req_existAccount,
    req_userInfo,
    req_changeUesrInfo,
    req_changePaw,
    req_logout,
    req_info,
}