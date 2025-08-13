import FormAdd from "@/partials/competitionsadd/FormAdd.vue";
import GlobalSettings from "@/partials/competitionsadd/GlobalSettings.vue";
import ProfileWithoutSearch from "@/partials/competitionsadd/ProfileWithoutSearch.vue";

export default [
  {
    path: "/competitionsadd/form",
    name: "FormAdd",
    component: FormAdd,
     meta: { requiresAuth: true }
  },
  {
    path: "/competitionsadd/settings",
    name: "GlobalSettings",
    component: GlobalSettings,
     meta: { requiresAuth: true }
  },
  {
    path: "/competitionsadd/profile",
    name: "ProfileWithoutSearch",
    component: ProfileWithoutSearch,
     meta: { requiresAuth: true }
  },
];
