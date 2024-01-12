<template>
  <div class="navbar-container d-flex content align-items-center">
    <b-row class="match-height">
      <b-col cols="12">
        <b-modal
          id="modal-form"
          ref="modal-form"
          centered
          hide-footer
          size="lg"
          title="Profil"
        >
          <b-overlay
            :show="pro_show"
            rounded="sm"
            spinner-small
            spinner-type="grow"
            spinner-variant="primary"
          >
            <b-card-text>
              <b-row>
                <!-- <b-card :img-src="require('@/assets/images/banner/logo.png')" img-alt="Profile Cover Photo" img-top -->
                <b-card
                  style="width: 800px; margin-top: 20px"
                  img-alt="Profile Cover Photo"
                  img-top
                  class="card-profile"
                >
                  <div class="profile-image-wrapper">
                    <div class="profile-image p-0" @click="$refs.refInputEl.$el.click()">
                      <b-avatar
                        class="cursor-pointer"
                        size="114"
                        text="A"
                        variant="light-primary"
                        :src="url(user.avatar)"
                      />
                    </div>
                  </div>

                  <b-form-file
                    ref="refInputEl"
                    v-model="profileFile"
                    accept=".jpg, .png, .gif"
                    :hidden="true"
                    plain
                    @input="updateProfile('avatar')"
                  />
                  <h3 class="ml-2" v-if="!edit_name">
                    {{ user.fullname }}
                    <span>
                      <feather-icon
                        icon="Edit3Icon"
                        class="cursor-pointer text-success"
                        size="21"
                        @click="editName"
                      />
                    </span>
                  </h3>
                  <div v-else class="d-flex justify-content-center">
                    <b-form-input v-model="fullname" style="width: 240px" />
                    <b-button
                      @click="updateProfile('fullname')"
                      type="submit"
                      variant="primary"
                      class="ml-1"
                    >
                      Saqlash
                    </b-button>
                  </div>

                  <h6 class="text-muted mt-2">
                    {{ user.email }}
                  </h6>
                  <b-badge class="profile-badge" variant="light-primary">
                    {{ user.status == "accept" ? "Faol" : "Faol emas" }}
                  </b-badge>
                  <hr class="mb-2" />

                  <!-- follower projects rank -->
                  <div class="d-flex justify-content-between align-items-center mx-4">
                    <div>
                      <h6 class="text-muted font-weight-bolder">Kurslar</h6>
                      <h3
                        class="mb-0 text-primary cursor-pointer"
                        @click="toPage('courses')"
                      >
                        {{ user.course_count }} ta
                      </h3>
                    </div>
                    <div>
                      <h6 class="text-muted font-weight-bolder">Qarzdorlik</h6>
                      <h3
                        class="mb-0 text-primary cursor-pointer"
                        @click="toPage('later_payments')"
                      >
                        {{ user.arrearage > 0 ? user.arrearage : 0 }}
                      </h3>
                      <div v-if="user.arrearage > 0">
                        <b-button
                          type="submit"
                          variant="primary"
                          size="sm"
                          @click="toPage('later_payments')"
                        >
                          To'lov qilish
                        </b-button>
                      </div>
                    </div>
                  </div>
                  <!--/ follower projects rank -->
                </b-card>
              </b-row>
            </b-card-text>
          </b-overlay>
        </b-modal>
      </b-col>
    </b-row>
    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link class="nav-link" @click="toggleVerticalMenuActive">
          <feather-icon icon="MenuIcon" size="21" />
        </b-link>
      </li>
    </ul>

    <!-- Left Col -->
    <div class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex">
      <dark-Toggler class="d-none d-lg-block" />
    </div>

    <b-navbar-nav class="nav align-items-center ml-auto">
      <b-nav-item-dropdown
        right
        toggle-class="d-flex align-items-center dropdown-user-link"
        class="dropdown-user"
      >
        <template #button-content>
          <div class="d-sm-flex d-none user-nav">
            <p class="user-name font-weight-bolder mb-0">{{ user.login }}</p>
            <span class="user-status">{{ user.email }}</span>
          </div>
          <b-avatar
            size="40"
            variant="light-primary"
            text="A"
            badge
            :src="url(user.avatar)"
            class="badge-minimal"
            badge-variant="success"
          />
        </template>

        <!-- <b-dropdown-item @click="profile" link-class="d-flex align-items-center">
          <feather-icon size="16" icon="UserIcon" class="mr-50" />
          <span>Profil</span>
        </b-dropdown-item> -->
        <!--
        <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon size="16" icon="MailIcon" class="mr-50" />
          <span>Inbox</span>
        </b-dropdown-item>

        <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon size="16" icon="CheckSquareIcon" class="mr-50" />
          <span>Task</span>
        </b-dropdown-item> -->

        <!-- <b-dropdown-item link-class="d-flex align-items-center">
          <feather-icon size="16" icon="PhoneIcon" class="mr-50" />
          <a :href="`tel:+${user.phone }`" target="_blank">{{ user.phone }}</a>
        </b-dropdown-item>

        <b-dropdown-divider /> -->

        <b-dropdown-item @click="logout" link-class="d-flex align-items-center">
          <feather-icon size="16" icon="LogOutIcon" class="mr-50" />
          <span>Logout</span>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </div>
