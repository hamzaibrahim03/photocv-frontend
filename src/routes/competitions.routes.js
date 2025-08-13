import RecentSubmissions from "@/partials/competitions/RecentSubmissions.vue";
import MoreCompetitions from "@/partials/competitions/MoreCompetitions.vue";

export default [
  {
    path: "/competitions/morecompetitions",
    name: "MoreCompetitions",
    component: MoreCompetitions,
     meta: { requiresAuth: true }
  },
  {
    path: "/competitions/submissions",
    name: "RecentSubmissions",
    component: RecentSubmissions,
     meta: { requiresAuth: true }
  },
];
