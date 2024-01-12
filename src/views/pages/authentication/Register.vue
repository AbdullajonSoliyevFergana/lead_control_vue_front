<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <!-- Brand logo-->
      <b-link to="/" class="brand-logo">
        <vuexy-logo-white v-if="skin == 'light'" />
        <vuexy-logo-black v-else />

        <h2 class="brand-text text-primary ml-1"></h2>
      </b-link>
      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col lg="8" class="d-none d-lg-flex align-items-center p-5">
        <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
          <b-img fluid :src="imgUrl" alt="Register V2" />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Register-->
      <b-col lg="4" class="d-flex align-items-center auth-bg px-2 p-lg-5">
        <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
          <b-card-title class="mb-1">Barchasi shu yerda boshlanadi 🚀</b-card-title>
          <b-card-text class="mb-2"
            >Tizimdan foydalanish uchun ro'yxatdan o'tish</b-card-text
          >

          <!-- form -->
          <validation-observer ref="registerForm" #default="{ invalid }">
            <b-form class="auth-register-form mt-2">
              <!-- fullname -->
              <b-form-group label="Ism va familiya" label-for="register-fullname">
                <validation-provider
                  #default="{ errors }"
                  name="Fullname"
                  vid="fullname"
                  rules="required"
                >
                  <b-form-input
                    id="register-fullname"
                    v-model="student.fullname"
                    name="register-username"
                    :state="errors.length > 0 ? false : null"
                    placeholder="Ism va familiya"
                  />
                  <small class="text-danger">{{
                    errors[0] != null
                      ? "Ism va familiya maydonini to'liq kiritish shart!"
                      : ""
                  }}</small>
                </validation-provider>
              </b-form-group>

              <!-- phone -->
              <b-form-group label="Telefon" label-for="register-phone">
                <validation-provider
                  #default="{ errors }"
                  name="Phone"
                  vid="phone"
                  rules="required"
                >
                  <b-input-group prepend="+998">
                    <b-form-input
                      type="number"
                      id="register-phone"
                      v-model="student.phone"
                      name="register-phone"
                      :state="errors.length > 0 ? false : null"
                      placeholder="994630613"
                      :formatter="formatPhone"
                    />
                  </b-input-group>
                  <small class="text-danger">{{
                    errors[0] != null ? "Telefon maydonini to'liq kiritish shart!" : ""
                  }}</small>
                </validation-provider>
              </b-form-group>

              <!-- Student Birthday -->
              <b-form-group label-for="date" label="Tug'ilgan sana">
                <validation-provider
                  #default="{ errors }"
                  name="Birthday"
                  vid="birth_date"
                  rules="required"
                >
                  <cleave
                    id="date"
                    v-model="student.birth_date"
                    class="form-control"
                    :raw="false"
                    :options="options.date"
                    placeholder="KK-OO-YYYY"
                    :state="errors.length > 0 ? false : null"
                  />
                  <small class="text-danger">{{
                    errors[0] != null
                      ? "Tug'ilgan sana maydonini to'liq kiritish shart!"
                      : ""
                  }}</small>
                </validation-provider>
              </b-form-group>

              <!-- Gender -->
              <b-form-group label="Jins" label-for="gender">
                <div class="demo-inline-spacing">
                  <b-form-radio
                    class="m-0"
                    v-model="student.gender"
                    name="some-radios"
                    value="male"
                  >
                    Erkak
                  </b-form-radio>
                  <b-form-radio
                    class="m-0 ml-1"
                    v-model="student.gender"
                    name="some-radios"
                    value="female"
                  >
                    Ayol
                  </b-form-radio>
                </div>
              </b-form-group>

              <!-- password -->
              <b-form-group label-for="register-password" label="Parol">
                <validation-provider
                  #default="{ errors }"
                  name="Password"
                  vid="register-password"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid' : null"
                  >
                    <b-form-input
                      id="register-password"
                      v-model="student.password"
                      class="form-control-merge"
                      :type="registerPasswordFieldType"
                      :state="errors.length > 0 ? false : null"
                      name="register-password"
                      placeholder="············"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        :icon="registerPasswordToggleIcon"
                        class="cursor-pointer"
                        @click="toggleRegPasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{
                    errors[0] != null ? "Parol maydonini to'liq kiritish shart!" : ""
                  }}</small>
                </validation-provider>
              </b-form-group>

              <!-- confirm-password -->
              <!-- <b-form-group label-for="confirm-password" label="Parolni tasdiqlash">
                <validation-provider
                  #default="{ errors }"
                  name="Confirm Password"
                  vid="confirm-password"
                  rules="required|min:6"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid' : null"
                  >
                    <b-form-input
                      id="confirm-password"
                      v-model="student.confirm_password"
                      class="form-control-merge"
                      :type="confirmPasswordFieldType"
                      :state="errors.length > 0 ? false : null"
                      name="confirm-password"
                      placeholder="············"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        :icon="confirmPasswordToggleIcon"
                        class="cursor-pointer"
                        @click="toggleConfPasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group> -->

              <!-- SMS Code -->
              <b-form-group v-if="check_sms_code" label-for="sms-code" label="SMS kod">
                <validation-provider
                  #default="{ errors }"
                  name="SMS Code"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid' : null"
                  >
                    <b-form-input
                      id="sms-code"
                      v-model="student.sms_code"
                      class="form-control-merge"
                      :state="errors.length > 0 ? false : null"
                      name="sms-code"
                      placeholder="xxxx"
                      :formatter="formatSms"
                    />
                    <!-- <b-input-group-append is-text>
                      <feather-icon
                        :icon="passwordToggleIcon"
                        class="cursor-pointer"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append> -->
                  </b-input-group>
                  <small class="text-danger">{{
                    errors[0] != null ? "SMS kod maydonini to'liq kiritish shart!" : ""
                  }}</small>
                </validation-provider>
              </b-form-group>
              <!-- <b-form-group>
                <b-form-checkbox
                  id="register-privacy-policy"
                  v-model="status"
                  name="checkbox-1"
                >
                  I agree to
                  <b-link>privacy policy & terms</b-link>
                </b-form-checkbox>
              </b-form-group> -->

              <b-overlay
                :show="show"
                spinner-variant="primary"
                spinner-type="grow"
                spinner-small
                rounded="sm"
              >
                <b-button
                  v-if="!check_sms_code"
                  @click="sendSms"
                  variant="primary"
                  block
                  type="button"
                >
                  SMS kodni olish
                </b-button>

                <!-- v-if="check_sms_code" -->

                <b-button
                  v-if="check_sms_code"
                  :disabled="!check_sms_code"
                  @click="register"
                  variant="primary"
                  block
                  type="button"
                >
                  Ro'yxatdan o'tish
                </b-button>
                <b-button
                  v-else
                  :disabled="!check_sms_code"
                  variant="primary"
                  block
                  type="button"
                >
                  Ro'yxatdan o'tish
                </b-button>
              </b-overlay>
            </b-form>
          </validation-observer>

          <p class="text-center mt-2">
            <span>Oldin ro'yxatdan o'tganmisiz?</span>
            <b-link :to="{ name: 'login_student' }">
              <span>&nbsp;Tizimga kirish</span>
            </b-link>
          </p>
        </b-col>
      </b-col>
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from "vee-validate";
import formValidation from "@core/comp-functions/forms/form-validation";
import { ref } from "@vue/composition-api";
import VuexyLogoWhite from "@core/layouts/components/LogoWhite.vue";
import VuexyLogoBlack from "@core/layouts/components/LogoBlack.vue";
import {
  BRow,
  BCol,
  BLink,
  BButton,
  BForm,
  BFormCheckbox,
  BFormGroup,
  BFormInput,
  BInputGroup,
  BInputGroupAppend,
  BImg,
  BCardTitle,
  BCardText,
  BFormRadio,
  BFormInvalidFeedback,
  BOverlay,
} from "bootstrap-vue";
import { required, email } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import store from "@/store/index";
import Cleave from "vue-cleave-component";

