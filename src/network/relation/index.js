import { require_post } from "../require";
import { fan, follow } from "../url";

/**
 * 获取粉丝
 */
 function req_fan(context, params = {}) {
    return require_post(fan, params, context);
}
/**
 * 获取关注
 */
function req_follow(context, params = {}) {
    return require_post(follow, params, context);
}
export {
    req_fan,
    req_follow
}