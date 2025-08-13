import MemberGalleries from "@/partials/membergallery/MemberGalleries.vue";

export default [
  {
    path: "/competitions/membergalleries",
    name: "MemberGalleries",
    component: MemberGalleries,
    meta: { requiresAuth: true }
  },
];
