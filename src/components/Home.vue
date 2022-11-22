<template>
  <div class="home">
    <div class="categories">
      <router-link v-for="category in categories.slice(0, 6)" :key="category.id" class="category" :to="{name: 'category', params: {slug: category.id, name: category.name, description: category.description}}">
        <div class="category-title">{{ category.name }}</div>
        <div class="category-img">
            <img :src=" require('../assets/categories/' + category.id + '.webp') ">
        </div>
      </router-link>
    </div>
  </div>
</template>
  
<script>
  import {mapActions, mapState} from 'vuex';
  export default {
    name: "AppHome",
    computed: {
      ...mapState([
        "categories",
      ])
    },
    methods: {
      ...mapActions([
        'startInit',
        'fetchCategories'
      ])
    },
    mounted() {
      this.startInit();
      this.fetchCategories();
    }
  }
  </script>
  
<style scoped>
  .home{
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    padding-bottom: 10px;
  }
  .categories{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .news{
    width: 100%;
    display: block;
    text-align: center;
    text-decoration: none;
    background: #27ae60;
    height: 40px;
    line-height: 40px;
    color: #fff;
    margin-bottom: 10px;
  }
  .sales{
    width: 100%;
    display: block;
    text-align: center;
    text-decoration: none;
    background: #c0392b;
    height: 40px;
    line-height: 40px;
    color: #fff;
  }
  .category{
    width: calc(50% - 5px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    position: relative;
  }
  .category-title{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
    color: #fff;
    background: rgba(0,0,0,0.5);
    padding: 10px 0;
    font-size: 14px;
  }
  .category-img{
    width: 100%;
  }
  .category-img>img{
    width: 100%;
  }
</style>