<template>
  <b-sidebar
    id="d-overflow-sidebar"
    style="width:200px"
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
          @click="hide"
        />
        <h5 class="mb-0">Savol-javob</h5>

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
                      :class="ratingStudent(d_overflow.rating_student, 1)"
                    />
                  </a>
                </div>
                <p class="mt-1">
                  {{ d_overflow.stars_count }}
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
                  {{ d_overflow.stars_count }}
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
              <hr />
            </b-media>
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
  },
  directives: {
    Ripple,
  },
  model: {
    prop: "isDOverflowSidebarActive",
    event: "update:is-d-overflow-sidebar-active",
  },
  props: {
    isDOverflowSidebarActive: {
      type: Boolean,
      required: true,
    },
    dOverflowId: 0,
  },
  data() {
    return {
      show: false,
      d_overflow: null,
    };
  },
  setup(props, { emit }) {
    const evaluation = {
      ball: null,
      comment: null,
    };

    const evaluationData = ref(JSON.parse(JSON.stringify(evaluation)));
    const resetevaluationData = () => {
      evaluationData.value = JSON.parse(JSON.stringify(evaluation));
    };

    const refData = () => {
      emit("refetch-data");
      emit("update:is-d-overflow-sidebar-active", false);
    };

    const { refFormObserver, getValidationState, resetForm } = formValidation(
      resetevaluationData
    );

    const perfectScrollbarSettings = {
      maxScrollbarLength: 150,
    };
    return {
      refData,

      refFormObserver,
      getValidationState,
      resetForm,
      perfectScrollbarSettings,
    };
  },
  created() {
    this.dOverflow();
  },
  methods: {
    getDOverflow(dOverflowId) {
      if (dOverflowId == 0) {
        return false;
      }
      this.show = true;
      api.getDOverflow(dOverflowId).then((response) => {
        const respond = response.data;
        this.show = false;
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
    dOverflow() {
      this.$root.$on("dOverflow", (msg) => {
        this.getDOverflow(this.dOverflowId);
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

#d-overflow-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
    width: 400px !important;
  }
}
</style>
