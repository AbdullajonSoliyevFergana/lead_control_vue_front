<template>
  <b-nav-item @click="change">
    <feather-icon size="21" :icon="`${isDark ? 'Sun' : 'Moon'}Icon`" />
  </b-nav-item>
</template>

<script>
import useAppConfig from "@core/app-config/useAppConfig";
import { computed } from "@vue/composition-api";
import { BNavItem } from "bootstrap-vue";
import store from "@/store";

export default {
  components: {
    BNavItem,
  },
  setup(context, { emit }) {
    const { skin } = useAppConfig();

    const isDark = computed(() => skin.value === "dark");

    return { skin, isDark };
  },
  methods: {
    change(val) {
      let skin = store.state.appConfig.layout.skin;
      if (skin == "dark") {
        store.commit("appConfig/UPDATE_SKIN", "light");
      } else {
        store.commit("appConfig/UPDATE_SKIN", "dark");
      }

      this.$root.$emit("changeColorSliders", "");
    },
  },
};
</script>
