import constant from '../conf/constant'
/**
 * 格式化内容信息
 * @param {content} 内容 
 */
function formatContent(content) {

    let contentFormat = content
    // 去标签
    contentFormat = contentFormat.replace(constant.PATTERN, "")

    // 添加 a 标签
    contentFormat = contentFormat.replace(
        constant.REG_FOR_AT_WHO,
        (matchStr, nickName, userName) => {
            return `<a href='#/personal?name=${userName}' style=color:#c04d00>@${nickName} - ${userName}</a>`
        }
    )

    return contentFormat
}
export default formatContent