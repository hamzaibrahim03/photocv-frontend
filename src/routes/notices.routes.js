import MoreNotices from "@/partials/notices/MoreNotices.vue";
import RecentComments from "@/partials/notices/RecentComments.vue";
export default [
  {
    path: "/notices/notices",
    name: "MoreNotices",
    component: MoreNotices,
    meta: { requiresAuth: true }
  },
  {
    path: "/notices/comments",
    name: "RecentComments",
    component: RecentComments,
    meta: { requiresAuth: true }
  },
];
