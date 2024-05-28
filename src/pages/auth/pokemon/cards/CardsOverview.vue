<script setup lang="ts">
import { ref, reactive, onMounted, watch } from "vue";
import type { Ref } from "vue";
import ContentHeader from "@/components/content/ContentHeader.vue";
import ContentBody from "@/components/content/ContentBody.vue";
import ContentOverlay from "@/components/content/ContentOverlay.vue";
import SelectSet from "@/components/filters/SelectSet.vue";
import { fetchCards } from "@/services/card.ts";

import type { TheCard } from "@/services/card.ts";
// State variables
const cards: Ref<TheCard[]> = ref([]);
const filteredCards = ref<TheCard[]>([]);

// Modify your state variables
const currentPage = ref(1);
const pageSize = ref(8);
let pages = 0;

const loading = ref(false);

// Search terms and filters
const searchTerms = reactive({
  name: "",
  rarity: null,
  setId: null,
});

// Event handlers
function zoomIn(event: MouseEvent): void {
  (event.target as HTMLElement).classList.add("zoom-in");
}

function zoomOut(event: MouseEvent): void {
  (event.target as HTMLElement).classList.remove("zoom-in");
}

// Search function
async function search(): Promise<void> {
  loading.value = true;
  fetchingCards.value = true;
  try {
    const filtered = cards.value.filter((card) => {
      return (
        card.name.toLowerCase().includes(searchTerms.name.toLowerCase()) &&
        (searchTerms.setId ? card.set_id === searchTerms.setId : true)
      );
    });
    filteredCards.value = filtered;
    //paginate
    pages = Math.ceil(filtered.length / pageSize.value);
    currentPage.value = 1;
  } catch (error) {
    console.error(error);
    filteredCards.value = cards;
  } finally {
    loading.value = false;
    fetchingCards.value = false;
  }
}

// watch on page change and display new cards
watch(currentPage, (newPage) => {
  const start = (newPage - 1) * pageSize.value;
  const end = newPage * pageSize.value;
  filteredCards.value = cards.value.slice(start, end);
});
const fetchingCards = ref(false);
onMounted(async () => {
  fetchingCards.value = true;
  try {
    cards.value = await fetchCards();
    //paginate
    pages = Math.ceil(cards.value.length / pageSize.value);
    filteredCards.value = cards.value.slice(0, pageSize.value);
  } catch (error) {
    console.error(error);
  } finally {
    fetchingCards.value = false;
  }
});
</script>

<template>
  <ContentOverlay>
    <ContentHeader
      :color="'instagram-gradient-earthy'"
      :icon="'mdi-cards'"
      :title="'Cards'"
      :subtitle="'Search for a Pokémon Card'"
    />
    <ContentBody>
      <div class="row px-4 mt-4">
        <v-text-field
          class="col-lg-4 my-3"
          density="compact"
          v-model="searchTerms.name"
          color="info"
          @keyup.enter="search"
          label="Name"
          hint="Enter Pokemon Name"
          variant="outlined"
        />
        <SelectSet
          class="col-lg-4 my-3"
          :label="'Set'"
          v-model="searchTerms.setId"
        />
      </div>
      <div class="row">
        <div class="col-lg-5 my-3">
          <div class="mt-n4 mx-1">
            <v-btn
              :loading="loading"
              color="info"
              depressed
              elevation="5"
              @click="search"
              text="Filter"
            />
          </div>
        </div>
      </div>
      <div v-if="fetchingCards" class="d-flex justify-content-center">
        <v-progress-circular indeterminate color="info" />
      </div>
      <div v-else-if="cards.length > 0" class="row px-4 mt-5">
        <!-- Pagination -->
        <v-container v-if="pages > 1" class="text-center">
          <v-row justify="center">
            <v-col cols="6">
              <v-container class="max-width">
                <v-pagination
                  v-model="currentPage"
                  class="my-4"
                  :length="pages"
                  active-color="info"
                  elevation="2"
                />
              </v-container>
            </v-col>
          </v-row>
        </v-container>
        <!-- Cards -->

        <div
          v-for="card in filteredCards"
          class="col-lg-3 col-md-4 col-sm-6 p-4"
          :key="card.identifier"
        >
          <div class="card" data-animation="true">
            <div class="text-center p-0 position-relative mt-n4 mx-3 z-index-2">
              <RouterLink
                class="d-block blur-shadow-image cursor-pointer"
                :to="'/app/cards/' + card.id"
              >
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
            <!-- Card Details/Links -->
            <v-container v-if="card" class="text-center">
              <RouterLink
                class="d-block mt-1"
                :to="`/app/cards/${card.id}`"
                :text="card.name"
              />
              <RouterLink
                class="d-block link-info"
                :to="`/app/sets/${card?.set_id}`"
                :text="card?.set_id"
              />
            </v-container>
            <v-divider class="mx-4 my-0" />
            <!-- Card Footer -->
            <v-container>
              <div>
                <div class="d-flex justify-content-between">
                  <p class="my-auto">Traders</p>
                  <span class="badge badge-success">0</span>
                </div>
                <div class="d-flex justify-content-between mt-2">
                  <p class="my-auto">Nearby</p>
                  <span class="badge badge-info">0</span>
                </div>
              </div>
            </v-container>
          </div>
        </div>
        <!-- Pagination -->
        <v-container v-if="pages > 1" class="text-center">
          <v-row justify="center">
            <v-col cols="6">
              <v-container class="max-width">
                <v-pagination
                  v-model="currentPage"
                  class="my-4"
                  :length="pages"
                  active-color="info"
                  elevation="2"
                />
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </div>
      <div v-else class="row px-4 mt-5">
        <div class="no-result-text">
          <p>No Results</p>
        </div>
      </div>
    </ContentBody>
  </ContentOverlay>
</template>
