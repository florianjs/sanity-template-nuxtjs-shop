<template>
  <div class="md:w-3/4 px-4 md:px-0 mx-auto grid grid-cols-12 gap-6 pb-16">
    <nuxt-img
      :src="header.mainImage.asset._ref"
      :alt="header.mainImage.alt"
      provider="sanity"
      fit="cover"
      class="col-span-12 rounded-lg object-cover h-96 w-full"
      height="600px"
      :modifiers="{
        crop: header.mainImage.crop,
        hotspot: header.mainImage.hotspot,
      }"
    />
    <SanityContent
      :style="cssVars"
      class="content text-4xl md:text-6xl col-span-12 md:col-span-8 font-bold"
      :blocks="header.body"
    />
    <div class="col-span-12 gap-6 grid grid-cols-3">
      <nuxt-link
        :to="`/shop/${item.slug}`"
        class="
          group
          col-span-3
          md:col-span-1
          rounded-lg
          w-full
          h-64
          relative
          flex
          justify-end
          items-end
          p-6
          bg-center
        "
        v-for="item in products"
        :key="item.slug"
      >
        <nuxt-img
          :src="item.mainImage.asset._ref"
          :alt="item.mainImage.alt"
          provider="sanity"
          class="
            absolute
            top-0
            left-0
            z-0
            w-full
            h-full
            object-cover
            rounded-lg
          "
          :modifiers="{
            crop: item.mainImage.crop,
            hotspot: item.mainImage.hotspot,
          }"
        />
        <div
          class="
            absolute
            top-0
            left-0
            bg-black
            group-hover:opacity-40
            opacity-40
            md:opacity-0
            ease-in-out
            duration-200
            transform
            z-10
            w-full
            h-full
            rounded-lg
          "
        ></div>
        <div
          class="
            z-30
            group-hover:opacity-100
            md:opacity-0
            ease-in-out
            duration-200
            transform
          "
        >
          <p class="font-semibold text-white text-4xl">
            {{ item.title }}
          </p>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $sanity, $api }) {
    const { header } = await $sanity.fetch($api.header)

    return {
      products: header[0].items,
      header: header[0],
      color: header[0].colorlist,
    }
  },

  computed: {
    cssVars() {
      return {
        '--text-color': this.color,
      }
    },
  },
}
</script>

<style lang="scss">
.content {
  strong {
    @apply font-bold;
    color: var(--text-color);
  }
}
</style>
