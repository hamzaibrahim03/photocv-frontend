import CalendarEvent from '@/components/club_admin/Calendars/CalendarEvent.vue'
import QuickFilters from "@/partials/club_admin/events/QuickFilters.vue";
import MoreEvents from "@/partials/club_admin/events/MoreEvents.vue";
import RecentComments from "@/partials/club_admin/events/RecentComments.vue";

export default [
  {
    path: "/events/calendar",
    name: "CalendarEvent",
    component: CalendarEvent,
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
