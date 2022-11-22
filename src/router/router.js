import {createRouter, createWebHistory} from "vue-router";
import Home from "@/components/Home";
import Category from "@/components/Category";
import Subcategory from "@/components/Subcategory";
import Product from '@/components/Product';
import AppCart from "@/components/AppCart";

const routes = [
    {
        path: '/',
        component: Home,
        name: 'home',
    },
    {
        path: '/category/:slug',
        component: Category,
        name: 'category',
        props: true
    },
    {
        path: '/subcategory/:slug',
        component: Subcategory,
        name: 'subcategory',
        props: true
    },
    {
        path: '/product/:slug',
        component: Product,
        name: 'product'
    },
    {
        path: '/cart',
        component: AppCart,
        name: 'cart',
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;