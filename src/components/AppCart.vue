<template>
  <div class="cart">
    <div class="cart__wrapper">
      <div class="cart__top">
        <div class="cart__header">
          <h2 class="cart__title">Ваш заказ</h2>
        </div>
        <div class="cart__list">
          <AppCartItem
            class="cart__item"
            v-for="cartItemProduct in cart"
            :key="cartItemProduct.id"
            :cartItemProduct="cartItemProduct"
          />
        </div>
      </div>
      <div class="cart__footer">
        <div class="cart__total">
          <span class="cart__total-title">Итого</span>
          <span class="cart__total-cost">{{ cartTotalCost }} ₽</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppCartItem from "@/components/AppCartItem";
import {mapState, mapActions} from "vuex";
import axios from 'axios';

export default {
  name: "AppCart",
  components: {AppCartItem},
  computed: {
    ...mapState([
      'cart',
    ]),
    cartTotalCost() {
      let result = [];

      if (this.cart.length) {
        for (let product of this.cart) {
          result.push(product.price.toFixed(2) * product.quantity.toFixed(2));
        }

        result = result.reduce(function (sum, el) {
          return sum + el;
        })

        result.toFixed(2);
      }
      return result;
    },
    cartList() {
      let result = [];

      if (this.cart.length) {
        for (let product of this.cart) {
          result.push({
            label: product.name,
            amount: product.price.toFixed(2) * product.quantity.toFixed(2) * 100
          });
        }
      }
      return result;
    }
  },
  methods: {
    ...mapActions([
      'backButtonShow',
    ]),
    goHome(){
      this.$router.push({name: 'home'});
      window.Telegram.WebApp.offEvent('mainButtonClicked', this.goPay);
    },
    goPay(){
      const invoice = {
        provider_token: "1842663557:TEST:54fcd6df8cbdb866cbc53045a9bfa8f89b0bdb27",
        start_parameter: "get_access",
        title: "Тестовый магазин",
        description: "Тестовый магазин Карена",
        currency: "RUB",
        prices: this.cartList,
        payload: 'test',
        need_name: true,
        need_phone_number: true,
        need_email: false,
        need_shipping_address: true
      };
      axios.post(`https://api.telegram.org/bot5628922941:AAHibZzGLVFpG5ezw185_y-6h9gwLRePjf8/createInvoiceLink`, invoice).then(res => {
        if(res.data.result){
          let tg = window.Telegram.WebApp;
          tg.openInvoice(res.data.result, function(status) {
              if (status == 'paid') {
                  tg.WebApp.close();
              } else if (status == 'failed') {
                  tg.WebApp.HapticFeedback.notificationOccurred('error');
              } else {
                  tg.WebApp.HapticFeedback.notificationOccurred('warning');
              }
          });
        }
      });
    }
  },
  mounted(){
    this.backButtonShow,
    window.Telegram.WebApp.onEvent('backButtonClicked', this.goHome);
    window.Telegram.WebApp.onEvent('mainButtonClicked', this.goPay);
  }
}
</script>

<style lang="scss" scoped>
  .cart{
    width: 100%;
    height: calc(100vh - 20px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &__wrapper{
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    &__header{
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
    }
    &__title{
      margin: 0;
      font-size: 20px;
      font-weight: 700;
      color: var(--tg-theme-text-color);
    }
    &__to-catalog{
      color: var(--tg-theme-hint-color);
      font-size: 15px;
    }
    &__footer{
      padding-bottom: 20px;
    }
    &__dilevery{
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      border-bottom: 1px solid var(--tg-theme-hint-color);
      padding-bottom: 20px;
      &-title{
        font-size: 16px;
      }
      &-cost{
        font-size: 16px;
        font-weight: 700;
      }
    }
    &__total{
      display: flex;
      justify-content: space-between;
      &-title{
        font-size: 24px;
        font-weight: 700;
      }
      &-cost{
        font-size: 20px;
        font-weight: 700;
      }
    }
  }
</style>