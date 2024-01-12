<template>
  <div>
    <b-row class="match-height">
      <b-col cols="12">
        <b-modal no-close-on-backdrop id="modal-form" ref="modal-form" centered hide-footer size="sm" title="Set comment">
          <b-overlay :show="loader_item" rounded="sm" spinner-small spinner-type="grow" spinner-variant="primary">
            <b-card-text>
              <div>
                <validation-observer ref="simpleRules">
                  <b-form>
                    <b-row>
                      <b-col md="12">
                        <label for="textarea-default">Comment</label>
                        <b-form-textarea id="textarea-default" rows="3" v-model="comment" />
                      </b-col>
                      <b-col cols="12">
                        <div class="d-flex align-items-center justify-content-end my-1">
                          <b-button type="submit" variant="primary"
                            @click.prevent="changeItem(get_item, get_item.status, 'comment')">
                            Save
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
    <div class="col-md-12">
      <div class="row">
        <div class="col-md-3">
          <b-card no-body class="text-center bg-primary bg-lighten-2">
            <h5 class="m-1 text-white">New lead</h5>
          </b-card>
          <b-overlay :show="loader" rounded="sm" spinner-small spinner-type="grow" spinner-variant="primary">
            <div v-if="!loader">
              <div v-if="new_lead.length == 0" class="text-center">
                <span class="text-warning">Empty list!</span>
              </div>
              <div v-else>
                <div v-for="item in new_lead" :key="item.id">

                  <b-card no-body class="text-center mb-1 p-1">
                    <span>+{{ item.phone }}</span>
                    <span>{{ item.comment }}</span>
                    <b-button @click="changeItem(item, 'my')" v-ripple.400="'rgba(255, 255, 255, 0.15)'" class=""
                      size="sm" block variant="primary">
                      To my list
                    </b-button>
                  </b-card>

                </div>
              </div>
            </div>
          </b-overlay>

        </div>
        <div class="col-md-2">
          <b-card no-body class="text-center bg-primary bg-lighten-2">
            <h5 class="m-1 text-white">My list</h5>
          </b-card>
          <b-overlay :show="loader" rounded="sm" spinner-small spinner-type="grow" spinner-variant="primary">
            <div v-if="!loader">
              <div v-if="my_lead.length == 0" class="text-center">
                <span class="text-warning">Empty list!</span>
              </div>
              <div v-else>
                <div v-for="item in my_lead" :key="item.id">

                  <b-card no-body class="text-center mb-1 p-1">
                    <span>+{{ item.phone }}</span>
                    <span>{{ item.comment }}</span>
                    <b-button @click="callItem(item.phone)" v-ripple.400="'rgba(255, 255, 255, 0.15)'" class="" size="sm"
                      block variant="primary">
                      Call
                    </b-button>
                    <b-button @click="getItem(item.id)" v-ripple.400="'rgba(255, 255, 255, 0.15)'" class="" size="sm"
                      block variant="primary">
                      Comment
                    </b-button>
                    <b-button @click="changeItem(item, 'recall')" v-ripple.400="'rgba(255, 255, 255, 0.15)'" class=""
                      size="sm" block variant="primary">
                      To recall
                    </b-button>
                    <b-button @click="changeItem(item, 'didntpickup')" v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                      class="" size="sm" block variant="primary">
                      To didn't pickup
                    </b-button>
                    <b-button @click="changeItem(item, 'coming')" v-ripple.400="'rgba(255, 255, 255, 0.15)'" class=""
                      size="sm" block variant="primary">
                      To coming
                    </b-button>
                  </b-card>

                </div>
              </div>
            </div>
          </b-overlay>
        </div>
        <div class="col-md-2">
          <b-card no-body class="text-center bg-primary bg-lighten-2">
            <h5 class="m-1 text-white">Recall</h5>
          </b-card>
          <b-overlay :show="loader" rounded="sm" spinner-small spinner-type="grow" spinner-variant="primary">
            <div v-if="!loader">
              <div v-if="recall_lead.length == 0" class="text-center">
                <span class="text-warning">Empty list!</span>
              </div>
              <div v-else>
                <div v-for="item in recall_lead" :key="item.id">

                  <b-card no-body class="text-center mb-1 p-1">
                    <span>+{{ item.phone }}</span>
                    <span>{{ item.comment }}</span>
                    <b-button @click="getItem(item.id)" v-ripple.400="'rgba(255, 255, 255, 0.15)'" class="" size="sm"
                      block variant="primary">
                      Comment
                    </b-button>
                    <b-button @click="changeItem(item, 'didntpickup')" v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                      class="" size="sm" block variant="primary">
                      To didn't pickup
                    </b-button>
                    <b-button @click="changeItem(item, 'coming')" v-ripple.400="'rgba(255, 255, 255, 0.15)'" class=""
                      size="sm" block variant="primary">
                      To coming
                    </b-button>
                  </b-card>

                </div>
              </div>
            </div>
          </b-overlay>
        </div>
        <div class="col-md-2">
          <b-card no-body class="text-center bg-primary bg-lighten-2">
            <h5 class="m-1 text-white">Didn't pickup</h5>
          </b-card>
          <b-overlay :show="loader" rounded="sm" spinner-small spinner-type="grow" spinner-variant="primary">
            <div v-if="!loader">
              <div v-if="didntpickup_lead.length == 0" class="text-center">
                <span class="text-warning">Empty list!</span>
              </div>
              <div v-else>
                <div v-for="item in didntpickup_lead" :key="item.id">

                  <b-card no-body class="text-center mb-1 p-1">
                    <span>+{{ item.phone }}</span>
                    <span>{{ item.comment }}</span>
                    <b-button @click="changeItem(item, 'coming')" v-ripple.400="'rgba(255, 255, 255, 0.15)'" class=""
                      size="sm" block variant="primary">
                      To coming
                    </b-button>
                  </b-card>

                </div>
              </div>
            </div>
          </b-overlay>
        </div>
        <div class="col-md-3">
          <b-card no-body class="text-center bg-primary bg-lighten-2">
            <h5 class="m-1 text-white">Coming</h5>
          </b-card>
          <b-overlay :show="loader" rounded="sm" spinner-small spinner-type="grow" spinner-variant="primary">
            <div v-if="!loader">
              <div v-if="coming_lead.length == 0" class="text-center">
                <span class="text-warning">Empty list!</span>
              </div>
              <div v-else>
                <div v-for="item in coming_lead" :key="item.id">

                  <b-card no-body class="text-center mb-1 p-1">
                    <span>+{{ item.phone }}</span>
                    <span>{{ item.comment }}</span>
                    <b-button @click="changeItem(item, 'done')" v-ripple.400="'rgba(255, 255, 255, 0.15)'" class=""
                      size="sm" block variant="success">
                      Done
                    </b-button>
                  </b-card>

                </div>
              </div>
            </div>
          </b-overlay>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import {
  BListGroupItem, BAvatar, BRow, BCol, BCardText,
  BCard, BButton,
  BOverlay,
  BFormTextarea,
  BForm,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import api from '@/api/api'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'

export default {
  components: {
    BCardCode,
    BAvatar,
    BListGroupItem,
    BCardText,
    BRow,
    BCol,
    BCard,
    BButton,
    BOverlay,
    BFormTextarea,
    ValidationObserver,
    ValidationProvider,
    BForm,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      new_lead: [],
      my_lead: [],
      recall_lead: [],
      didntpickup_lead: [],
      coming_lead: [],
      comment: null,
      loader: false,
      loader_item: false,
      get_item: null,
    }
  },
  methods: {
    getList() {
      this.loader = true
      api.getLeads()
        .then((response) => {
          this.loader = false
          const respond = response.data
          if (respond.success == true) {
            let full_data = respond.data
            this.new_lead = full_data.new_lead
            this.my_lead = full_data.my_lead
            this.recall_lead = full_data.recall_lead
            this.didntpickup_lead = full_data.didntpickup_lead
            this.coming_lead = full_data.coming_lead
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
    changeItem(item, to_status, event) {
      if (event == "comment") {
        this.$refs['modal-form'].hide();
      }else{
        this.comment = item.comment
      }
      let body = {
        lead_id: item.id,
        to_status: to_status,
        comment: this.comment,
      }
      api.changeLead(body)
        .then((response) => {
          const respond = response.data
          if (respond.success == true) {
            this.comment = null
            this.getList()
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
    callItem(phone) {
      window.open(`tel:+${phone}`)
    },
    getItem(id) {
      this.$refs['modal-form'].show()

      this.loader_item = true
      api.getLead(id)
        .then((response) => {
          this.loader_item = false
          const respond = response.data
          if (respond.success == true) {
            this.get_item = respond.data
            this.comment = this.get_item.comment
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
  },
  mounted() {
    this.$socket.on('update', (data) => {
      this.getList()
    });
  },
  created() {
    this.getList()
  }
}
</script>
