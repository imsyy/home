/*
var vm = new Vue({
    el: '#date',
    data: {
        hour: "",
        week: "",
        curweek: "",
        day: "",
        curday: "",
        month: "",
        outday: "",
    },
    created: function () { //这里是定时器
        this.timer();
        setInterval(this.timer, 60000);
    },
    methods: {
        timer: function () {
            var myDate = new Date();
            var myYear = myDate.getFullYear(); // 获取当前年份
            var myMonth = myDate.getMonth() + 1; // 获取当前月份
            var myDay = myDate.getDate(); // 获取当前日（1- 31）
            var myHours = myDate.getHours(); // 获取当前小时(0-23)
            var myMinu = myDate.getMinutes(); // 获取当前分钟(0-59)
            var mySec = myDate.getSeconds(); // 获取当前秒数(0-59)
            var myWeek = myDate.getDay(); //获取当前星期几(0-6)

            this.hour = myHours;
            this.year = myYear;
            this.month = myMonth - 1;
            this.day = myDay - 1;
            this.curday = myDay;
            this.week = myWeek + 6;
            this.curweek = myWeek + 7;
            this.minute = myMinu;
            this.age = myYear - this.yearForYour;
        },
        //今天
        jinduT: function () {
            var tian = ((this.hour * 60 + this.minute) / 24 / 60 * 100).toFixed(1);
            return "<div class='progress'><div class='progress-bar' style='width:" + tian + "%'>" + tian + " %" +
                "</div></div>";
        },
        //本周
        jinduZ: function () {
            var curdayWithHour = (this.week * 24 * 60 + this.hour * 60 + this.minute) / 7 / 24 / 60;
            var zhou = (curdayWithHour * 100).toFixed(1);
            return "<div class='progress'><div class='progress-bar' style='width:" + zhou + "%'>" + zhou + " %" +
                "</div></div>";
        },
        //这个月
        jinduD: function () {
            var days = new Date(this.year, this.month + 1, 0).getDate();
            var yue = ((this.day * 24 * 60 + this.hour * 60 + this.minute) / days / 24 / 60 * 100)
                .toFixed(1);
            return "<div class='progress'><div class='progress-bar" + "' style='width:" + yue +
                "%'>" + yue + " %" + "</div></div>";
        },
        //年
        jinduY: function () {
            var olddate = new Date(this.year, 0);
            var nowdate = new Date(this.year, this.month, this.day + 1);
            var outday = (nowdate - olddate) / (1000 * 60 * 60 * 24) + 1; //
            this.outday = outday; //已经过去天数
            var isLeap = (0 === this.year % 4) && (0 === this.year % 100) || (0 === this.year %
                400);
            var days = isLeap ? 366 : 365; //今年的天数
            var ye = (((outday - 1) * 24 * 60 + this.hour * 60 + this.minute) / days / 24 / 60 *
                100).toFixed(1);
            return "<div class='progress'><div class='progress-bar" + "' style='width:" + ye +
                "%'>" + ye + " %" + "</div></div>";
        }
    }
})
*/

function init_life_time() {
    function getAsideLifeTime() {
        /* 当前时间戳 */
        let nowDate = +new Date();
        /* 今天开始时间戳 */
        let todayStartDate = new Date(new Date().toLocaleDateString()).getTime();
        /* 今天已经过去的时间 */
        let todayPassHours = (nowDate - todayStartDate) / 1000 / 60 / 60;
        /* 今天已经过去的时间比 */
        let todayPassHoursPercent = (todayPassHours / 24) * 100;
        $('#dayProgress .date-text span').html(parseInt(todayPassHours));
        $('#dayProgress .progress .progress-bar').css('width', parseInt(todayPassHoursPercent) + '%');
        $('#dayProgress .progress .progress-bar').html(parseInt(todayPassHoursPercent) + '%');
        /* 当前周几 */
        let weeks = {
            0: 7,
            1: 1,
            2: 2,
            3: 3,
            4: 4,
            5: 5,
            6: 6
        };
        let weekDay = weeks[new Date().getDay()];
        let weekDayPassPercent = (weekDay / 7) * 100;
        $('#weekProgress .date-text span').html(weekDay);
        $('#weekProgress .progress .progress-bar').css('width', parseInt(weekDayPassPercent) + '%');
        $('#weekProgress .progress .progress-bar').html(parseInt(weekDayPassPercent) + '%');
        /* 月 */
        let year = new Date().getFullYear();
        let date = new Date().getDate();
        let month = new Date().getMonth() + 1;
        let monthAll = new Date(year, month, 0).getDate();
        let monthPassPercent = (date / monthAll) * 100;
        $('#monthProgress .date-text span').html(date);
        $('#monthProgress .progress .progress-bar').css('width', parseInt(monthPassPercent) + '%');
        $('#monthProgress .progress .progress-bar').html(parseInt(monthPassPercent) + '%');
        /* 年 */
        let yearPass = (month / 12) * 100;
        $('#yearProgress .date-text span').html(month);
        $('#yearProgress .progress .progress-bar').css('width', parseInt(yearPass) + '%');
        $('#yearProgress .progress .progress-bar').html(parseInt(yearPass) + '%');
    }
    getAsideLifeTime();
    setInterval(() => {
        getAsideLifeTime();
    }, 1000);
}
init_life_time()