<template>
  <section class="app-ecommerce-details">
    <b-row>
      <b-col cols="12">
        <filter-ads />
      </b-col>
      <b-col cols="12">
        <chart-ads />
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="6">
        <home-products />
      </b-col>
      <b-col cols="6">
        <home-services />
      </b-col>
    </b-row>
  </section>
</template>

<script>
// This will be populated in `beforeCreate` hook
import { $themeColors, $themeBreakpoints, $themeConfig } from "@themeConfig";
import { provideToast } from "vue-toastification/composition";
import { watch } from "@vue/composition-api";
import useAppConfig from "@core/app-config/useAppConfig";

import { useWindowSize, useCssVar } from "@vueuse/core";

import store from "@/store";
import api from "@/api/api";
import Vue from "vue";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

const LayoutVertical = () => import("@/layouts/vertical/LayoutVertical.vue");
const LayoutHorizontal = () => import("@/layouts/horizontal/LayoutHorizontal.vue");
const LayoutFull = () => import("@/layouts/full/LayoutFull.vue");

import HomeProducts from "./HomeProducts.vue";
import HomeServices from "./HomeServices.vue";
import FilterAds from "./FilterAds.vue";
import ChartAds from "./ChartAds.vue";
import { BCard, BRow, BCol, BLink } from "bootstrap-vue";

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BLink,
    // Layouts
    LayoutHorizontal,
    LayoutVertical,
    LayoutFull,
    HomeProducts,
    HomeServices,
    ChartAds,
    FilterAds
  },
  // ! We can move this computed: layout & contentLayoutType once we get to use Vue 3
  // Currently, router.currentRoute is not reactive and doesn't trigger any change
  computed: {
    layout() {
      if (this.$route.meta.layout === "full") return "layout-full";
      return `layout-${this.contentLayoutType}`;
    },
    contentLayoutType() {
      return this.$store.state.appConfig.layout.type;
    },
  },
  beforeCreate() {
    // Set colors in theme
    const colors = [
      "primary",
      "secondary",
      "success",
      "info",
      "warning",
      "danger",
      "light",
      "dark",
    ];

    // eslint-disable-next-line no-plusplus
    for (let i = 0, len = colors.length; i < len; i++) {
      $themeColors[colors[i]] = useCssVar(
        `--${colors[i]}`,
        document.documentElement
      ).value.trim();
    }

    // Set Theme Breakpoints
    const breakpoints = ["xs", "sm", "md", "lg", "xl"];

    // eslint-disable-next-line no-plusplus
    for (let i = 0, len = breakpoints.length; i < len; i++) {
      $themeBreakpoints[breakpoints[i]] = Number(
        useCssVar(`--breakpoint-${breakpoints[i]}`, document.documentElement).value.slice(
          0,
          -2
        )
      );
    }

    // Set RTL
    const { isRTL } = $themeConfig.layout;
    document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
  },
  setup() {
    const { skin, skinClasses } = useAppConfig();

    // If skin is dark when initialized => Add class to body
    if (skin.value === "dark") document.body.classList.add("dark-layout");

    // Provide toast for Composition API usage
    // This for those apps/components which uses composition API
    // Demos will still use Options API for ease
    provideToast({
      hideProgressBar: true,
      closeOnClick: false,
      closeButton: false,
      icon: false,
      timeout: 3000,
      transition: "Vue-Toastification__fade",
    });

    // Set Window Width in store
    store.commit("app/UPDATE_WINDOW_WIDTH", window.innerWidth);
    const { width: windowWidth } = useWindowSize();
    watch(windowWidth, (val) => {
      store.commit("app/UPDATE_WINDOW_WIDTH", val);
    });

    return {
      skinClasses,
    };
  },
  data() {
    return {
    };
  },
  created() {},
  methods: {
    
  },
};
</script>

<style lang="scss">
@import "~@core/scss/base/pages/app-ecommerce-details.scss";
@import "@core/scss/vue/libs/vue-sweetalert.scss";
@import "@core/scss/vue/libs/vue-flatpicker.scss";
@import "@core/scss/vue/libs/chart-apex.scss";
@import "@core/scss/vue/libs/vue-select.scss";
</style>
