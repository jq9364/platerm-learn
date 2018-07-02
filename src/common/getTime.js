/**
 * @file   : getTime.js
 * @author : jinqianqian
 * @date   : 2018-5-14 11:43:02
 */

const addZero = (a, b, c) => {
    return a + '-' + (b < 10 ? '0' + b : b) + '-' + (c < 10 ? '0' + c : c);
};

// 今天 年月日
const getDayTime = nowDate => {
    let year = nowDate.getFullYear();
    let month = nowDate.getMonth() + 1;
    let date = nowDate.getDate();
    let dayTime = addZero(year, month, date);
    return dayTime;
};

// 今日
export const todady = () => {
    let dayTime = getDayTime(new Date());
    return [dayTime + ' 00:00:00', dayTime + ' 23:59:59'];
};
// 本周  一天毫秒数 24 * 3600 * 1000
export const tswk = () => {
    let Nowdate = new Date();
    let index = (Nowdate.getDay() + 7 - 1) % 7;
    let WeekFirstDay = new Date(Nowdate - index * 86400000);
    let WeekLastDay = new Date(WeekFirstDay * 1 + 6 * 86400000);
    return [
        getDayTime(WeekFirstDay) + ' 00:00:00',
        getDayTime(WeekLastDay) + ' 23:59:59'];
};
// 本月
export const tsmt = () => {
    let Nowdate = new Date();
    let mountFirstDay = new Date(Nowdate.getFullYear(), Nowdate.getMonth(), 1);
    let nextMountFirstDay = new Date(Nowdate.getFullYear(), Nowdate.getMonth() + 1, 1)
    let mountLastDay = new Date(nextMountFirstDay - 86400000);
    return [
        getDayTime(mountFirstDay) + ' 00:00:00',
        getDayTime(mountLastDay) + ' 23:59:59'];
};
// 三个选项 选择
export const getTime = index => {
    switch (index) {
        case 0:
            return todady();
            break;
        case 1:
            return tswk();
            break;
        case 2:
            return tsmt();
            break;
        default:
            return index;
    }
};

//  获取时间段  节点
export const gethalfTime = index => {
    console.log(index);
    return 111;
};

// 时间端
