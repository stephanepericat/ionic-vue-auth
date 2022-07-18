<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Home</ion-title>
      </ion-toolbar>
    </ion-header>
    
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Home</ion-title>
        </ion-toolbar>
      </ion-header>
    
      <div id="container">
        <template v-if="isAuthenticated">
          <p>Welcome. {{ user.name }}!</p>
          <IonButton @click="logout">Log Out</IonButton><br/>
          <RouterLink to="/profile">Go To Profile</RouterLink>
        </template>
        <template v-else>
          <IonButton @click="login">Log In</IonButton>
        </template>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { Browser } from '@capacitor/browser';
import { defineComponent } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';

import { createRedirectUri } from "../utils/redirect-uri";

export default defineComponent({
  name: 'HomePage',
  components: {
    IonButton,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
  },
  setup() {
    const { buildAuthorizeUrl, buildLogoutUrl, isAuthenticated, logout, user } = useAuth0();
    const { VUE_APP_AUTH0_DOMAIN, VUE_APP_PACKAGE_ID } = process.env;
    const logoutUri = createRedirectUri(VUE_APP_PACKAGE_ID, VUE_APP_AUTH0_DOMAIN);

    return {
      isAuthenticated,
      user,
      login: async () => {
        const url = await buildAuthorizeUrl();
        await Browser.open({ url });
      },
      logout: async () => {
        const url = buildLogoutUrl({ returnTo: logoutUri });
        await Browser.open({ url });
        logout({ localOnly: true });
      },
    };
  },
});
</script>

<style scoped>
#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
