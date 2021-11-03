import { require_get } from "../require"
import { picture ,blog, attenBlog} from "../url";

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
function req_AttenBlog(context, params = {}) {
    return require_get(attenBlog + `/${params.page}`, params, context);
}
export {
    req_picture,
    req_blog,
    req_AttenBlog,
}