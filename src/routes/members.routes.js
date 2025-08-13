import MemberList from "@/partials/members/MemberList.vue";

export default [
  {
    path: "/competitions/memberlist",
    name: "MemberList",
    component: MemberList,
    meta: { requiresAuth: true }
  },
];
