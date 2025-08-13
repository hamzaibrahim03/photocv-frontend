import KamranAwards from "@/partials/membersingle/KamranAwards.vue";
import KamranComments from "@/partials/membersingle/KamranComments.vue";
import KamranEntries from "@/partials/membersingle/KamranEntries.vue";
import KamranGallery from "@/partials/membersingle/KamranGallery.vue";
import KamranLikes from "@/partials/membersingle/KamranLikes.vue";
import ProfileMember from "@/partials/membersingle/ProfileMember.vue";

export default [
  {
    path: "/membersingle/awards",
    name: "KamranAwards",
    component: KamranAwards,
    meta: { requiresAuth: true }
  },
  {
    path: "/membersingle/comments",
    name: "KamranComments",
    component: KamranComments,
    meta: { requiresAuth: true }
  },
  {
    path: "/membersingle/entries",
    name: "KamranEntries",
    component: KamranEntries,
    meta: { requiresAuth: true }
  },
  {
    path: "/membersingle/gallery",
    name: "KamranGallery",
    component: KamranGallery,
    meta: { requiresAuth: true }
  },
  {
    path: "/membersingle/likes",
    name: "KamranLikes",
    component: KamranLikes,
    meta: { requiresAuth: true }
  },
  {
    path: "/membersingle/profile",
    name: "ProfileMember",
    component: ProfileMember,
    meta: { requiresAuth: true }
  },
];
