import Mock from 'mockjs'
const Random = Mock.Random;
Mock.mock(RegExp('/api/mock/img' + ".*"), 'get', (option) => {
    let value = option.url.split("?")[1].split("=")[1];
    let list = [];
    for (let i = 0; i < value; i++) {
        let color = Random.color()
        let img = {
            url: Random.image('100x100', color, '#FFF', 'png', '1024')
        }
        list.push(img);
    }
    return {
        list
    }
});