<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button>
                    </ion-back-button>
                </ion-buttons>
                <ion-title>{{ $route.params.name }}</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content v-if="state.isLoading">
            <div class="loadingCenter">
                <ion-spinner color="primary"></ion-spinner>
            </div>
        </ion-content>

        <ion-content v-else>
            <ion-list>
                <ion-item v-for="drink in state.drinks" :key="drink.idDrink"
                    @click="$router.push(`/tabs/drink-by-ingredient/drink-detail/${drink.idDrink}`)">
                    <ion-avatar slot="start">
                        <img :src="drink.strDrinkThumb">
                    </ion-avatar>
                    <ion-label>
                        {{ drink.strDrink }}
                    </ion-label>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { IonBackButton, IonButtons, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSpinner, IonList, IonItem, IonAvatar, IonLabel } from '@ionic/vue';
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
import { Drink } from '@/utils/Drink.interface';

const route = useRoute()

const state = reactive({
    drinks: [] as Drink[],
    isLoading: false
})

const fetchDrinks = async () => {
    state.isLoading = true

    const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${route.params.name}`).then(response => response.json())

    state.drinks = res.drinks

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