<template>
  <div id="app" class="h-100" :class="[skinClasses]">
    <component :is="layout">
      <router-view />
    </component>
    <audio :src="require('@/assets/sounds/short_message.mp3')" id="audios"></audio>
    <scroll-to-top v-if="enableScrollToTop" />
  </div>
</template>

<script>
import ScrollToTop from "@core/components/scroll-to-top/ScrollToTop.vue";

import navMenuItems from "@/navigation/vertical";
// This will be populated in `beforeCreate` hook
import { $themeColors, $themeBreakpoints, $themeConfig } from "@themeConfig";
import { provideToast } from "vue-toastification/composition";
import { watch } from "@vue/composition-api";
import useAppConfig from "@core/app-config/useAppConfig";

import { useWindowSize, useCssVar } from "@vueuse/core";

import store from "@/store";

const LayoutVertical = () => import("@/layouts/vertical/LayoutVertical.vue");
// const LayoutHorizontal = () =>
//   import("@/layouts/horizontal/LayoutHorizontal.vue");
const LayoutFull = () => import("@/layouts/full/LayoutFull.vue");
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import api from "@/api/api";
import Vue from "vue";
import { isUserLoggedIn } from "@/auth/utils";
export default {
  components: {
    // Layouts
    // LayoutHorizontal,
    LayoutVertical,
    LayoutFull,

    ScrollToTop,
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
    const { enableScrollToTop } = $themeConfig.layout;

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
      navMenuItems,
      enableScrollToTop,
    };
  },
  data() {
    return {
      user: null,
    };
  },
  created() {
    // this.getStudent();
  },
  methods: {
    getStudent() {
      const isLoggedIn = isUserLoggedIn();
      if (isLoggedIn) {
        this.$root.$on("student_get", (msg) => {
          this.getStudent(msg);
        });
        api.studentGet().then((response) => {
          const respond = response.data;
          if (respond.success == true) {
            const auth = respond.data;
            localStorage.setItem("studentData", JSON.stringify(auth));
            api.setToken(auth.token);
            Vue.prototype.$http.defaults.headers.token = auth.token;
          } else if (respond.error_code == 1) {
            localStorage.removeItem("studentData");
            this.$router.push({ name: "login_student" }).then(() => {
              this.$toast({
                component: ToastificationContent,
                position: "top-right",
                props: {
                  title: `Xayr`,
                  icon: "LogOutIcon",
                  variant: "success",
                  text: `Ko'rishguncha!`,
                },
              });
            });
          } else if (respond.success == false) {
            this.$toast({
              component: ToastificationContent,
              position: "top-right",
              props: {
                title: `Xatolik`,
                icon: "AlertTriangleIcon",
                variant: "danger",
                text: `${respond.message}`,
              },
            });
          } else {
            const respond = response;
            this.$toast({
              component: ToastificationContent,
              position: "top-right",
              props: {
                title: `Xatolik : ${respond.status}`,
                icon: "AlertTriangleIcon",
                variant: "danger",
                text: `${respond.statusText}`,
              },
            });
          }
        });
      }
    },
    setSocketUser() {
      const isLoggedIn = isUserLoggedIn();
      if (isLoggedIn) {
        this.user = api.getUser();
        this.$socket.emit("authorization", {
          user_token: this.user.token,
        });
      }
    },
  },
  mounted() {
    const interval = setInterval(() => {
      if (this.$socket && this.$socket.connected == true) {
        this.setSocketUser();

        clearInterval(interval);
      }
    }, 50);
  }
};
</script>
