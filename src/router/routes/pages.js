export default [
  {
    path: "/error-404",
    name: "error-404",
    component: () => import("@/views/error/Error404.vue"),
    meta: {
      layout: "full",
      resource: "Auth",
      action: "read",
    },
  },
  {
    path: "/chat",
    name: "chat",
    component: () => import("@/views/chat/Chat.vue"),
    meta: {
      layout: "full",
    },
  },
  {
    path: "/admin/login",
    name: "login_admin",
    component: () => import("@/views/pages/authentication/Login.vue"),
    meta: {
      layout: "full",
      resource: "Auth",
      redirectIfLoggedIn: true,
    },
  },
  // {
  //   path: "/admin/register",
  //   name: "register_admin",
  //   component: () => import("@/views/pages/authentication/Register.vue"),
  //   meta: {
  //     layout: "full",
  //     // resource: 'Auth',
  //     // redirectIfLoggedIn: true,
  //   },
  // },
  // {
  //     path: '/forgot-password',
  //     name: 'auth-forgot-password',
  //     component: () =>
  //         import ('@/views/pages/authentication/ForgotPassword.vue'),
  //     meta: {
  //         layout: 'full',
  //         resource: 'Auth',
  //         redirectIfLoggedIn: true,
  //     },
  // },
  // {
  //     path: '/pages/faq',
  //     name: 'pages-faq',
  //     component: () =>
  //         import ('@/views/pages/faq/Faq.vue'),
  //     meta: {
  //         pageTitle: 'FAQ',
  //         breadcrumb: [{
  //                 text: 'Pages',
  //             },
  //             {
  //                 text: 'FAQ',
  //                 active: true,
  //             },
  //         ],
  //     },
  // },
];
