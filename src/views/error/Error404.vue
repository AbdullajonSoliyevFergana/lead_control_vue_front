<template>
  <!-- Error page-->
  <div class="misc-wrapper">
    <b-link class="brand-logo">
      <vuexy-logo-white v-if="skin == 'light'" />
      <vuexy-logo-black v-else />
      <h2 class="brand-text text-primary ml-1"></h2>
    </b-link>

    <div class="misc-inner p-2 p-sm-3">
      <div class="w-100 text-center">
        <h2 class="mb-1">Саҳифа топилмади 🕵🏻‍♀️</h2>
        <p class="mb-2">Вой-буй! 😖 Сўралган URL бу серверда топилмади.</p>

        <b-button variant="primary" class="mb-2 btn-sm-block" :to="{ path: '/' }">
          Асосий саҳифага қайтинг
        </b-button>

        <!-- image -->
        <b-img fluid :src="imgUrl" alt="Error page" />
      </div>
    </div>
  </div>
  <!-- / Error page-->
</template>

<script>
/* eslint-disable global-require */
import { BLink, BButton, BImg } from "bootstrap-vue";
import VuexyLogoWhite from "@core/layouts/components/LogoWhite.vue";
import VuexyLogoBlack from "@core/layouts/components/LogoBlack.vue";
import store from "@/store/index";
import useAppConfig from "@core/app-config/useAppConfig";

export default {
  components: {
    VuexyLogoWhite,
    VuexyLogoBlack,
    BLink,
    BButton,
    BImg,
  },
  data() {
    return {
      downImg: require("@/assets/images/pages/error.svg"),
    };
  },
  computed: {
    imgUrl() {
      if (store.state.appConfig.layout.skin === "dark") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.downImg = require("@/assets/images/pages/error-dark.svg");
        return this.downImg;
      }
      return this.downImg;
    },
  },
  setup() {
    const { skin } = useAppConfig();
    return {
      // Skin
      skin,
    };
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-misc.scss";
</style>
