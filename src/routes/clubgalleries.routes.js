import ClubGalleries from "@/partials/clubgallery/ClubGalleries.vue";

export default [
  {
    path: "/clubgallery/gallery",
    name: "ClubGalleries",
    component: ClubGalleries,
    meta: { requiresAuth: true }
  },
];
