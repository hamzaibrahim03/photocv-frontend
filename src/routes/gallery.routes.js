import ClubGallery from "@/partials/gallery/ClubGallery.vue";
import MemberGallery from "@/partials/gallery/MemberGallery.vue";

export default [
  {
    path: "/gallery/clubgallery",
    name: "ClubGallery",
    component: ClubGallery,
    meta: { requiresAuth: true }
  },
  {
    path: "/gallery/membergallery",
    name: "MemberGallery",
    component: MemberGallery,
    meta: { requiresAuth: true }
  },
];
