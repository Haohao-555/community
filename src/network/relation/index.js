import { require_post } from "../require";
import { fan, follower, unfollow, follow } from "../url";

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
    return require_post(follower, params, context);
}
/**
 * 取消关注
 */
function req_unfollow(context, params = {}) {
    return require_post(unfollow, params, context);
}
/**
 * 关注
 */
function req_guangzu(context, params = {}) {
    return require_post(follow, params, context);
}
export {
    req_fan,
    req_follow,
    req_unfollow,
    req_guangzu,
}