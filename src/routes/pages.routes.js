import MorePages from "@/partials/pages/MorePages.vue";
import RecentComments from "@/partials/pages/RecentComments.vue";
export default [
  {
    path: "/pages/pages",
    name: "MorePages",
    component: MorePages,
    meta: { requiresAuth: true }
  },
  {
    path: "/pages/comments",
    name: "RecentComments",
    component: RecentComments,
    meta: { requiresAuth: true }
  },
];
