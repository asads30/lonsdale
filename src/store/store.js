import {createStore} from 'vuex';
import api from '@/services/api';

export default createStore({
    state: {
        userData: [],
        categories: [],
        products: [],
        cart: []
    },
    mutations: {
        setCategories: (state, categories) => {
            state.categories = categories
        },
        addToCart: (state, product) => {
            product.isBtnActive = false;
            product.quantity = 1;
            state.cart.push(product);
            let tg = window.Telegram.WebApp;
            tg.MainButton.show();
            tg.MainButton.enable();
        },
        increaseQuantity: (state, productId) => {
            state.cart.map(product => {
                if (product.id === productId) {
                    product.quantity++;
                    if (product.quantity > 0) {
                        product.isBtnActive = false;
                        let tg = window.Telegram.WebApp;
                        tg.MainButton.show();
                        tg.MainButton.enable();
                    }
                }
            })
        },
        reduceQuantity: (state, productId) => {
            state.cart.map(product => {
                if (product.id === productId) {
                    if (product.quantity > 0) {
                        product.quantity--;
                    }
                    if (product.quantity === 0) {
                        product.isBtnActive = true;
                        state.cart = state.cart.filter(product => product.id !== productId);
                        if(state.cart.length === 0){
                            let tg = window.Telegram.WebApp;
                            tg.MainButton.hide();
                            tg.MainButton.disable();
                        }
                    }
                }
            })
        },
        setProducts: (state, products) => {
            if (state.products.length === 0) {
                state.products = products
            } else {
                state.products.push(products)
            }
        },
    },
    actions: {
        startInit(state){
            let tg = window.Telegram.WebApp;
            tg.expand();
            tg.MainButton.setParams({
                text: 'ЗАКАЗАТЬ',
                color: '#27ae60',
                text_color: '#fff'
            });
            tg.BackButton.hide();
            tg.isClosingConfirmationEnabled = true;
            state.userData = tg.initDataUnsafe;
        },
        backButtonShow(){
            let tg = window.Telegram.WebApp;
            tg.BackButton.show();
        },
        async fetchCategories({commit}) {
            const response = await api.fetchCategories();
            commit('setCategories', response.data.categories);
        },
        async fetchProducts({commit}, id) {
            const response = await api.fetchProducts(id);
            commit('setProducts', response.data.products);
        },
    },
})
