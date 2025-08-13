import NoticeForm from "@/partials/noticesingle/NoticeForm.vue";

export default [
  {
    path: "/noticesingle/form",
    name: "NoticeForm",
    component: NoticeForm,
    meta: { requiresAuth: true }
  },
];
