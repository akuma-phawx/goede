<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed, onMounted, ref } from 'vue';
import { FullCard } from '@/services/search';
import SelectRarity from '@/components/filters/SelectRarity.vue';
import {getSetById, getSetCards, TheSet} from '@/services/set';
import ContentHeader from '@/components/content/ContentHeader.vue';
import ContentBody from '@/components/content/ContentBody.vue';
import ContentOverlay from '@/components/content/ContentOverlay.vue';

const set = ref<TheSet>();
const setCards = ref<TheCard[]>([]);

function zoomIn(event: MouseEvent): void {
  (event.target as HTMLElement).classList.add('zoom-in');
}
function zoomOut(event: MouseEvent): void {
  (event.target as HTMLElement).classList.remove('zoom-in');
}

onMounted(async () => {
  const setId = useRoute().params.id as string;
  set.value = await getSetById(setId);
  setCards.value = await getSetCards(setId);
});
</script>
<template>
  <ContentOverlay>
    <ContentHeader
      :color="'midnight-serenity'"
      :icon="'mdi-information'"
      :title="'Set Details'"
      :subtitle="`${set?.name} additional details and information`"
    />
    <ContentBody>
      <v-card class="mx-8 shadow-none" max-width="344">
        <v-img :src="set?.logo_url" height="200px" />
        <v-card-title> {{ set?.name }} </v-card-title>
        <v-card-subtitle> Released at {{set?.release_date}} </v-card-subtitle>
        <v-card-text> Number of cards: {{ set?.total  }} </v-card-text>
      </v-card>
      <div class="row mt-2">
        <h5 class="ms-3">Card List</h5>
        <div class="col-12">
          <div class="row mt-5" v-if="setCards && setCards.length >0">
            <div v-for="card in setCards" class="col-lg-3 col-md-4 col-sm-6 p-4" :key="card.id">
              <div class="card" data-animation="true">
                <div class="text-center p-0 position-relative mt-n4 mx-3 z-index-2">
                  <RouterLink class="d-block blur-shadow-image cursor-pointer" :to="'/app/cards/' + card.id">
                    <img
                      :src="card.small_image_url"
                      alt="img-blur-shadow"
                      class="zoom-image img-fluid shadow-lg border-radius-lg"
                      @mouseover="zoomIn"
                      @mouseleave="zoomOut"
                      crossorigin="anonymous"
                    />
                  </RouterLink>
                </div>
                <div class="card-body text-center">
                  <div class="d-flex mx-auto"></div>
                  <h5 class="font-weight-normal mt-1">
                    <RouterLink :to="'/app/cards/' + card.id" :text="card.name" />
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentBody>
  </ContentOverlay>
</template>
