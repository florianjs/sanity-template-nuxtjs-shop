<template>
  <header class="w-3/4 mx-auto flex justify-between py-8">
    <nuxt-link to="/" style="color: red"
      ><nuxt-img
        src="/img/logo.svg"
        class="
          h-12
          transform
          hover:rotate-45
          fill-current
          ease-in-out
          duration-500
        "
        alt="logo image"
    /></nuxt-link>
  </header>
</template>

<script>
export default {
  computed: {
    logo() {
      return process.env.BASE_URL + '/assets/' + this.$seo.logo
    },
    colorschema() {
      return this.$seo.color
    },
    seo() {
      return this.$seo
    },
  },
}
</script>

<style scoped>
.color-svg {
  fill: red;
}
</style>
