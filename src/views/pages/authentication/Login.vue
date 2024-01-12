<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <!-- Brand logo-->
      <b-link class="brand-logo">
        <!-- <vuexy-logo-white v-if="skin == 'light'" /> -->
        <vuexy-logo />
        <h2 class="brand-text text-primary ml-1"></h2>
      </b-link>
      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col lg="8" class="d-none d-lg-flex align-items-center p-5">
        <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
          <b-img fluid :src="imgUrl" alt="Login V2" />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Login-->
      <b-col lg="4" class="d-flex align-items-center auth-bg px-2 p-lg-5">
        <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
          <b-card-title title-tag="h2" class="font-weight-bold mb-1">
            Welcome to the admin system! 👋
          </b-card-title>
          <b-card-text class="mb-2">
            Please enter your phone number and password
          </b-card-text>

          <!-- form -->
          <validation-observer ref="loginValidation">
            <b-form class="auth-login-form mt-2" @submit.prevent>
              <!-- login -->
              <b-form-group label="Phone" label-for="login-login">
                <validation-provider
                  #default="{ errors }"
                  name="Phone"
                  rules="required"
                >
                  <b-input-group prepend="+">
                    <b-form-input
                      type="number"
                      id="login"
                      v-model="login"
                      :state="errors.length > 0 ? false : null"
                      name="login"
                      placeholder="998994630613"
                    />
                  </b-input-group>

                  <small class="text-danger">{{
                    errors[0] != null ? "Set the Phone field" : ""
                  }}</small>
                </validation-provider>
              </b-form-group>

              <!-- password -->
              <b-form-group label="Password" label-for="login-password">
                <validation-provider #default="{ errors }" name="Password" rules="required">
                  <b-input-group prepend="**">
                    <b-form-input
                      id="login-password"
                      v-model="password"
                      :state="errors.length > 0 ? false : null"
                      name="login-password"
                      placeholder="12345678"
                    />
                  </b-input-group>

                  <small class="text-danger">{{
                    errors[0] != null ? "A password field is required" : ""
                  }}</small>
                </validation-provider>
              </b-form-group>

              <!-- submit buttons -->
              <b-overlay
                :show="show"
                spinner-variant="primary"
                spinner-type="grow"
                spinner-small
                rounded="sm"
              >
                <b-button type="submit" variant="primary" block @click="validationForm">
                  Login
                </b-button>
              </b-overlay>
            </b-form>
          </validation-observer>
        </b-col>
      </b-col>
      <!-- /Login-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from "vee-validate";
import VuexyLogoWhite from "@core/layouts/components/LogoWhite.vue";
import VuexyLogoBlack from "@core/layouts/components/LogoBlack.vue";
import VuexyLogo from "@core/layouts/components/Logo.vue";
import {
  BRow,
  BCol,
  BLink,
  BFormGroup,
  BFormInput,
  BInputGroupAppend,
  BInputGroup,
  BFormCheckbox,
  BCardText,
  BCardTitle,
  BImg,
  BForm,
  BButton,
  BOverlay,
} from "bootstrap-vue";
import { required, email } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import store from "@/store/index";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import { getHomeRouteForLoggedInUser } from "@/auth/utils";
import Ripple from "vue-ripple-directive";

import api from "@/api/api";
import Vue from "vue";
import useAppConfig from "@core/app-config/useAppConfig";

export default {
  components: {
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BFormCheckbox,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    VuexyLogoWhite,
    VuexyLogoBlack,
    VuexyLogo,
    ValidationProvider,
    ValidationObserver,
    BOverlay,
  },
  mixins: [togglePasswordVisibility],
  directives: {
    Ripple,
  },
  data() {
    return {
      loading: false,
      status: null,
      errors: null,
      login: '998',
      password: null,
      sideImg: require("@/assets/images/pages/login-v2.svg"),
      show: false,
    };
  },
  computed: {
    // passwordToggleIcon() {
    //   return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    // },
    imgUrl() {
      if (store.state.appConfig.layout.skin === "dark") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require("@/assets/images/pages/login-v2-dark.svg");
        return this.sideImg;
      }
      return this.sideImg;
    },
  },
  setup() {
    const { skin } = useAppConfig();
    return {
      // Skin
      skin,
    };
  },
  methods: {
    validationForm() {
      this.$refs.loginValidation.validate().then((success) => {
        if (success) {
          this.show = true;
          api
            .adminLogin({
              login: this.login,
              password: this.password,
            })
            .then((response) => {
              const respond = response.data;
              this.show = false;

              if (respond.success == true) {
                const auth = respond.data;
                Vue.prototype.$http.defaults.headers.Token = auth.token;

                localStorage.setItem("adminData", JSON.stringify(auth));
                api.setToken(auth.token);

                this.$router.push({ name: "admin" }).then(() => {
                  this.$toast({
                    component: ToastificationContent,
                    position: "top-right",
                    props: {
                      title: `You are welcome ${auth.login}`,
                      icon: "CoffeeIcon",
                      variant: "success",
                      text: `Role: ${auth.role}`,
                    },
                  });
                });
              } else if (response.error_code == 1) {
                localStorage.removeItem("adminData");
                this.$router.push({ name: "login_admin" }).then(() => {
                  this.$toast({
                    component: ToastificationContent,
                    position: "top-right",
                    props: {
                      title: `Bye`,
                      icon: "LogOutIcon",
                      variant: "success",
                      text: `Bye!`,
                    },
                  });
                });
              } else if (respond.success == false) {
                this.$toast({
                  component: ToastificationContent,
                  position: "top-right",
                  props: {
                    title: "Хато",
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
                    title: `Хато : ${respond.status}`,
                    icon: "AlertTriangleIcon",
                    variant: "danger",
                    text: `${respond.statusText}`,
                  },
                });
              }
            });
        } else {
          console.log(false);
        }
      });
    },
    formatPhone(e) {
      return String(e).substring(0, 9);
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>
