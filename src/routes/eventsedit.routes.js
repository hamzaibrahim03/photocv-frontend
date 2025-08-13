import EventsForm from "@/partials/eventsedit/EventsForm.vue";

export default [
  {
    path: "/eventsedit/form",
    name: "EventsForm",
    component: EventsForm,
    meta: { requiresAuth: true }
  },
];
