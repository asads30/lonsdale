<template>
    <div class="Item">
        <router-link class="item__img" :to="'/product/' + product.id">
          <img :src="product.image_url">
          <span class="item__counter" v-if="quantity > 0">{{ quantity }}</span>
        </router-link>
        <div class="item__info">
          <router-link :to="'/product/' + product.id" class="item__name">{{ product.name }}</router-link>
          <span class="item__price">{{ product.price }} ₽</span>
        </div>
        <button v-if="btnActive" class="item__add" type="button" @click="addToCart">В корзину</button>
        <div v-if="!btnActive" class="item__quantity">
          <button class="item__quantity-item item__quantity--minus" type="button" @click="reduceQuantity">-</button>
          <button class="item__quantity-item item__quantity--plus" type="button" @click="increaseQuantity">+</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AppItem',
    props: {
        product: {
            type: Object,
            required: true
        },
    },
    computed: {
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
        }
    }
}
</script>

<style lang="scss" scoped>
.item{
    display: flex;
    flex-direction: column;
    width: calc(33% - 7px);
    text-align: center;
    margin-bottom: 10px;
    &__img{
        margin-bottom: 5px;
        position: relative;
        img{
            height: 70px;
            width: auto;
        }
    }
    &__counter{
        position: absolute;
        top: -5px;
        right: -5px;
        background: #ffa502;
        border-radius: 20px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        color: #fff;
        font-size: 12px;
        font-weight: 700;
    }
    &__info{
        display: flex;
        flex-direction: column;
        margin-bottom: 5px;
    }
    &__name{
        font-size: 14px;
        color: var(--tg-theme-text-color);
        text-decoration: none;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    &__price{
        color: var(--tg-theme-text-color);
        font-size: 16px;
        font-weight: 700;
    }
    &__add{
        background: #ffa502;
        width: 100%;
        height: 28px;
        line-height: 28px;
        border: 0;
        border-radius: 4px;
        color: #fff;
        font-size: 14px;
        font-weight: 700;
    }
    &__quantity{
        display: flex;
        justify-content: center;
        gap: 5px;
        &-item{
            width: 28px;
            height: 28px;
            border: 0;
            color: #fff;
            font-size: 20px;
            line-height: 28px;
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
</style>