# PhotoCV – Club Dashboard (Vue 3)

The first front end for **PhotoCV**, a platform for **photography clubs**, built with **Vue 3**. It gives club admins a dashboard to run their club, and gives every club a public website.

> This is the earlier Vue version. The app was later rebuilt in React: see [**photocv-frontend-react**](https://github.com/hamzaibrahim03/photocv-frontend-react). Both use the [**photocv-backend**](https://github.com/hamzaibrahim03/photocv-backend) Laravel API.

## Features

**Club admin dashboard**
- Club settings and a 5-step club setup wizard (general, appearance, membership, content, privacy)
- **Members**: list and member profile pages
- **Competitions**: list, add and edit
- **Events, news, notices and pages**: list, add, edit and view
- **Galleries**: club and member galleries
- **Gear** and post sections

**Public club website**
- Club home page, galleries, news, notices and competitions for visitors

**Sign-up**
- 5-step sign-up for new clubs (general, appearance, membership, content, account)

## Tech stack

- **Vue 3** with **Vue Router**
- **Pinia** (with persisted state) for app state
- **Axios** for API calls
- **Vuetify**, Heroicons
- Data tables (vue3-easy-data-table, @bhplugin/vue3-datatable), Swiper and vue3-carousel, vue-easy-lightbox, vue3-datepicker
- Vue CLI

## Run it locally

**You'll need:** Node.js 18+ and the [backend](https://github.com/hamzaibrahim03/photocv-backend) running.

```bash
git clone https://github.com/hamzaibrahim03/photocv-frontend.git
cd photocv-frontend
npm install
```

Create a `.env` file that tells the app where the API is:

```env
VUE_APP_API_PROTOCOL=http
VUE_APP_API_SUFFIX=.localhost:8000/api/v1
```

Each club has its own subdomain, and the app builds the API address from it: `<protocol>://<subdomain><suffix>`. For example, opening `myclub.localhost:8080` calls `http://myclub.localhost:8000/api/v1`.

```bash
npm run serve    # start the dev server
npm run build    # production build
npm run lint     # check the code
```

## Project structure

```
src/
  api/          Axios client and API calls (club_admin, club_public)
  components/   Pages for the club admin, public club site and photographer
  partials/     Shared parts (club admin, gear, posts)
  routes/       Vue Router routes
  stores/       Pinia stores
  steps_club/ steps_signup/   Multi-step setup and sign-up wizards
  assets/       Images, icons and styles
```

## Author

**Hamza Ibrahim** – [GitHub](https://github.com/hamzaibrahim03)
