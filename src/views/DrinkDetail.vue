<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button>
                    </ion-back-button>
                </ion-buttons>
                <ion-title>{{ state.drink.strDrink }}</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content v-if="state.isLoading">
            <div class="loadingCenter">
                <ion-spinner color="primary"></ion-spinner>
            </div>
        </ion-content>

        <ion-content v-else>
            <drink-card :drink="state.drink"></drink-card>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonBackButton, IonButtons, IonPage, IonHeader, IonToolbar, IonTitle, IonSpinner, IonContent } from '@ionic/vue';
import DrinkCard from '@/components/DrinkCard.vue';
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
import { Drink } from '@/utils/Drink.interface';


const state = reactive({
    drink: {} as Drink,
    isLoading: false
})

const route = useRoute()

const fetchDrinks = async () => {
    state.isLoading = true

    const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${route.params.id}`).then(response => response.json())

    state.drink = res.drinks[0]

    state.isLoading = false
}

fetchDrinks()
</script>

<style>
.loadingCenter {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
}
</style>