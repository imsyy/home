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
            var myWeek = myDate.getDay() + 6; //获取当前星期几(0-6)

            this.hour = myHours;
            this.year = myYear;
            this.month = myMonth - 1;
            this.day = myDay - 1;
            this.curday = myDay;
            this.week = myWeek;
            this.curweek = myWeek + 1;
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