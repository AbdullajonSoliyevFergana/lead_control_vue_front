<template>
  <div>
    <b-row class="match-height">
      <b-col cols="12">
        <b-modal no-close-on-backdrop id="modal-form" ref="modal-form" centered hide-footer size="lg"
                 :title="form == 'add' ? 'Add operator' : 'Edit operator'"
        >
          <b-overlay :show="pro_show" rounded="sm" spinner-small spinner-type="grow" spinner-variant="primary">
            <b-card-text>
              <div>
                <validation-observer ref="simpleRules">
                  <b-form>
                    <b-row>
                      <b-col md="6">
                        <b-form-group label="Phone" label-for="login">
                          <validation-provider #default="{ errors }" name="Phone" rules="required|length:12">
                            <b-input-group prepend="+">
                              <b-form-input type="number" id="login" v-model="operator.login"
                                            :state="errors.length > 0 ? false : null"
                              />
                            </b-input-group>
                            <small class="text-danger">{{
                                errors[0] != null
                                    ? checkErrorVal('Phone', operator.login, 'req', 12)
                                    : ''
                              }}</small>
                          </validation-provider>
                        </b-form-group>
                      </b-col>
                      <b-col md="6">
                        <b-form-group label="Password" label-for="login">
                          <validation-provider #default="{ errors }" name="Password" :rules="form == 'edit' ? '' : 'required'">
                            <b-input-group>
                              <b-form-input type="text" id="password" v-model="operator.password"
                                            :state="errors.length > 0 ? false : null"
                              />
                            </b-input-group>
                            <small class="text-danger">{{
                                errors[0] != null
                                    ? checkErrorVal('Password')
                                    : ''
                              }}</small>
                          </validation-provider>
                        </b-form-group>
                      </b-col>
                      <!-- update button -->
                      <b-col cols="12">
                        <div class="d-flex align-items-center justify-content-end my-1">
                          <b-button type="submit" variant="primary" @click.prevent="operatorCU">
                            {{ form == 'add' ? 'Add' : 'Update' }}
                          </b-button>
                        </div>
                      </b-col>
                    </b-row>
                  </b-form>
                </validation-observer>
              </div>
            </b-card-text>
          </b-overlay>
        </b-modal>
      </b-col>
    </b-row>

    <b-card class="mb-1 p-1" no-body>
      <b-col cols="12">
        <div class="row">
          <div class="col-md-6">
            <h5 class="m-0" style="padding-top: 10px">Operators</h5>
          </div>
          <div class="col-md-6">
            <div class="d-flex justify-content-end">
              <b-button class="" variant="primary" @click="forms(null, 'add')">
                <span class="text-nowrap">Add operator</span>
              </b-button>
            </div>
          </div>
        </div>
      </b-col>
    </b-card>
    <b-overlay :show="operator_show" rounded="sm" spinner-small spinner-type="grow" spinner-variant="primary">
      <b-card class="mb-0" no-body>
        <div class="m-2">
          <b-row>
            <b-col cols="12">
              <!-- search input -->
              <div class="custom-search">
                <b-form-group>
                  <div class="row">
                    <div class="col-md-3">
                      <b-form-input v-model="operator_search" v-on:keyup="searchOperator('search')"
                                    class="d-inline-block"
                                    placeholder="Search..."
                      />
                    </div>
                  </div>
                </b-form-group>
              </div>

              <!-- app user table -->
              <vue-good-table :columns="columns" :pagination-options="{
                enabled: true,
                perPage: pageLength,
              }" :rows="operator_rows" :rtl="direction"
              >
                <template slot="table-row" slot-scope="props">
                  <!-- Column: ID -->
                  <span v-if="props.column.field === 'ID'" class="text-nowrap">
                    <span class="text-nowrap">{{ props.row.id }}</span>
                  </span>

                  <!-- Column: login -->
                  <span v-else-if="props.column.field === 'login'" class="text-nowrap">
                    <span class="text-nowrap">{{ props.row.login }}</span>
                  </span>

                  <!-- Column: role -->
                  <span v-else-if="props.column.field === 'role'" class="text-nowrap">
                    <span class="text-nowrap">{{ props.row.role }}</span>
                  </span>

                  <!-- Column: date -->
                  <span v-else-if="props.column.field === 'status'" class="text-nowrap">
                    <span class="text-nowrap">{{ props.row.status }}</span>
                  </span>

                  <!-- Column: Action -->
                  <div v-else-if="props.column.field === 'action'">
                    <!--                    <router-link :to="{-->
                    <!--                      name: 'operator_detail',-->
                    <!--                      params: { login: props.row.login },-->
                    <!--                    }">-->
                    <!--                      <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" class="btn-icon mr-1"-->
                    <!--                        variant="outline-primary">-->
                    <!--                        <feather-icon icon="EyeIcon" />-->
                    <!--                      </b-button>-->
                    <!--                    </router-link>-->
                    <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" class="btn-icon mr-1" variant="outline-warning"
                              @click="forms(props.row, 'edit')"
                    >
                      <feather-icon icon="EditIcon"/>
                    </b-button>
                    <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" class="btn-icon mr-1" variant="outline-danger"
                              @click="del_operator(props.row.id)"
                    >
                      <feather-icon icon="Trash2Icon"/>
                    </b-button>
                  </div>

                  <!-- Column: Common -->
                  <span v-else>
                    {{ props.formattedRow[props.column.field] }}
                  </span>
                </template>

                <!-- pagination -->
                <template slot="pagination-bottom" slot-scope="props">
                  <div class="d-flex justify-content-between flex-wrap">
                    <div class="mb-0 mt-1">
                      <span class="text-nowrap">Showing: {{ page }} pages
                        {{
                          total_count > 0
                              ? Math.ceil(total_count / page_limit)
                              : total_count
                        }}
                        from the page</span>
                      <br/>
                      <span class="text-nowrap">Total: {{ total_count }} items</span>
                      <!-- <b-form-select
                        v-model="pageLength"
                        :options="['100', '200', '300']"
                        class="mx-1"
                        @input="
                          (value) =>
                            props.perPageChanged({
                              currentPerPage: value,
                            })
                        "
                      /> -->
                      <!-- <span class="text-nowrap"></span> -->
                    </div>
                    <div class="mt-1 mr-1">
                      <div class="row">
                        <div class="prev_list">
                          <b-button :disabled="page == 1" @click="searchOperator('prev')" variant="gradient-primary"
                                    class="btn-icon rounded-circle"
                          >
                            <feather-icon icon="ChevronLeftIcon"/>
                          </b-button>
                        </div>
                        <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" variant="outline-primary"
                                  class="btn-icon mx-1" disabled
                        >
                          <span>{{ page }}</span>
                        </b-button>
                        <div class="next_list">
                          <b-button :disabled="total_count == 0 ||
                            page == Math.ceil(total_count / page_limit)
                            " @click="searchOperator('next')" variant="gradient-primary"
                                    class="btn-icon rounded-circle"
                          >
                            <feather-icon icon="ChevronRightIcon"/>
                          </b-button>
                        </div>
                      </div>
                    </div>
                    <!-- <div>
                      <b-pagination
                        :per-page="pageLength"
                        :total-rows="props.total"
                        :value="1"
                        align="right"
                        class="mt-1 mb-0"
                        first-number
                        last-number
                        next-class="next-item"
                        prev-class="prev-item"
                        @input="
                          (value) =>
                            props.pageChanged({
                              currentPage: value,
                            })
                        "
                      >
                        <template #prev-text>
                          <feather-icon icon="ChevronLeftIcon" size="18" />
                        </template>
                        <template #next-text>
                          <feather-icon icon="ChevronRightIcon" size="18" />
                        </template>
                      </b-pagination>
                    </div> -->
                  </div>
                </template>
              </vue-good-table>

              <template #code>
                {{ codeBasicTable }}
              </template>
            </b-col>
          </b-row>
        </div>
      </b-card>
    </b-overlay>
  </div>
