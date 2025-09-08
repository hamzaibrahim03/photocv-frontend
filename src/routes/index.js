import { createRouter, createWebHistory } from "vue-router";

// Load all *.routes.js files from router/ folder (no subfolders)
const routeFiles = require.context("./", false, /\.routes\.js$/);

const routes = [];

routeFiles.keys().forEach((fileName) => {
  const moduleRoutes = routeFiles(fileName).default;
  if (Array.isArray(moduleRoutes)) {
    routes.push(...moduleRoutes);
  }
});

routes.push(
  {
    path: "/",
    redirect: "/dashboard/profile",
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  }
);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token')

  if (to.path.startsWith('/dashboard') && !isLoggedIn) {
    return next('/login')
  }
  if (to.name) {
    document.title = to.name
  } 

  next()
})

export default router;
