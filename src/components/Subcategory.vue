<template>
    <div class="appCatalog">
      <div class="list">
        <Item class="item" v-for="product in products" :key="product.id" :product="product" />
      </div>
    </div>
  </template>
  
  <script>
  import Item from "@/components/Item";
  import {mapState, mapMutations, mapActions} from 'vuex';
  export default {
    name: "AppCatalog",
    components: {Item},
    computed: {
      ...mapState([
        "products",
      ])
    },
    methods: {
      ...mapMutations([
          'increaseQuantity',
          'reduceQuantity'
      ]),
      ...mapActions([
        'fetchProducts',
      ]),
      goCart(){
        this.$router.push({name: 'cart'});
        window.Telegram.WebApp.BackButton.show();
        window.Telegram.WebApp.MainButton.setParams({
          text: 'ОПЛАТИТЬ'
        });
      }
    },
    mounted() {
      this.fetchProducts(this.$route.params.slug);
      window.Telegram.WebApp.onEvent('mainButtonClicked', this.goCart);
    }
  }
  </script>
  
  <style scoped>
    .appCatalog{
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
      padding-bottom: 10px;
    }
    .list{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 10px;
    }
  </style>