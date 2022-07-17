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
        <!-- <strong>Ready to create an app?</strong>
        <p>Start with Ionic <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p> -->
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
import { App as CapApp } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { defineComponent } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue';

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
    const { buildAuthorizeUrl, handleRedirectCallback, isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

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

    return {
      isAuthenticated,
      user,
      login: async () => {
        loginWithRedirect();
        // const url = await buildAuthorizeUrl();
        // console.log('url', url);
        // await Browser.open({ url, windowName: '_self' });
      },
      logout: () => {
        logout({ returnTo: window.location.origin });
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
