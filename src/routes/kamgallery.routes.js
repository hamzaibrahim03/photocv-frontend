import KamranGalleries from "@/partials/kamgallery/KamranGalleries.vue";

export default [
  {
    path: "/competitions/kamrangalleries",
    name: "KamranGalleries",
    component: KamranGalleries,
    meta: { requiresAuth: true }
  },
];
