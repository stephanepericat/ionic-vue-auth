import { createApp } from 'vue'
import App from './App.vue'
import setupRouter from './router';
import { createAuth0 } from '@auth0/auth0-vue';

import { isPlatform, IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';

const isNative = isPlatform('ios') || isPlatform('android');

const app = createApp(App);
const { VUE_APP_AUTH0_CLIENT_ID, VUE_APP_AUTH0_DOMAIN, VUE_APP_PACKAGE_ID } = process.env;

const redirect_uri = isNative
  ? `${VUE_APP_PACKAGE_ID}://${VUE_APP_AUTH0_DOMAIN}/capacitor/${VUE_APP_PACKAGE_ID}/callback`
  : window.location.origin;

console.log("redirect_uri", redirect_uri);
// co.shortwavaudio.authdemo://dev-rv69fnfh.us.auth0.com/capacitor/co.shortwavaudio.authdemo/callback

app
  .use(
    createAuth0({
      domain: VUE_APP_AUTH0_DOMAIN,
      client_id: VUE_APP_AUTH0_CLIENT_ID,
      // redirect_uri: window.location.origin
      redirect_uri,
    })
  )
  .use(IonicVue)


  const router = setupRouter(app);

  app.use(router);

router.isReady().then(() => {
  app.mount('#app');
});