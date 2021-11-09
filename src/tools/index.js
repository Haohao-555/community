export default{
    isexit(target, arr) {
        return arr.some(item => {
            return item.id == target.id
        })
    }
}