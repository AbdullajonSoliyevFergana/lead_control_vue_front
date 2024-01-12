<template>
  <b-row v-if="$route.meta.pageTitle && list" class="content-header">
    <d-overflow-form
      :is-search-d-overflow-sidebar-active.sync="isSearchDOverflowSidebarActive"
      :isDOverflowSidebarActive.sync="isDOverflowSidebarActive"
    />
    <!-- Content Left -->
    <b-col class="content-header-left mb-2" cols="12" md="9">
      <b-row class="breadcrumbs-top">
        <b-col cols="12">
          <h2 class="content-header-title float-left pr-1 mb-0">
            {{ $route.meta.pageTitle }}
          </h2>
          <div class="breadcrumb-wrapper">
            <b-breadcrumb>
              <b-breadcrumb-item to="/">
                <feather-icon icon="HomeIcon" size="16" class="align-text-top" />
              </b-breadcrumb-item>
              <b-breadcrumb-item
                v-for="item in list"
                :key="item.text"
                :active="item.active"
                :to="item.to"
              >
                {{ item.text }}
              </b-breadcrumb-item>
            </b-breadcrumb>
          </div>
        </b-col>
      </b-row>
    </b-col>

    <!-- Content Right -->
    <b-col
      class="content-header-right text-md-right d-md-block d-none mb-1"
      md="3"
      cols="12"
      v-if="$route.meta.formButton"
    >
      <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        variant="primary"
        class="btn-icon"
        @click="isSearchDOverflowSidebarActive = !isSearchDOverflowSidebarActive"
      >
        <img class="icon" src="/quizzes.png" />
      </b-button>
    </b-col>
  </b-row>
</template>

<script>
import {
  BBreadcrumb,
  BBreadcrumbItem,
  BRow,
  BCol,
  BDropdown,
  BDropdownItem,
  BButton,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import DOverflowForm from "./devapp_overflow/DOverflowForm.vue";
import { ref } from "@vue/composition-api";

export default {
  directives: {
    Ripple,
  },
  components: {
    BBreadcrumb,
    BBreadcrumbItem,
    BRow,
    BCol,
    BDropdown,
    BDropdownItem,
    BButton,
    DOverflowForm,
  },
  data() {
    return {
      open_form: false,
      list: null,
    };
  },
  setup() {
    const isSearchDOverflowSidebarActive = ref(false);
    const isDOverflowSidebarActive = ref(false);

    return {
      // Sidebar
      isSearchDOverflowSidebarActive,
      isDOverflowSidebarActive,
    };
  },
  created() {
    this.getRoutes();
  },
  methods: {
    getRoutes() {
      this.$root.$on("routes", (msg) => {
        this.getRoutes();
      });
      let nav = JSON.parse(localStorage.getItem("navData"));
      if (this.$route.name == "courses") {
        const breadcrumbs = [
          {
            text: "Mening kurslarim",
            active: true,
          },
        ];
        this.list = breadcrumbs;
      } else if (this.$route.name == "welcome") {
        const breadcrumbs = [
          {
            to: { name: "courses" },
            text: "Mening kurslarim",
          },
          {
            text: "Hush kelibsiz!",
            active: true,
          },
        ];
        this.list = breadcrumbs;
      } else if (this.$route.name == "course_api") {
        const breadcrumbs = [
          {
            to: { name: "courses" },
            text: "Mening kurslarim",
          },
          {
            text: "API loyihalar",
            active: true,
          },
        ];
        this.list = breadcrumbs;
      } else if (this.$route.name == "sections") {
        const breadcrumbs = [
          {
            to: { name: "courses" },
            text: "Mening kurslarim",
          },
          {
            text: "Bo'limlar",
            active: true,
          },
        ];
        this.list = breadcrumbs;
      } else if (this.$route.name == "lessons") {
        const breadcrumbs = [
          {
            to: { name: "courses" },
            text: "Mening kurslarim",
          },
          {
            to: { name: "sections", params: { id: nav.course_id } },
            text: "Bo'limlar",
          },
          {
            text: "Darslar",
            active: true,
          },
        ];
        this.list = breadcrumbs;
      } else if (this.$route.name == "parts") {
        const breadcrumbs = [
          {
            to: { name: "courses" },
            text: "Mening kurslarim",
          },
          {
            to: { name: "sections", params: { id: nav.course_id } },
            text: "Bo'limlar",
          },
          {
            to: { name: "lessons", params: { id: nav.section_id } },
            text: "Darslar",
          },
          {
            text: "Qismlar",
            active: true,
          },
        ];
        this.list = breadcrumbs;
      } else if (this.$route.name == "part") {
        const breadcrumbs = [
          {
            to: { name: "courses" },
            text: "Mening kurslarim",
          },
          {
            to: { name: "sections", params: { id: nav.course_id } },
            text: "Bo'limlar",
          },
          {
            to: { name: "lessons", params: { id: nav.section_id } },
            text: "Darslar",
          },
          {
            to: { name: "parts", params: { id: nav.lesson_id } },
            text: "Qismlar",
          },
          {
            text: "Qism",
            active: true,
          },
        ];
        this.list = breadcrumbs;
      } else {
        this.list = null;
      }
    },
  },
};
</script>
<style>
.icon {
  height: 24px;
  width: 24px;
  /* Other styles here */
}
</style>
