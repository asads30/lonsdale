<template>
  <div class="cart-item">
    <div class="cart-item__info">
      <div>
        <div class="cart-item__about">
          <span class="cart-item__name">
            {{ cartItemProduct.name }}
            <span class="cart-item__quantity"> - {{ cartItemProduct.quantity }} шт</span>
          </span>
        </div>
      </div>

    </div>
    <strong class="cart-item__price">{{ (cartItemProduct.quantity * cartItemProduct.price).toFixed(2) }} ₽</strong>
  </div>
</template>

<script>
export default {
  name: "AppCartItem",
  props: {
    cartItemProduct: {
      type: Object,
      required: true
    }
  },
}
</script>

<style lang="scss" scoped>
  .cart-item{
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__quantity{
      font-weight: 700;
    }
  }
</style>