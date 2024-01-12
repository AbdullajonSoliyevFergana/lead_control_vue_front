<template>
  <b-sidebar
    id="search-d-overflow-sidebar"
    :visible="isSearchDOverflowSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    no-header
    right
    @change="(val) => $emit('update:is-search-d-overflow-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <b-row class="match-height">
        <b-col cols="12">
          <b-modal
            id="modal-form"
            ref="modal-form"
            centered
            hide-footer
            size="lg"
            title="Savol berish"
          >
            <b-overlay
              :show="pro_show"
              rounded="sm"
              spinner-small
              spinner-type="grow"
              spinner-variant="primary"
            >
              <b-card-text>
                <div>
                  <validation-observer ref="refFormObserver" #default="{ handleSubmit }">
                    <b-form @submit.prevent="handleSubmit(addTicket)">
                      <b-row>
                        <b-col md="6">
                          <validation-provider
                            #default="validationContext"
                            name="Select Course"
                            rules="required"
                          >
                            <b-form-group
                              :state="getValidationState(validationContext)"
                              label="Kurs"
                              label-for="course"
                            >
                              <v-select
                                v-model="form_ticket.course_id"
                                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                                :options="my_courses"
                                :reduce="(val) => val.id"
                                :clearable="false"
                                input-id="my_courses"
                              />
                              <b-form-invalid-feedback
                                :state="getValidationState(validationContext)"
                              >
                                {{ validationContext.errors[0] }}
                              </b-form-invalid-feedback>
                            </b-form-group>
                          </validation-provider>
                        </b-col>
                        <b-col md="6">
                          <validation-provider
                            #default="validationContext"
                            name="Proritet"
                          >
                            <b-form-group
                              :state="getValidationState(validationContext)"
                              label="Daraja"
                              label-for="status"
                            >
                              <v-select
                                v-model="form_ticket.status"
                                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                                :options="statuses"
                                :reduce="(val) => val.index"
                                :clearable="false"
                                input-id="statuses"
                              />
                              <b-form-invalid-feedback
                                :state="getValidationState(validationContext)"
                              >
                                {{ validationContext.errors[0] }}
                              </b-form-invalid-feedback>
                            </b-form-group>
                          </validation-provider>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col md="6">
                          <validation-provider
                            #default="validationContext"
                            name="Ticket Title"
                            rules="required"
                          >
                            <b-form-group
                              :state="getValidationState(validationContext)"
                              label="Savol uchun sarlavha"
                              label-for="title"
                            >
                              <b-form-input
                                v-model="form_ticket.title"
                                :state="getValidationState(validationContext)"
                              />
                              <b-form-invalid-feedback
                                :state="getValidationState(validationContext)"
                              >
                                {{
                                  validationContext.errors[0] != null
                                    ? "Savol uchun sarlavha maydonini to'liq kiritish shart!"
                                    : ""
                                }}
                              </b-form-invalid-feedback>
                            </b-form-group>
                          </validation-provider>
                        </b-col>
                        <b-col md="6">
                          <validation-provider
                            #default="validationContext"
                            name="Ticket File"
                            rules="required"
                          >
                            <b-form-group
                              :state="getValidationState(validationContext)"
                              label="Fayl maksimal hajmi: 20MB"
                              label-for="file"
                            >
                              <b-form-file
                                v-model="form_ticket.file"
                                :state="getValidationState(validationContext)"
                                drop-placeholder="Drop file here..."
                                placeholder="Choose a file or drop it here..."
                              />
                              <b-form-invalid-feedback
                                :state="getValidationState(validationContext)"
                              >
                                {{
                                  validationContext.errors[0] != null
                                    ? "Fayl yuklanishi shart!"
                                    : ""
                                }}
                              </b-form-invalid-feedback>
                            </b-form-group>
                          </validation-provider>
                        </b-col>
                        <b-col md="12">
                          <validation-provider
                            #default="validationContext"
                            name="Message"
                            rules="required"
                          >
                            <b-form-group
                              :state="getValidationState(validationContext)"
                              label="Savolning to'liq izohi"
                              label-for="message"
                            >
                              <b-form-textarea
                                id="textarea-state"
                                v-model="form_ticket.message"
                                placeholder="Savolning to'liq izohi..."
                                rows="2"
                              />
                              <b-form-invalid-feedback
                                :state="getValidationState(validationContext)"
                              >
                                {{
                                  validationContext.errors[0] != null
                                    ? "Savolning to'liq izohi maydonini to'liq kiritish shart!"
                                    : ""
                                }}
                              </b-form-invalid-feedback>
                            </b-form-group>
                          </validation-provider>
                        </b-col>
                        <b-col cols="12">
                          <div class="d-flex align-items-center justify-content-end my-1">
                            <b-button type="submit" variant="primary">
                              <!-- @click.prevent="addTicket" -->
                              Yuborish
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

          <template #code>
            {{ codeSize }}
          </template>
        </b-col>
      </b-row>
      <!-- detail -->
      <b-sidebar
        id="d-overflow-sidebar"
        :visible="isDOverflowSidebarActive"
        bg-variant="white"
        sidebar-class="sidebar-lg"
        shadow
        backdrop
        no-header
        right
        @change="(val) => $emit('update:is-d-overflow-sidebar-active', val)"
      >
        <template #default="{ hide }">
          <!-- Header -->
          <div
            class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1"
          >
            <feather-icon
              class="cursor-pointer"
              icon="ChevronLeftIcon"
              size="18"
              @click="isDOverflowSidebarActive = false"
            />
            <h5 class="mb-0">Savol-javob</h5>

            <feather-icon
              class="ml-1 cursor-pointer"
              icon="XIcon"
              size="18"
              @click="isDOverflowSidebarActive = false"
            />
          </div>

          <!-- BODY -->
          <b-overlay
            :show="show_detail"
            spinner-variant="primary"
            spinner-type="grow"
            spinner-small
            rounded="sm"
          >
            <div>
              <b-media v-if="d_overflow != null" class="m-1">
                <b-media-aside class="mt-1">
                  <b-avatar
                    class="avatar mb-1 mr-1"
                    size="40"
                    variant="primary"
                    :src="url(d_overflow.teacher_avatar)"
                  />
                  <div class="user-action m-1">
                    <a class="email-favorite">
                      <feather-icon
                        icon="ThumbsUpIcon"
                        size="18"
                        class="text-warning"
                        @click="ratingDOverflow(d_overflow.id, 1)"
                        :class="ratingStudent(d_overflow.rating_student, 1)"
                      />
                    </a>
                  </div>
                  <p class="mt-1">
                    {{ d_overflow.ratings_good }}
                    <span class="ml-1">|</span>
                  </p>
                  <div class="user-action m-1">
                    <a class="email-favorite">
                      <feather-icon
                        icon="ThumbsDownIcon"
                        size="18"
                        class="text-warning"
                        @click="ratingDOverflow(d_overflow.id, 0)"
                        :class="ratingStudent(d_overflow.rating_student, 0)"
                      />
                    </a>
                  </div>
                  <p class="mt-1">
                    {{ d_overflow.ratings_bad }}
                  </p>
                </b-media-aside>

                <b-media-body>
                  <div class="mail-details" style="width: 400px">
                    <div class="mail-items">
                      <h5 class="mb-1">
                        {{ d_overflow.title }}
                      </h5>
                      <p v-html="d_overflow.answer" style="width: 400px"></p>
                    </div>
                  </div>
                </b-media-body>
                <div
                  v-for="tag in d_overflow.tags"
                  :key="tag.index"
                  style="margin-top: 10px; margin-right: 10px; display: inline-block"
                >
                  <mark
                    style="
                      background-color: SlateBlue;
                      color: white;
                      border-radius: 5px;
                      padding: 4px;
                    "
                    >{{ tag }}</mark
                  >
                </div>
              </b-media>
            </div>
          </b-overlay>
        </template>
      </b-sidebar>
      <!-- detail -->
      <!-- Header -->
      <div
        class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1"
      >
        <h5 class="mb-0">Savollar bazasidan qidirish</h5>

        <feather-icon class="ml-1 cursor-pointer" icon="XIcon" size="18" @click="hide" />
      </div>

      <!-- BODY -->
      <b-overlay
        :show="show"
        spinner-variant="primary"
        spinner-type="grow"
        spinner-small
        rounded="sm"
      >
        <div>
          <div class="d-flex align-items-center justify-content-end head_search">
            <b-form-input
              v-model="search"
              v-on:keyup="searchDOverflows"
              class="d-inline-block"
              placeholder="Qidirish..."
            />
          </div>
          <hr />
          <div v-if="d_overflows.length > 0">
            <b-media v-for="d_overflow in d_overflows" :key="d_overflow.id" class="m-1">
              <a @click="viewDOverflow(d_overflow.id)">
                <b-media-aside class="mt-1">
                  <b-avatar
                    class="avatar mb-1 mr-1"
                    size="40"
                    variant="primary"
                    :src="url(d_overflow.teacher_avatar)"
                  />
                  <div class="user-action m-1">
                    <a class="email-favorite">
                      <feather-icon
                        icon="ThumbsUpIcon"
                        size="18"
                        class="text-warning"
                        :class="ratingStudent(d_overflow.rating_student, 1)"
                      />
                    </a>
                  </div>
                  <p class="mt-1">
                    {{ d_overflow.ratings_good }}
                    <span class="ml-1">|</span>
                  </p>
                  <div class="user-action m-1">
                    <a class="email-favorite">
                      <feather-icon
                        icon="ThumbsDownIcon"
                        size="18"
                        class="text-warning"
                        :class="ratingStudent(d_overflow.rating_student, 0)"
                      />
                    </a>
                  </div>
                  <p class="mt-1">
                    {{ d_overflow.ratings_bad }}
                  </p>
                </b-media-aside>

                <b-media-body>
                  <div class="mail-details">
                    <div class="mail-items">
                      <h5 class="mb-1">
                        {{ d_overflow.title }}
                      </h5>
                      <span class="text-truncate" v-html="d_overflow.answer" />
                    </div>
                  </div>
                </b-media-body>
              </a>
              <!-- <div> -->
              <div
                v-for="tag in d_overflow.tags"
                :key="tag.index"
                style="margin-top: 10px; margin-right: 10px; display: inline-block"
              >
                <mark
                  style="
                    background-color: SlateBlue;
                    color: white;
                    border-radius: 5px;
                    padding: 4px;
                  "
                  >{{ tag }}</mark
                >
              </div>
              <!-- </div> -->
              <hr />
            </b-media>
          </div>
          <div v-else>
            <h4 class="text-warning ml-5 mt-1">
              <span class="ml-2">Savol-javob mavjud emas!</span>
            </h4>
            <div class="d-flex justify-content-center">
              <b-button
                variant="primary"
                class="sidebar-toggle center-chat-text"
                type="submit"
                @click.prevent="createTicket"
              >
                Savol berish
              </b-button>
            </div>
          </div>
        </div>
      </b-overlay>
    </template>
  </b-sidebar>
