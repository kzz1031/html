import {createRouter, createWebHistory} from "vue-router";

import Login from '@/pages/Login.vue';
import Index from "@/pages/Index.vue";
import Test from "@/pages/Test.vue";
import IndexMain from "@/components/IndexMain.vue";
//import CheckUserInfo from "@/components/CheckUserInfo.vue";
//import AddUser from "@/components/AddUser.vue";
import Register from "@/pages/Register.vue";
import Chat from "@/pages/chatgpt.vue";

const routes =
    [
        {
            path: '/',
            name: 'Chat',
            component: Chat
        },
        {
            path: '/Login',
            name: 'Login',
            component: Login
        },
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        {
            path: '/index',
            name: 'Index',
            component: Index,
            children: [
                {
                    path: '',
                    name:'IndexMain',
                    component: IndexMain,
                },/*
                {
                    path: 'checkUserInfo',
                    component: CheckUserInfo,
                },
                {
                    path: 'addUser',
                    component: AddUser,
                },*/
            ]

        },
        {
            path: '/test',
            name: 'Test',
            component: Test
        }
    ];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
