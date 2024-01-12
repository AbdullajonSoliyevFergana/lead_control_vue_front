export default [
  {
    path: "/admin",
    name: "admin",
    // component: () => import("@/views/admin/Admin.vue"),
    meta: {
      contentClass: "ecommerce-application",
    },
  },
  {
    path: "/leads",
    name: "leads",
    component: () => import("@/views/admin/components/leads/Leads.vue"),
  },
  {
    path: "/operators",
    name: "operators",
    component: () => import("@/views/admin/components/operators/Operators.vue"),
  },
];
