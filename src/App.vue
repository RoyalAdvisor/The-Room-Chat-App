<script setup>
</script>

<template>
  <router-view v-slot="{ Component } ">
    <transition name="fade" mode="out-in" appear>
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>


<style>
    .fade-enter-from {
        opacity: 0;
        transform: translateX(4rem);
    }
    .fade-move {
        transition: all 500ms ease;
    }
    .fade-enter-active {
        transition: all 500ms ease;
    }
    .fade-leave-to {
        opacity: 0;
        transform: translateX(4rem);
    }
    .fade-leave-active {
        transition: all 500ms ease;
        position: absolute;
    }
</style>