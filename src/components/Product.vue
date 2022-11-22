<template>
    <div class="AppProduct">
        <div class="product">
            <div class="product__image">
                <img :src="product.image_url">
                <span class="product__counter" v-if="quantity > 0">{{ quantity }}</span>
            </div>
            <div class="product__info">
                <div class="product__name">
                    {{ product.name }}
                </div>
                <div class="product__price">
                    {{ product.price }} ₽
                </div>
            </div>
            <div class="product__des">
                {{ product.short }}
            </div>
            <button v-if="btnActive" class="product__add" type="button" @click="addToCart">В корзину</button>
            <div v-if="!btnActive" class="product__quantity">
                <button class="product__quantity-item product__quantity--minus" type="button" @click="reduceQuantity">-</button>
                <button class="product__quantity-item product__quantity--plus" type="button" @click="increaseQuantity">+</button>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex';
export default {
    name: 'AppProduct',
    computed: {
        product(){
            let products = this.$store.state.products;
            let productId = this.$route.params.slug;
            let getProduct = products.find(product => product.id == productId);
            return getProduct;
        },
        quantity() {
            return this.$store.state.cart.find(product => product.id === this.product.id)?.quantity || null;
        },
        btnActive() {
            return this.$store.state.cart.find(product => product.id === this.product.id) ? this.product.isBtnActive : true;
        },
    },
    methods: {
        addToCart() {
            this.$store.commit('addToCart', this.product);
        },
        reduceQuantity() {
            this.$store.commit('reduceQuantity', this.product.id);
        },
        increaseQuantity() {
            this.$store.commit('increaseQuantity', this.product.id);
        },
        ...mapActions([
            'productInit'
        ]),
        goHome(){
            this.$router.push({name: 'home'});
        }
    },
    mounted() {
        this.productInit(),
        window.Telegram.WebApp.onEvent('backButtonClicked', this.goHome);
    }
}
</script>

<style lang="scss" scoped>
    .AppProduct{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        width: 100%;
    }
    .product{
        &__image{
            margin-bottom: 10px;
            text-align: center;
            position: relative;
            padding-top: 20px;
            img{
                width: 50%;
                height: auto;
            }
        }
        &__counter{
            position: absolute;
            top: 0;
            right: 0;
            background: #ffa502;
            border-radius: 24px;
            width: 24px;
            height: 24px;
            line-height: 24px;
            color: #fff;
            font-size: 14px;
            font-weight: 700;
        }
        &__info{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 2px;
        }
        &__name{
            font-size: 20px;
        }
        &__price{
            font-size: 24px;
            font-weight: 700;
        }
        &__des{
            margin-bottom: 10px;
        }
        &__add{
            background: #ffa502;
            width: 100%;
            height: 38px;
            line-height: 38px;
            border: 0;
            border-radius: 4px;
            color: #fff;
            font-size: 16px;
            font-weight: 700;
        }
        &__quantity{
            display: flex;
            justify-content: center;
            gap: 5px;
            &-item{
                width: 38px;
                height: 38px;
                border: 0;
                color: #fff;
                font-size: 24px;
                line-height: 38px;
                font-weight: 700;
                border-radius: 4px;
            }
            &--minus {
                margin-right: 3px;
                background-color: #e73a3a;
                transition: background-color 0.3s ease-in-out;
                &:hover {
                    background-color: #ef7070;
                }
            }
            &--plus {
                background-color: #fca405;
                transition: background-color 0.3s ease-in-out;
                &:hover {
                    background-color: #f3b952;
                }
            }
        }
    }
    .footer__order2{
        width: 100%;
        background: #27ae60;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #fff;
        font-weight: 700;
        border-radius: 4px;
        cursor: no-drop;
        opacity: 0.4;
        border: 0;
    }
    .footer__order{
        width: 100%;
        background: #27ae60;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #fff;
        font-weight: 700;
        border-radius: 4px;
    }
</style>