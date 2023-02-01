<template>
  <div class="time-capsule">
    <div class="title">
      <hourglass-full
        theme="two-tone"
        size="24"
        :fill="['#efefef', '#00000020']"
      />
      <span>时光胶囊</span>
    </div>
    <span class="text"
      >今日已经度过了&nbsp;{{ timeData.day.start }}&nbsp;小时</span
    >
    <el-progress
      :text-inside="true"
      :stroke-width="20"
      :percentage="timeData.day.pass"
    />
    <span class="text"
      >本周已经度过了&nbsp;{{ timeData.week.start }}&nbsp;天</span
    >
    <el-progress
      :text-inside="true"
      :stroke-width="20"
      :percentage="timeData.week.pass"
    />
    <span class="text"
      >本月已经度过了&nbsp;{{ timeData.month.start }}&nbsp;天</span
    >
    <el-progress
      :text-inside="true"
      :stroke-width="20"
      :percentage="timeData.month.pass"
    />
    <span class="text"
      >今年已经度过了&nbsp;{{ timeData.year.start }}&nbsp;个月</span
    >
    <el-progress
      :text-inside="true"
      :stroke-width="20"
      :percentage="timeData.year.pass"
    />
    <span class="text">
      <p id="htmer_time"></p>
    </span>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import { HourglassFull } from "@icon-park/vue-next";
import { getTimeCapsule } from "@/utils/getTime.js";

// 进度条数据
let timeData = ref(getTimeCapsule());
let timeInterval = null;

onMounted(() => {
  timeInterval = setInterval(() => {
    timeData.value = getTimeCapsule();
  }, 1000);
});

onBeforeUnmount(() => {
  clearInterval(timeInterval);
});

// 站点存活时间
let runTime = {
  year: import.meta.env.VITE_SITE_YAER,
  month: import.meta.env.VITE_SITE_MONTH,
  day: import.meta.env.VITE_SITE_DAY,
}

function secondToDate(second) {
  if (!second) {
      return 0;
  }
  var time = new Array(0, 0, 0, 0, 0);
  if (second >= 365 * 24 * 3600) {
      time[0] = parseInt(second / (365 * 24 * 3600));
      second %= 365 * 24 * 3600;
  }
  if (second >= 24 * 3600) {
      time[1] = parseInt(second / (24 * 3600));
      second %= 24 * 3600;
  }
  if (second >= 3600) {
      time[2] = parseInt(second / 3600);
      second %= 3600;
  }
  if (second >= 60) {
      time[3] = parseInt(second / 60);
      second %= 60;
  }
  if (second > 0) {
      time[4] = second;
  }
  return time;
}

function setTime() {
  //month要少一个月，不然会出问题。即month的范围为 0-11
  var create_time = Math.round(new Date(Date.UTC(runTime.year, runTime.month,runTime.day, 0, 0, 0)).getTime() / 1000);
  var timestamp = Math.round((new Date().getTime() + 8 * 60 * 60 * 1000) / 1000);
  var currentTime = secondToDate((  timestamp-create_time));
  var currentTimeHtml = currentTime[0] + ' 年 ' + currentTime[1] + ' 天 '
      + currentTime[2] + ' 时 ' + currentTime[3] + ' 分 ' + currentTime[4]
      + ' 秒';
  if(document.getElementById("htmer_time")!=null)
      document.getElementById("htmer_time").innerHTML = "本站已经苟活 "+currentTimeHtml;
}
// 即时刷新站点存活时间
setInterval(setTime, 1000);
</script>

<style lang="scss" scoped>
.time-capsule {
  width: 100%;
  .title {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0.2rem 0 1.5rem;
    font-size: 1.1rem;
    .i-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 6px;
    }
  }
  .text {
    display: block;
    margin: 1rem 0rem 0.5rem 0rem;
    font-size: 0.95rem;
  }
}
</style>