import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import api from "@/api/api";
import Vue from "vue";
import useAppConfig from "@core/app-config/useAppConfig";

export default {
  components: {
    VuexyLogoWhite,
    VuexyLogoBlack,
    BRow,
    BImg,
    BCol,
    BLink,
    BButton,
    BForm,
    BCardText,
    BCardTitle,
    BFormCheckbox,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    // validations
    ValidationProvider,
    ValidationObserver,
    BFormRadio,
    Cleave,
    BFormInvalidFeedback,
    BOverlay,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      student: {
        fullname: null,
        phone: null,
        password: null,
        confirm_password: null,
        sms_code: null,
        gender: "male",
        birth_date: null,
      },
      options: {
        date: {
          date: true,
          delimiter: "-",
          datePattern: ["d", "m", "Y"],
        },
      },
      status: "",
      username: "",
      userEmail: "",
      password: "",
      phone_prefix: "998",
      check_sms_code: false,
      sideImg: require("@/assets/images/pages/register-v2.svg"),
      // validation
      required,
      email,
      show: false,
    };
  },
  setup(props, { emit }) {
    const student = {
      fullname: "",
      phone: "",
      password: "",
      avatar: null,
    };

    const studentData = ref(JSON.parse(JSON.stringify(student)));
    const resetstudentData = () => {
      studentData.value = JSON.parse(JSON.stringify(student));
    };

    const { refFormObserver, getValidationState, resetForm } = formValidation(
      resetstudentData
    );

    return {
      refFormObserver,
      getValidationState,
      resetForm,
    };
  },
  computed: {
    registerPasswordToggleIcon() {
      return this.registerPasswordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
    confirmPasswordToggleIcon() {
      return this.confirmPasswordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === "dark") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require("@/assets/images/pages/register-v2-dark.svg");
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
    sendSms() {
      this.$refs.registerForm.validate().then((success) => {
        if (success) {
          this.show = true;
          api.sendSms(this.phone_prefix + this.student.phone).then((response) => {
            const respond = response.data;
            this.show = false;

            if (respond.success == true) {
              this.check_sms_code = true;
              this.$toast({
                component: ToastificationContent,
                position: "top-right",
                props: {
                  title: `SMS yuborildi!`,
                  icon: "AlertTriangleIcon",
                  variant: "success",
                  text: `${respond.message}`,
                },
              });
            } else if (response.error_code == 1) {
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
      });
    },
    register() {
      this.$refs.registerForm.validate().then((success) => {
        if (success) {
          this.show = true;
          api
            .studentRegister({
              fullname: this.student.fullname,
              phone: this.phone_prefix + this.student.phone,
              password: this.student.password,
              sms_code: this.student.sms_code,
              gender: this.student.gender,
              birth_date: this.student.birth_date,
            })
            .then((response) => {
              const respond = response.data;
              this.show = false;

              if (respond.success == true) {
                const auth = respond.data;
                localStorage.setItem("studentData", JSON.stringify(auth));
                api.setToken(auth.token);
                Vue.prototype.$http.defaults.headers.token = auth.token;
                this.$router.push({ name: "student" }).then(() => {
                  this.$toast({
                    component: ToastificationContent,
                    position: "top-right",
                    props: {
                      title: `Assalomu alaykum, ${auth.fullname}`,
                      icon: "CoffeeIcon",
                      variant: "success",
                      text: `${respond.message}`,
                    },
                  });
                });
              } else if (respond.error_code == 2) {
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
                this.check_sms_code = false;
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
      });
    },
    formatPhone(e) {
      return String(e).substring(0, 9);
    },
    formatSms(e) {
      return String(e).substring(0, 4);
    },
  },
};
/* eslint-disable global-require */
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>
