import {
    createApp
} from 'vue';
import '@/style/style.scss';
import App from '@/App.vue';
// 引入 pinia
import {
    createPinia
} from 'pinia'

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.mount('#app')