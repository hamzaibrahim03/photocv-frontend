import CalendarDashboard from "@/partials/dashboard/CalendarDashboard.vue";
import ClubGallery from "@/partials/dashboard/ClubGallery.vue";
import EventsComponent from "@/partials/dashboard/EventsComponent.vue";
import LatestMembers from "@/partials/dashboard/LatestMembers.vue";
import LatestNews from "@/partials/dashboard/LatestNews.vue";
import MemberGallery from "@/partials/dashboard/MemberGallery.vue";
import MembersComponent from "@/partials/dashboard/MembersComponent.vue";
import ProfileComponent from "@/partials/dashboard/ProfileComponent.vue";
import RecentNotices from "@/partials/dashboard/RecentNotices.vue";
import RecentPages from "@/partials/dashboard/RecentPages.vue";
import RecentResults from "@/partials/dashboard/RecentResults.vue";
import UpcomingCompetitions from "@/partials/dashboard/UpcomingCompetitions.vue";
import UpcomingEvents from "@/partials/dashboard/UpcomingEvents.vue";

export default [
  {
    path: "/dashboard/calendar",
    name: "CalendarDashboard",
    component: CalendarDashboard,
    meta: { requiresAuth: true }
  },
  {
    path: "/dashboard/clubgallery",
    name: "ClubGallery",
    component: ClubGallery,
    meta: { requiresAuth: true }
  },
  {
    path: "/dashboard/events",
    name: "EventsComponent",
    component: EventsComponent,
    meta: { requiresAuth: true }
  },
  {
    path: "/dashboard/latest",
    name: "LatestMembers",
    component: LatestMembers,
    meta: { requiresAuth: true }
  },
  {
    path: "/dashboard/latest",
    name: "LatestNews",
    component: LatestNews,
    meta: { requiresAuth: true }
  },
  {
    path: "/dashboard/membergallery",
    name: "MemberGallery",
    component: MemberGallery,
    meta: { requiresAuth: true }
  },
  {
    path: "/dashboard/members",
    name: "MembersComponent",
    component: MembersComponent,
    meta: { requiresAuth: true }
  },
  {
    path: "/dashboard/profile",
    name: "ProfileComponent",
    component: ProfileComponent,
    meta: { requiresAuth: true }
  },
  {
    path: "/dashboard/recentnotices",
    name: "RecentNotices",
    component: RecentNotices,
    meta: { requiresAuth: true }
  },
  {
    path: "/dashboard/recentpages",
    name: "RecentPages",
    component: RecentPages,
    meta: { requiresAuth: true }
  },
  {
    path: "/dashboard/recentresults",
    name: "RecentResults",
    component: RecentResults,
    meta: { requiresAuth: true }
  },
  {
    path: "/dashboard/upcomingcompetitions",
    name: "UpcomingCompetitions",
    component: UpcomingCompetitions,
    meta: { requiresAuth: true }
  },
  {
    path: "/dashboard/upcomingevents",
    name: "UpcomingEvents",
    component: UpcomingEvents,
    meta: { requiresAuth: true }
  },
];
