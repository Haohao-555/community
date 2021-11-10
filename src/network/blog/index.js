import { require_get } from "../require"
import { picture ,blog, attenBlog, provideBlog, callMyCount, callMyBlog } from "../url";

/**
 * 获取图片
 */
 function req_picture(context, params = {}) {
    return require_get(picture, params, context);
}
/**
 * 获取博客
 */
function req_blog(context, params = {}) {
    return require_get(blog + `/${params.page}`, params, context);
}
/**
 * 获取关注人博客
 */
function req_AttenBlog(context, params = {}) {
    return require_get(attenBlog + `/${params.page}`, params, context);
}
/**
 * 获取自己发布的博客
 */
function req_provideBlog(context, params = {}) {
    return require_get(provideBlog + `/${params.userName}` + `/${params.pageIndex}`, params, context);
}

/**
 * 获取 @ 数量
 */
function req_callMy(context, params = {}) {
    return require_get(callMyCount, params, context);
}

/**
 * 获取 @ 博客
 */
function req_callBlog(context, params = {}) {
    return require_get(callMyBlog +`/${params.page}`, params, context);
}
export {
    req_picture,
    req_blog,
    req_AttenBlog,
    req_provideBlog,
    req_callMy,
    req_callBlog,
}