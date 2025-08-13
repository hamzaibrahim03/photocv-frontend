import ClubForm from "@/partials/club/ClubForm.vue";
import ClubProfile from "@/partials/club/ClubProfile.vue";

export default [
  {
    path: "/club/form",
    name: "ClubForm",
    component: ClubForm,
    meta: { requiresAuth: true }
  },
  {
    path: "/club/profile",
    name: "ClubProfile",
    component: ClubProfile,
    meta: { requiresAuth: true }
  },
];
