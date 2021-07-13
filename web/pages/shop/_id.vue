<template>
  <div class="px-4 md:w-3/4 mx-auto grid grid-cols-12 gap-6 py-16">
    <nuxt-img
      :src="product.mainImage.asset._ref"
      :alt="product.mainImage.alt"
      provider="sanity"
      class="col-span-12 md:col-span-8 rounded-lg object-cover h-96 w-full"
      :modifiers="{
        crop: product.mainImage.crop,
        hotspot: product.mainImage.hotspot,
      }"
    />
    <SanityContent
      :style="cssVars"
      class="content text-6xl col-span-12 md:col-span-4 font-bold"
      :blocks="product.body"
    />

    <div class="col-span-12 gap-6 h-full grid grid-cols-3">
      <div class="col-span-3 lg:col-span-2 grid grid-cols-2 gap-6">
        <div
          v-for="item in product.imagesGallery"
          @click="showGallery(item)"
          :key="item._key"
          class="w-full h-96 cursor-pointer col-span-2 md:col-span-1 rounded-lg"
        >
          <nuxt-img
            :src="item.asset._ref"
            :alt="item.alt"
            provider="sanity"
            class="
              col-span-12
              md:col-span-8
              rounded-lg
              object-cover
              h-full
              w-full
            "
            :modifiers="{
              crop: item.crop,
              hotspot: item.hotspot,
            }"
          />
        </div>
      </div>

      <div
        class="
          col-span-3
          lg:col-span-1
          row-span-3
          w-full
          h-full
          order-2
          flex flex-col
        "
      >
        <div class="top-4 sticky flex flex-col">
          <label class="text-2xl font-semibold" for="size"
            >Choose your size :</label
          >
          <div class="grid grid-cols-4 gap-4 mb-6">
            <div
              v-for="(item, index) in product.prices"
              :key="index"
              class="
                size
                rounded-lg
                border
                h-12
                flex
                justify-center
                items-center
                font-bold
                text-xl
                cursor-pointer
                select-none
                transform
                duration-200
                easi-in-out
              "
              :style="sizesClass(index) ? cssVars : ''"
              :class="sizesClass(index) && `text-white `"
              @click="sizesChoose(index, item.Stripe)"
            >
              {{ item.Size }}
            </div>
          </div>
          <p class="text-6xl font-bold">
            {{ product.prices[chooseSize].Price }}€
          </p>

          <button
            :style="cssVars"
            class="
              rounded-lg
              text-2xl
              font-bold
              py-2
              text-purple-100
              hover:bg-gray-800 hover:translate-y-1 hover:shadow-none
              shadow
              ease-in-out
              duration-200
              transform
            "
            @click="checkout()"
          >
            Make it yours
          </button>
          <div
            v-if="error.isError"
            class="
              rounded-lg
              text-2xl
              font-bold
              p-2
              bg-red-500
              text-purple-100 text-center
              ease-in-out
              duration-200
              transform
              my-4
            "
          >
            Woops. {{ error.message }}
          </div>
        </div>
      </div>
    </div>
    <transition name="slide-fade">
      <div
        class="fixed top-0 left-0 h-screen w-screen"
        v-if="gallery"
        @click="gallery = false"
      >
        <div
          class="absolute top-0 w-full h-full bg-black left-0 opacity-25 z-10"
        ></div>
        <div
          class="
            absolute
            top-0
            left-0
            w-full
            h-full
            flex
            justify-center
            items-center
            z-30
          "
        >
          <nuxt-img
            :src="currentGalleryImg.src"
            :alt="currentGalleryImg.alt"
            provider="sanity"
            class="rounded-lg bg-white object-cover"
            style="height: 90vh"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  async asyncData({ params, $sanity, $api }) {
    const { item } = await $sanity.fetch($api.article(params.id))
    const { header } = await $sanity.fetch($api.header)

    return {
      product: item[0],
      stripeRef: item[0].prices[0].Stripe,
      color: header[0].colorlist,
      stripe: header[0],
    }
  },
  data() {
    return {
      chooseSize: 0,
      gallery: false,
      currentGalleryImg: '',
      loading: false,
      error: { isError: false, message: '' },
    }
  },

  methods: {
    sizesChoose(index, stripe) {
      this.chooseSize = index
      this.stripeRef = stripe
    },
    showGallery(img) {
      this.gallery = true
      this.currentGalleryImg = { src: img.asset._ref, alt: img.alt }
    },
    sizesClass(index) {
      if (index === this.chooseSize) return true
      return false
    },
    checkout() {
      this.$stripe
        .redirectToCheckout({
          lineItems: [{ price: this.stripeRef, quantity: 1 }],
          mode: 'payment',
          successUrl: this.stripe.success,
          cancelUrl: this.stripe.cancel,
        })
        .catch((error) => {
          if (error.message) {
            this.error.isError = true
            this.error.message = error.message
          }
        })
    },
  },

  computed: {
    cssVars() {
      return {
        '--bg-color': this.color,
        '--text-color': this.color,
      }
    },
  },
}
</script>

<style lang="scss">
button {
  background-color: var(--bg-color);
}
button:hover {
  color: var(--text-color);
}
.size {
  background-color: var(--bg-color);
}
</style>