</template>

<script>
import {
  BSidebar,
  BForm,
  BFormGroup,
  BFormInput,
  BFormInvalidFeedback,
  BButton,
  BFormFile,
  BCardText,
  BOverlay,
  BFormTextarea,
  BMedia,
  BMediaAside,
  BMediaBody,
  BAvatar,
  BFormCheckbox,
  BRow,
  BCol,
} from "bootstrap-vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { ref } from "@vue/composition-api";
import { required, alphaNum, email } from "@validations";
import formValidation from "@core/comp-functions/forms/form-validation";
import BCardCode from "@core/components/b-card-code";
// import { codeBasic } from "./code";
import Ripple from "vue-ripple-directive";
import vSelect from "vue-select";
import store from "@/store";
import api from "../../../../api/api";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import DOverflowDetail from "./DOverflowDetail.vue";

export default {
  components: {
    BSidebar,
    BForm,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BButton,
    vSelect,
    BCardCode,
    BCardText,
    BFormFile,

    // Form Validation
    ValidationProvider,
    ValidationObserver,
    BOverlay,
    BFormTextarea,
    VuePerfectScrollbar,
    BMedia,
    BMediaAside,
    BMediaBody,
    BAvatar,
    BFormCheckbox,
    DOverflowDetail,
    BRow,
    BCol,
  },
  directives: {
    Ripple,
  },
  model: {
    prop: "isSearchDOverflowSidebarActive",
    event: "update:is-search-d-overflow-sidebar-active",
  },
  props: {
    isSearchDOverflowSidebarActive: {
      type: Boolean,
      required: true,
    },
    isDOverflowSidebarActive: false,
  },
  data() {
    return {
      required,
      alphaNum,
      d_overflows: [],
      d_overflow: null,
      search: "",
      show: false,
      show_detail: false,
      course_id: null,
      pro_show: false,
      my_courses: [],
      form_ticket: {
        course_id: null,
        title: "",
        status: "simple",
        message: "",
        file: null,
      },
      statuses: [
        { index: "simple", label: "🟣 Oddiy" },
        { index: "medium", label: "🟡 O'rtacha" },
        { index: "high", label: "🔴 Yuqori" },
      ],
      user: null,
    };
  },
  setup(props, { emit }) {
    const blankTicketData = {
      course_id: null,
      title: "",
      status: "simple",
      message: "",
      file: null,
    };

    const ticketData = ref(JSON.parse(JSON.stringify(blankTicketData)));
    const resetTicketData = () => {
      ticketData.value = JSON.parse(JSON.stringify(blankTicketData));
    };

    const { refFormObserver, getValidationState, resetForm } = formValidation(
      resetTicketData
    );

    const refData = () => {
      emit("refetch-data");
      emit("update:is-search-d-overflow-sidebar-active", false);
    };
    return {
      ticketData,
      refFormObserver,
      getValidationState,
      resetForm,
      refData,
      // Sidebar
    };
  },
  created() {
    // this.dOverflow();
    this.searchDOverflows();
    this.getCourses();
  },
  methods: {
    searchDOverflows() {
      const courseId = JSON.parse(localStorage.getItem("courseId"));
      this.course_id = courseId;
      this.show = true;
      if (this.search == "") {
        api.getRatingDOverflows(this.course_id).then((response) => {
          const respond = response.data;
          this.show = false;
          if (respond.success == true) {
            this.d_overflows = respond.data;
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
      } else {
        api.searchDOverflows(this.course_id, this.search).then((response) => {
          const respond = response.data;
          this.show = false;
          if (respond.success == true) {
            this.d_overflows = respond.data;
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
    dOverflow() {
      this.$root.$on("dOverflow", (msg) => {
        this.searchDOverflows();
      });
    },
    viewDOverflow(dOverflowId) {
      this.isDOverflowSidebarActive = true;
      this.show_detail = true;
      api.getDOverflow(dOverflowId).then((response) => {
        const respond = response.data;
        this.show_detail = false;
        if (respond.success == true) {
          this.d_overflow = respond.data;
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
    },
    ratingDOverflow(dOverflowId, rating) {
      this.isDOverflowSidebarActive = true;
      this.show_detail = true;
      api.ratingDOverflow(dOverflowId, rating).then((response) => {
        const respond = response.data;
        this.show_detail = false;
        if (respond.success == true) {
          this.viewDOverflow(dOverflowId);
          this.searchDOverflows();
          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: "Muvaffaqiyatli",
              icon: "KeyIcon",
              variant: "success",
              text: `${respond.message}`,
            },
          });
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
    },
    ratingStudent(rating_student, rating) {
      if (rating_student != null) {
        if (rating_student.rating == rating) {
          return "fill-current";
        } else {
          return "";
        }
      } else {
        return "";
      }
    },
    getCourses() {
      api.getMyCourseList().then((response) => {
        const respond = response.data;
        if (respond.success == true) {
          this.user = api.getUser();
          const myCourses = respond.data;
          this.my_courses = myCourses.filter((my_course) => my_course.active == true);
          if (this.my_courses.length > 0) {
            const first_course = this.my_courses[0];
            this.form_ticket.course_id = first_course.id;
          }
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
    },
    createTicket() {
      if (this.my_courses.length > 0) {
        this.$refs["modal-form"].show();
      }
    },
    addTicket() {
      this.pro_show = true;
      api.ticketCreate(this.form_ticket).then((response) => {
        const respond = response.data;
        this.pro_show = false;
        if (respond.success == true) {
          const ticket_data = respond.data;

          const ticketData = {
            user_token: this.user.token,
            ticket_name: ticket_data.title,
            message: ticket_data.latest_message,
            avatar: this.user.avatar,
            ticket_id: ticket_data.id,
            course_id: ticket_data.course_id,
            teacher_id: ticket_data.teacher_id,
            student_id: this.user.id,
            time: this.$moment().format("YYYY-MM-DD HH:mm:ss"),
            role: "student",
          };

          api.saveMessageBotToTeacher(ticketData, "ticket");
          this.$socket.emit("send_message", ticketData);

          this.$refs["modal-form"].hide();
          this.$router.push({ name: "tickets" }).then(() => {
            this.$toast({
              component: ToastificationContent,
              position: "top-right",
              props: {
                title: "Muvaffaqiyatli",
                icon: "MessageSquareIcon",
                variant: "success",
                text: `${respond.message}`,
              },
            });
          });
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
    },
    url(image) {
      if (image == null) {
        image =
          "https://yourlawnwise.com/wp-content/uploads/2017/08/photo-placeholder.png";
      } else {
        image = api.imageUrl(image);
      }

      return image;
    },
  },
};
</script>

<style lang="scss">
@import "~@core/scss/vue/libs/vue-select.scss";
@import "~@core/scss/base/pages/app-email.scss";

#search-d-overflow-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
    width: 900px !important;
  }
}

#d-overflow-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
    width: 900px !important;
  }
}

.head_search {
  // margin-top: 12px;
  margin-left: 20px;
}
</style>