</template>

<script>
import {
  BLink,
  BNavbarNav,
  BNavItemDropdown,
  BDropdownItem,
  BDropdownDivider,
  BAvatar,
  BOverlay,
  BRow,
  BCol,
  BCardText,
  BForm,
  BCard,
  BBadge,
  BButton,
  BFormFile,
  BFormInput,
} from "bootstrap-vue";
import DarkToggler from "@core/layouts/components/app-navbar/components/DarkToggler.vue";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import api from "@/api/api";

import { ValidationObserver, ValidationProvider } from "vee-validate";
import formValidation from "@core/comp-functions/forms/form-validation";
import axios from "@axios";

export default {
  components: {
    BLink,
    BNavbarNav,
    BNavItemDropdown,
    BDropdownItem,
    BAvatar,

    // Navbar Components
    DarkToggler,
    BOverlay,
    BRow,
    BCol,
    BCardText,
    ValidationObserver,
    ValidationProvider,
    BForm,
    BCard,
    BBadge,
    BButton,
    BFormFile,
    BFormInput,
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      user: {
        id: 0,
        avatar: "",
        course_count: 0,
        email: "",
        fullname: "",
        phone: "",
        status: "",
        ticket_count: 0,
        time: "",
        token: "",
        waiting: "",
        arrearage: 0,
      },
      pro_show: false,
      profileFile: null,
      fullname: "",
      edit_name: false,
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    toPage(route_name) {
      this.$refs["modal-form"].hide();
      if (this.$route.name !== route_name) {
        this.$router.push({ name: route_name });
      }
    },
    profile() {
      this.getUser();
      this.$refs["modal-form"].show();
    },
    editName() {
      this.edit_name = true;
      this.fullname = this.user.fullname;
    },
    updateProfile(type) {
      let dataProfile = new FormData();
      dataProfile.append("type", type);
      dataProfile.append("avatar", this.profileFile);
      dataProfile.append("fullname", this.fullname);

      this.pro_show = true;
      var urlBase = api.getBaseUrlAdmin();
      axios.post(urlBase + "api/update/profile", dataProfile).then((response) => {
        const respond = response.data;
        this.pro_show = false;
        if (type == "fullname") {
          this.edit_name = false;
        }
        if (respond.success == true) {
          const auth = respond.data;
          localStorage.setItem("adminData", JSON.stringify(auth));
          this.$toast({
            component: ToastificationContent,
            position: "top-right",
            props: {
              title: "Muvaffaqiyatli",
              icon: "UserCheckIcon",
              variant: "success",
              text: `${respond.message}`,
            },
          });
          this.getUser();
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
    getUser() {
      this.user = api.getUser();
      api.adminGet().then((response) => {
        const respond = response.data;

        if (respond.success == true) {
          const auth = respond.data;
          localStorage.setItem("adminData", JSON.stringify(auth));

          this.user = api.getUser();
        } else if (respond.error_code == 1) {
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
    logout() {
      localStorage.removeItem("adminData");
      api.setToken(null);
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
    },
    url(image) {
      if (image == null) {
        // image = "https://www.atozserwisplus.pl/images/user.png";
      } else {
        image = api.imageUrl(image);
      }

      return image;
    },
  },
};
</script>
