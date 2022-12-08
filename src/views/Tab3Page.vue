<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Search Drinks</ion-title>
      </ion-toolbar>
      <ion-searchbar
        :animated="true"
        placeholder="Search for drinks"
        :debounce="500"
        @ionChange="(e) => fetchSearchResult(e.detail.value)"
      ></ion-searchbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-content v-if="state.isLoading">
        <div class="loadingCenter">
          <ion-spinner color="primary"></ion-spinner>
        </div>
      </ion-content>
      <ion-content v-else>
        <div class="center" v-if="state.searchResult.length === 0">
          <ion-label>No Result</ion-label>
        </div>
        <drink-card v-else v-for="drink in state.searchResult" :key="drink.idDrink" :drink="drink"></drink-card>
      </ion-content>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonLabel,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonSpinner
} from "@ionic/vue";
import DrinkCard from "@/components/DrinkCard.vue";
import { reactive } from "vue";
import { Drink } from "@/utils/Drink.interface";

const state = reactive({
  searchResult: [] as Drink[],
  isLoading: false
})

const fetchSearchResult = async (e: any) => {
  state.isLoading = true
  state.searchResult = []
  const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${e}`).then(response => response.json())

  if(res.drinks){
    state.searchResult = res?.drinks
    
  }
  state.isLoading = false
}
</script>

<style>
.loadingCenter {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
}
.center{
  text-align: center;
}
</style>
