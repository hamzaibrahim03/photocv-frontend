import CalendarAll from "@/partials/events/CalendarAll.vue";
import QuickFilters from "@/partials/events/QuickFilters.vue";
import MoreEvents from "@/partials/events/MoreEvents.vue";
import RecentComments from "@/partials/events/RecentComments.vue";

export default [
  {
    path: "/events/calendar",
    name: "CalendarAll",
    component: CalendarAll,
    meta: { requiresAuth: true }
  },
  {
    path: "/events/quickfilters",
    name: "QuickFilters",
    component: QuickFilters,
    meta: { requiresAuth: true }
  },
  {
    path: "/events/events",
    name: "MoreEvents",
    component: MoreEvents,
    meta: { requiresAuth: true }
  },
  {
    path: "/events/comments",
    name: "RecentComments",
    component: RecentComments,
    meta: { requiresAuth: true }
  }
];
