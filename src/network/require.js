/**
 * 
 * @param {this} context 上下文
 * @param {object} params 请求参数
 * @param {String} url 请求地址
 * @returns  promise
 * 
 */
 function require_get(url, params, context) {
    return context.axios.get(url, {
        params
    })
}

/**
 * 
 * @param {this} context 上下文
 * @param {object} params 请求参数
 * @param {String} url 请求地址
 * @returns  promise
 * 
 */
 function require_post(url, params, context) {
    return context.axios.post(url, params);
}
export {
   require_get,
   require_post
}