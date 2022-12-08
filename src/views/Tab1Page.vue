<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Random Drink</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content v-if="state.isLoading">
      <div class="loadingCenter">
        <ion-spinner color="primary"></ion-spinner>
      </div>
    </ion-content>

    <ion-content v-else>
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <drink-card :drink="state.drinks"></drink-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonRefresher, IonRefresherContent, IonHeader, IonToolbar, IonTitle, IonSpinner, IonContent } from '@ionic/vue';
import { reactive } from 'vue';
import DrinkCard from '@/components/DrinkCard.vue'
import { Drink } from '@/utils/Drink.interface';

const state = reactive({
  drinks: {} as Drink,
  isLoading: false
})

const fetchDrinks = async (displayLoaderPage: boolean) => {

  if (displayLoaderPage == true) {
    state.isLoading = true
  }

  const res = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php').then(response => response.json())

  state.drinks = res.drinks[0]

  state.isLoading = false
}

const doRefresh = (event: CustomEvent) => {

  setTimeout(() => {
    fetchDrinks(true)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment   
    // @ts-ignore
    event.target?.complete()
  }, 1000);
}

fetchDrinks(true)

</script>

<style>
.loadingCenter {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
}
</style>
