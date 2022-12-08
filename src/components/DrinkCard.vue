<template>
  <ion-card>
    <ion-img :src="drink.strDrinkThumb" :alt="drink.strDrink"></ion-img>
    <ion-card-header>
      <ion-card-subtitle>
        {{ drink.strCategory }} | Served In {{ drink.strGlass }}
      </ion-card-subtitle>
      <ion-card-title>{{ drink.strDrink }}</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <p>{{ drink.strInstructions }}</p>

      <ion-list>
        <ion-list-header>
          <ion-label>Ingredients</ion-label>
        </ion-list-header>
        <template v-for="i in 15" :key="i">
          <ion-item v-if="drink[`strIngredient${i}` as keyof Drink]">
            <ion-label>
              {{ drink[`strIngredient${i}` as keyof Drink] }} -
              <span v-if="drink[`strMeasure${i}` as keyof Drink]">{{ drink[`strMeasure${i}` as keyof Drink]
              }}</span>
            </ion-label>
          </ion-item>
        </template>
      </ion-list>
    </ion-card-content>
  </ion-card>
</template>

<script setup lang="ts">
import { IonCard, IonCardContent, IonImg, IonList, IonItem, IonLabel, IonListHeader, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue';
import { defineProps } from 'vue';
import { Drink } from '@/utils/Drink.interface';


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  drink: Drink
}>()
</script>