import MoreNews from "@/partials/news/MoreNews.vue";
import RecentComments from "@/partials/news/RecentComments.vue";
export default [
  {
    path: "/news/news",
    name: "MoreNews",
    component: MoreNews,
    meta: { requiresAuth: true }
  },
  {
    path: "/news/comments",
    name: "RecentComments",
    component: RecentComments,
    meta: { requiresAuth: true }
  },
];
