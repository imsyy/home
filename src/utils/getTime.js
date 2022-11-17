// 时钟
export const getCurrentTime = () => {
    let time = new Date();
    let year = time.getFullYear();
    let month = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1;
    let day = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
    let hour = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
    let minute = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
    let second = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
    let weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    let currentTime = {
        year,
        month,
        day,
        hour,
        minute,
        second,
        weekday: weekday[time.getDay()],
    }
    return currentTime;
}

// 时光胶囊
export const getTimeCapsule = () => {
    // 日进度
    let todayStartDate = new Date(new Date().toLocaleDateString()).getTime();
    let todayPassHours = (new Date() - todayStartDate) / 1000 / 60 / 60;
    let todayPassHoursPercent = (todayPassHours / 24) * 100;
    // 周进度
    let weeks = [7, 1, 2, 3, 4, 5, 6];
    let weekDay = weeks[new Date().getDay()];
    let weekDayPassPercent = (weekDay / 7) * 100;
    // 月进度
    let year = new Date().getFullYear();
    let date = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let monthAll = new Date(year, month, 0).getDate();
    let monthPassPercent = (date / monthAll) * 100;
    // 年进度
    let yearPass = (month / 12) * 100;
    return {
        day: {
            start: parseInt(todayPassHours),
            pass: parseInt(todayPassHoursPercent),
        },
        week: {
            start: weekDay,
            pass: parseInt(weekDayPassPercent),
        },
        month: {
            start: date,
            pass: parseInt(monthPassPercent),
        },
        year: {
            start: month == 0 ? month : month - 1,
            pass: parseInt(yearPass),
        }
    }
}