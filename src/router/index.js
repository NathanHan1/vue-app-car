import Vue from 'vue';
import VueRouter from 'vue-router';
// import index from './components/index.vue';
// import users from './components/users/index.vue';
// import coolfrom from './components/coolfrom/index.vue';

Vue.use(VueRouter);

const carlist = () => import('../components/carlist/index.vue');
const users = () => import('../components/users/index.vue');
const home = ()=>import('../components/home/index.vue')

export default new VueRouter({
    routes: [
        {path:"/", name:"首页", component:home },
        { path: '/carlist', name: '汽车列表', component: carlist },
        { path: '/users', name: '用户中心', component: users }
        // {path:"/coolfrom", name:"酷表单", component:coolfrom },
        // {path:"*", redirect:"/"}
    ]
});
