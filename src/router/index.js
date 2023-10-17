//在这里定义路由表
import { createRouter, createWebHistory } from "vue-router";

// 引入
import Home from "@/views/Home/index.vue";
const About = { template: "<div>about</div>" };
// 路由信息
let routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/12",
    component: About,
  },
];

// 路由器
const router = createRouter({
  history: createWebHistory(), // HTML5模式
  routes,
});

export default router;
