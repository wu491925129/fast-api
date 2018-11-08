<template>
  <div id="app" class="app-main">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
html,body{
    width: 100%;
    height: 100%;
    overflow: hidden;
}
.app-main{
    width: 100%;
    height: 100%;
}
.lock-screen-back{
    border-radius: 50%;
    z-index: -1;
    box-shadow: 0 0 0 0 #667aa6 inset;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    transition: all 3s;
}
</style>
