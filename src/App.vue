<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="scss">
  body{
    color: var(--tg-theme-text-color);
    background: var(--tg-theme-bg-color);
  }
  #app{
    font-family: 'Montserrat', sans-serif;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    padding: 10px 10px 0;
  }
</style>