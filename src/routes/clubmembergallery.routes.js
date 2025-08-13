import ClubMemberGalleries from "@/partials/clubmembergallery/ClubMemberGalleries.vue";

export default [
  {
    path: "/clubmembergallery/gallery",
    name: "ClubMemberGalleries",
    component: ClubMemberGalleries,
    meta: { requiresAuth: true }
  },
];
