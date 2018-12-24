//本文件放置各种工具类函数
export function getRedirectPath({type, avatar}){
    //根据用户信息，返回页面地址
    //user.type: boss/genius
    //检测用户是否有头像avatar: bossinfo/geniusinfo
    let url = (type === 'boss')?'/boss':'/genius'
    if(!avatar) {
        url += 'info'
    }
    return url
}