</template>

<script>
import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import {
  BAlert,
  BAvatar,
  BBadge,
  BButton,
  BCard,
  BCardBody,
  BCardHeader,
  BCardText,
  BCol,
  BDropdown,
  BDropdownItem,
  BForm,
  BFormDatepicker,
  BFormFile,
  BFormGroup,
  BInputGroup,
  BFormInput,
  BFormRadio,
  BFormSelect,
  BImg,
  BLink,
  BMedia,
  BMediaAside,
  BMediaBody,
  BOverlay,
  BPagination,
  BRow,
  BFormInvalidFeedback,
  BFormTags,
  BFormTextarea,
  BFormCheckbox,
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { max, length } from 'vee-validate/dist/rules'

extend('max', max)
import Ripple from 'vue-ripple-directive'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { ref } from '@vue/composition-api'
import vSelect from 'vue-select'
import axios from '@axios'
import store from '@/store/index'
import { codeBasic } from './code'
import { codeConfirm } from './code_confirm'
import { codeState } from './code_date'
import { codeBasicTable } from './code_table'
import api from '@/api/api'
import { quillEditor } from 'vue-quill-editor'
import formValidation from '@core/comp-functions/forms/form-validation'
import { required } from '@validations'
import VueContext from 'vue-context'
import flatPickr from 'vue-flatpickr-component'

export default {
  components: {
    BRow,
    BCol,
    BCardCode,
    VueGoodTable,
    BAvatar,
    BBadge,
    BPagination,
    BFormSelect,
    BDropdown,
    BOverlay,
    BDropdownItem,
    BFormGroup,
    BInputGroup,
    BFormInput,
    BButton,
    BCardHeader,
    BImg,
    BCardText,
    BForm,
    BFormFile,
    BAlert,
    BLink,
    BCard,
    BMedia,
    BMediaBody,
    BMediaAside,
    ValidationObserver,
    ValidationProvider,
    BFormRadio,
    BFormDatepicker,
    vSelect,
    BCardBody,
    quillEditor,
    BFormInvalidFeedback,
    BFormTags,
    VueContext,
    flatPickr,
    BFormTextarea,
    BFormCheckbox,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      required,
      pageLength: 15,
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      searchTitle: '',
      page: 1,
      total_count: 0,
      page_limit: 0,
      dir: false,
      codeBasic,
      codeConfirm,
      codeState,
      codeBasicTable,
      columns: [
        {
          label: 'ID',
          field: 'id',
        },
        {
          label: 'Login',
          field: 'login',
        },
        {
          label: 'Role',
          field: 'role',
        },
        {
          label: 'Status',
          field: 'status',
        },
        {
          label: 'Action',
          field: 'action',
        },
      ],
      operator_rows: [],
      snowOption: {
        theme: 'snow',
      },
      operator: {
        id: null,
        login: '998',
        password: null,
        role: 'operator',
      },
      operator_show: false,
      pro_show: false,
      operator_search: '',
      form: '',
    }
  },
  computed: {
    direction() {
      if (store.state.appConfig.isRTL) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.dir = true
        return this.dir
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dir = false
      return this.dir
    },
  },
  created() {
    this.searchOperator(null)
  },
  methods: {
    forms(data, type) {
      if (type == 'add') {
        (this.operator.id = null),
            (this.operator.login = "998"),
            (this.operator.password = null),
            (this.operator.role = 'operator'),
            (this.form = 'add')
        this.$refs['modal-form'].show()
      } else {
        this.getOperator(data.id)

        this.form = 'edit'
        this.$refs['modal-form'].show()
      }
    },
    getOperator(id) {
      this.pro_show = true
      api.getOperator(id)
          .then((response) => {
            const respond = response.data
            if (respond.success == true) {
              this.operator = respond.data
              this.operator.password = null
              this.pro_show = false
            } else if (respond.error_code == 1) {
              localStorage.removeItem('adminData')
              this.$router.push({ name: 'login_admin' })
                  .then(() => {
                    this.$toast({
                      component: ToastificationContent,
                      position: 'top-right',
                      props: {
                        title: `Bye`,
                        icon: 'LogOutIcon',
                        variant: 'success',
                        text: `Bye!`,
                      },
                    })
                  })
            } else if (respond.success == false) {
              this.$toast({
                component: ToastificationContent,
                position: 'top-right',
                props: {
                  title: 'Error',
                  icon: 'AlertTriangleIcon',
                  variant: 'danger',
                  text: `${respond.message}`,
                },
              })
            } else {
              const respond = response
              this.$toast({
                component: ToastificationContent,
                position: 'top-right',
                props: {
                  title: `Error : ${respond.status}`,
                  icon: 'AlertTriangleIcon',
                  variant: 'danger',
                  text: `${respond.statusText}`,
                },
              })
            }
          })
    },
    checkErrorVal(text, input_text, check = 'req', length = 0) {
      if (check == 'req') {
        if (input_text != null && input_text !== '') {
          if (length > 0 && input_text.length != length) {
            text = text + ` must be ${length} characters`
          }
        } else {
          text = text + ' area is required'
        }
      }
      return text
    },
    operatorCU() {
      if (this.form == 'add') {
        this.operatorAdd()
      } else {
        this.operatorUpdate()
      }
    },
    operatorAdd() {
      this.$refs.simpleRules.validate()
          .then((success) => {
            if (success) {

              this.pro_show = true
              api.operatorAdd(this.operator)
                  .then((response) => {
                    const respond = response.data
                    this.pro_show = false
                    if (respond.success == true) {
                      this.searchOperator()
                      this.$refs['modal-form'].hide();

                      (this.operator.id = null),
                          (this.operator.login = null),
                          (this.operator.password = null),
                          (this.operator.role = 'operator'),
                          this.$toast({
                            component: ToastificationContent,
                            position: 'top-right',
                            props: {
                              title: 'Success',
                              icon: 'BookmarkIcon',
                              variant: 'success',
                              text: `${respond.message}`,
                            },
                          })
                    } else if (respond.error_code == 1) {
                      localStorage.removeItem('adminData')
                      this.$router.push({ name: 'login_admin' })
                          .then(() => {
                            this.$toast({
                              component: ToastificationContent,
                              position: 'top-right',
                              props: {
                                title: 'Bye Bye',
                                icon: 'LogOutIcon',
                                variant: 'success',
                                text: 'See you later!',
                              },
                            })
                          })
                    } else if (respond.success == false) {
                      this.$toast({
                        component: ToastificationContent,
                        position: 'top-right',
                        props: {
                          title: 'Error',
                          icon: 'AlertTriangleIcon',
                          variant: 'danger',
                          text: `${respond.message}`,
                        },
                      })
                    } else {
                      const respond = response
                      this.$toast({
                        component: ToastificationContent,
                        position: 'top-right',
                        props: {
                          title: `Error : ${respond.status}`,
                          icon: 'AlertTriangleIcon',
                          variant: 'danger',
                          text: `${respond.statusText}`,
                        },
                      })
                    }
                  })
            }
          })
    },
    operatorUpdate() {
      this.$refs.simpleRules.validate()
          .then((success) => {
            if (success) {

              this.pro_show = true
              api.operatorUpdate(this.operator)
                  .then((response) => {
                    const respond = response.data
                    this.pro_show = false
                    if (respond.success == true) {
                      this.searchOperator()
                      this.$refs['modal-form'].hide();

                      (this.operator.id = null),
                          (this.operator.login = null),
                          (this.operator.password = null),
                          (this.operator.role = "operator"),
                          this.$toast({
                            component: ToastificationContent,
                            position: 'top-right',
                            props: {
                              title: 'Success',
                              icon: 'BookmarkIcon',
                              variant: 'success',
                              text: `${respond.message}`,
                            },
                          })
                    } else if (respond.error_code == 1) {
                      localStorage.removeItem('adminData')
                      this.$router.push({ name: 'login_admin' })
                          .then(() => {
                            this.$toast({
                              component: ToastificationContent,
                              position: 'top-right',
                              props: {
                                title: 'Bye Bye',
                                icon: 'LogOutIcon',
                                variant: 'success',
                                text: 'See you later!',
                              },
                            })
                          })
                    } else if (respond.success == false) {
                      this.$toast({
                        component: ToastificationContent,
                        position: 'top-right',
                        props: {
                          title: 'Error',
                          icon: 'AlertTriangleIcon',
                          variant: 'danger',
                          text: `${respond.message}`,
                        },
                      })
                    } else {
                      const respond = response
                      this.$toast({
                        component: ToastificationContent,
                        position: 'top-right',
                        props: {
                          title: `Error : ${respond.status}`,
                          icon: 'AlertTriangleIcon',
                          variant: 'danger',
                          text: `${respond.statusText}`,
                        },
                      })
                    }
                  })
            }
          })
    },
    del_operator(operator_id) {
      this.$swal({
        title: 'Are you sure?',
        // text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      })
          .then((result) => {
            if (result.value) {
              api.deleteOperator(operator_id)
                  .then((response) => {
                    const respond = response.data
                    if (respond.success == true) {
                      this.$toast({
                        component: ToastificationContent,
                        position: 'top-right',
                        props: {
                          title: `Successfully!`,
                          icon: 'BookmarkIcon',
                          variant: 'success',
                          text: `${respond.message}`,
                        },
                      })
                      this.searchOperator()
                    } else if (respond.error_code == 1) {
                      localStorage.removeItem('adminData')
                      this.$router.push({ name: 'login_admin' })
                          .then(() => {
                            this.$toast({
                              component: ToastificationContent,
                              position: 'top-right',
                              props: {
                                title: `Bye Bye`,
                                icon: 'LogOutIcon',
                                variant: 'success',
                                text: `See you later!`,
                              },
                            })
                          })
                    } else if (respond.success == false) {
                      this.$toast({
                        component: ToastificationContent,
                        position: 'top-right',
                        props: {
                          title: `Error`,
                          icon: 'AlertTriangleIcon',
                          variant: 'danger',
                          text: `${respond.message}`,
                        },
                      })
                    } else {
                      const respond = response
                      this.$toast({
                        component: ToastificationContent,
                        position: 'top-right',
                        props: {
                          title: `Error : ${respond.status}`,
                          icon: 'AlertTriangleIcon',
                          variant: 'danger',
                          text: `${respond.statusText}`,
                        },
                      })
                    }
                  })
              this.$swal({
                icon: 'success',
                title: 'Deleted!',
                text: 'Operator deleted.',
                customClass: {
                  confirmButton: 'btn btn-success',
                },
              })
            }
          })
    },
    searchOperator(list = null) {
      let to_filter = true
      if (list == 'search' && this.operator_search.length <= 2) {
        to_filter = false
      }
      if (list == 'search' && this.operator_search.length == 0) {
        to_filter = true
      }

      if (list == 'prev') {
        this.page = this.page != 1 ? this.page - 1 : 1
      } else if (list == 'next') {
        this.page = this.page + 1
      } else if (list == null) {
        this.page = this.page
      } else {
        this.page = 1
      }

      if (to_filter) {
        if (list == 'search' && this.operator_search.length <= 2) {
          this.operator_show = false
        } else {
          this.operator_show = true
        }
        api
            .searchOperators(
                this.operator_search,
                this.page,
            )
            .then((response) => {
              this.operator_show = false
              const respond = response.data
              if (respond.success == true) {
                if (respond.data != null) {
                  this.operator_rows = respond.data.items
                  this.total_count = respond.data.total_count
                  this.page_limit = respond.data.limit
                  this.page = respond.data.page
                  this.operator_show = false
                }
              } else if (respond.error_code == 1) {
                localStorage.removeItem('adminData')
                this.$router.push({ name: 'login_admin' })
                    .then(() => {
                      this.$toast({
                        component: ToastificationContent,
                        position: 'top-right',
                        props: {
                          title: 'Bye Bye',
                          icon: 'LogOutIcon',
                          variant: 'success',
                          text: 'See you later!',
                        },
                      })
                    })
              } else if (respond.success == false) {
                this.$toast({
                  component: ToastificationContent,
                  position: 'top-right',
                  props: {
                    title: 'Error',
                    icon: 'AlertTriangleIcon',
                    variant: 'danger',
                    text: `${respond.message}`,
                  },
                })
              } else {
                const respond = response
                this.$toast({
                  component: ToastificationContent,
                  position: 'top-right',
                  props: {
                    title: `Error : ${respond.status}`,
                    icon: 'AlertTriangleIcon',
                    variant: 'danger',
                    text: `${respond.statusText}`,
                  },
                })
              }
            })
      }
    },
    truncate(text) {
      if (text.length > 20) {
        return text.substring(0, 20) + '...'
      } else {
        return text
      }
    },
  },
}
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
@import "~@core/scss/vue/libs/vue-sweetalert.scss";
@import "~@core/scss/vue/libs/quill.scss";
@import "~@core/scss/vue/libs/vue-good-table.scss";
@import "@core/scss/vue/libs/vue-flatpicker.scss";

.user_avatar_image {
  width: 100px;
  /*height: 100px;*/
  position: relative;
}

.user_avatar_btn_delete {
  position: absolute;
  left: 100%;
  margin-left: -19px;
  margin-top: 2px;
  cursor: pointer;
}
</style>
