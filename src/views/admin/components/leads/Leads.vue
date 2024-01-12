<template>
  <b-row>
    <b-col cols="12">
      <lead-list />
    </b-col>
  </b-row>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'
import LeadList from './LeadList.vue'

export default {
  components: {
    BRow,
    BCol,

    LeadList,
  },
}
</script>
