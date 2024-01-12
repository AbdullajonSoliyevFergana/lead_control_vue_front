<template>
  <b-row>
    <b-col cols="12">
      <table-operators />
    </b-col>
  </b-row>
</template>

<script>
import { BRow, BCol } from "bootstrap-vue";
import TableOperators from "./TableOperators.vue";

export default {
  components: {
    BRow,
    BCol,

    TableOperators,
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
@import "@core/scss/vue/libs/vue-good-table.scss";
</style>
