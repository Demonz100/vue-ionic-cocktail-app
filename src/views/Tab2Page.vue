<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Search by Ingredients</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content v-if="state.isLoading">
      <div class="loadingCenter">
        <ion-spinner color="success"></ion-spinner>
      </div>
    </ion-content>

    <ion-content v-else>
      <ion-list>
        <ion-item v-for="ingredient in state.ingredients" :key="ingredient.strIngredient1" @click="$router.push(`/drink-by-ingredient/${ingredient.strIngredient1}`)">
          <ion-avatar>
            <img :src="fetchIngredientsImage(ingredient.strIngredient1)">
          </ion-avatar>
          <ion-label>
            {{ ingredient.strIngredient1 }}
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSpinner, IonList, IonItem, IonAvatar, IonLabel } from '@ionic/vue';
import { reactive } from 'vue';

interface Ingredient {
  strIngredient1 : string
}
interface State {
  ingredients: Ingredient[]
  isLoading: boolean
}

const state : State = reactive({
  ingredients: [],
  isLoading: false
})

const fetchIngredients = async () => {
  state.isLoading = true

  const res = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list').then(response => response.json())

  state.ingredients = res.drinks

  state.isLoading = false
}

const fetchIngredientsImage = (ingredientName: string) => {
  return `https:\\www.thecocktaildb.com/images/ingredients/${ingredientName}-Small.png`
}

fetchIngredients()
</script>

<style>
.loadingCenter {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
}
</style>
