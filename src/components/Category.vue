<template>
    <div class="category">
        <div class="category-top">
            <div class="category-text">
                <h3>{{ name }}</h3>
                <p v-html="description"></p>
            </div>
        </div>
        <div class="subcategories">
            <router-link v-for="subcategory in subcategories" :key="subcategory.id" class="subcategory" :to="{name: 'subcategory', params: {slug: subcategory.id}}">
                <div class="subcategory-title">
                    {{ subcategory.name }}
                </div>
                <div class="subcategory-next">
                    <img src="@/assets/next.png" alt="">
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex';
export default {
    name: 'AppCategory',
    computed: {
        subcategories(){
            let categories = this.$store.state.categories;
            let category_id = this.$route.params.slug;
            let category = categories.find(item => item.id == category_id);
            let getSubcategories = category.categories;
            return getSubcategories;
        },
    },
    methods: {
      ...mapActions([
        'backButtonShow',
      ])
    },
    mounted() {
      this.backButtonShow();
    },
    props: ['name', 'description'],
}
</script>

<style scoped>
    .category{
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        padding-bottom: 10px;
    }
    .category-text>h3{
        font-size: 15px;
        color: var(--tg-theme-text-color);
        font-weight: 700;
        margin-bottom: 5px;
    }
    .category-text p{
        font-size: 11px;
        font-weight: 300;
        color: var(--tg-theme-text-color);
    }
    .subcategories{
        display: flex;
        flex-direction: column;
    }
    .subcategory{
        width: 100%;
        display: flex;
        min-height: 38px;
        margin-bottom: 10px;
        background: #34495e;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        color: #fff;
        text-decoration: none;
    }
    .subcategory-title{
        font-size: 13px;
        margin-right: 5px;
    }
    .subcategory-next>img{
        width: 12px;
    }
</style>