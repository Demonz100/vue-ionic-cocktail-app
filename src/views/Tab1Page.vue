<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 1</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content v-if="state.isLoading">
      <div class="loadingCenter">
        <ion-spinner color="success"></ion-spinner>
      </div>
    </ion-content>

    <ion-content v-else>
      <ion-refresher slot="fixed" @ionRefresh="doRefresh($event)">
        <ion-refresher-content></ion-refresher-content>
      </ion-refresher>

      <ion-card>
        <ion-img :src="state.drinks.strDrinkThumb" :alt="state.drinks.strDrink"></ion-img>
        <ion-card-header>
          <ion-card-subtitle>
            {{ state.drinks.strCategory }} | Served In {{ state.drinks.strGlass }}
          </ion-card-subtitle>
          <ion-card-title>{{ state.drinks.strDrink }}</ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <p>{{ state.drinks.strInstructions }}</p>

          <ion-list>
            <ion-list-header>
              <ion-label>Ingredients</ion-label>
            </ion-list-header>
            <template v-for="i in 15" :key="i">
              <ion-item v-if="state.drinks[`strIngredient${i}` as keyof Drink]">
                <ion-label>
                  {{ state.drinks[`strIngredient${i}` as keyof Drink] }} -
                  <span v-if="state.drinks[`strMeasure${i}` as keyof Drink]">{{ state.drinks[`strMeasure${i}` as keyof
                      Drink]
                  }}</span>
                </ion-label>
              </ion-item>
            </template>
          </ion-list>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonList, IonListHeader, IonLabel, IonItem, IonRefresher, IonRefresherContent, IonHeader, IonToolbar, IonTitle, IonSpinner, IonContent, IonCard, IonCardHeader, IonImg, IonCardSubtitle, IonCardTitle, IonCardContent } from '@ionic/vue';
import { reactive } from 'vue';
import type { Drink } from '../Drink.Interface'

interface State {
  drinks: Drink
  isLoading: boolean
}

const state: State = reactive({
  drinks: {},
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
