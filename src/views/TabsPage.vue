<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/randomTab">
          <ion-icon :icon="shuffle" />
          <ion-label>Random</ion-label>
        </ion-tab-button>
          
        <ion-tab-button tab="tab2" href="/tabs/searchTab">
          <ion-icon :icon="wine" />
          <ion-label>Choose</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="tab3" href="/tabs/tab3">
          <ion-icon :icon="search" />
          <ion-label>Search</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { search, shuffle, wine } from 'ionicons/icons';

</script>
