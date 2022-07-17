<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import { App as CapApp } from '@capacitor/app';
import { useAuth0 } from '@auth0/auth0-vue';
import { Browser } from '@capacitor/browser';

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet
  },
  setup() {
    const { handleRedirectCallback } = useAuth0();

    CapApp.addListener('appUrlOpen', async ({ url }) => {
      console.log("appUrlOpen", url);
      if (url.includes('state') && (url.includes('code') || url.includes('error'))) {
        console.log("handling callback...");
        await handleRedirectCallback(url);
      }
      // No-op on Android
      console.log("closing browser....");
      await Browser.close();
    });
  }
});
</script>