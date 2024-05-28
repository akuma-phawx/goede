<script setup lang="ts">
import moment from "moment";
import {ref, reactive, computed, onMounted} from "vue";
import ImageModal from "@/components/modals/ImageModal.vue";
import ContentHeader from "@/components/content/ContentHeader.vue";
import ContentBody from "@/components/content/ContentBody.vue";
import ContentOverlay from "@/components/content/ContentOverlay.vue";
import {fetchSets, TheSet, getSetByName} from "@/services/set.ts";
const showImageModal = ref(false);
const selectedImageSource = ref("");

const filteredSets = ref<TheSet[]>([]);
const sortedSets = computed(() => {
  // Use a slice to avoid mutating the original array
  const setsCopy = [...filteredSets.value];

  // Sort the array alphabetically based on the 'name' property
  return setsCopy.sort((a, b) => a.name.localeCompare(b.name));
});

const isLoading = ref(false);

const openImageModal = (imageSource: string): void => {
  showImageModal.value = true;
  selectedImageSource.value = imageSource;
};
const closeImageModal = (): void => {
  showImageModal.value = false;
  selectedImageSource.value = "";
};

async function getAllSets(): Promise<void> {
  isLoading.value = true;
  searchTerms.name = "";
  filteredSets.value = await fetchSets();
  isLoading.value = false;
}
onMounted(async ()=>{
try {
  isLoading.value = true;
  filteredSets.value = await fetchSets();
} catch (error) {
  console.error(error);
} finally {
  isLoading.value = false;
}
})
</script>
<template>
  <ContentOverlay>
    <ContentHeader
      :color="'midnight-serenity'"
      :icon="'mdi-select-group'"
      :title="'Sets'"
      :subtitle="'Search through Pokémon Sets'"
    />
    <ContentBody>
      <div v-if="isLoading" class="d-flex justify-content-center">
        <v-progress-circular :size="50" color="primary" indeterminate />
      </div>
      <div v-else>
        <div v-if="filteredSets.length > 0">
          <v-table height="500px">
            <thead>
              <tr>
                <th class="text-center">Image</th>
                <th class="text-center">Name</th>
                <th class="text-center">Cards</th>
                <th class="text-center">Release Year</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="set in sortedSets" :key="set.name">
                <td class="text-center">
                  <v-avatar
                    size="x-large"
                    rounded="2"
                    class="shadow-lg p-1 m-2 cursor-pointer"
                    @click="openImageModal(set.logo_url)"
                  >
                    <v-img :src="set.logo_url" />
                  </v-avatar>
                </td>
                <td class="text-center">
                  <span>{{ set.name }}</span>
                </td>
                <td class="text-center">{{ set?.total }}</td>
                <td class="text-center">
                  {{ moment(set.release_date).format("YYYY") }}
                </td>
                <td class="text-center">
                  <v-btn color="info" depressed elevation="5">
                    <RouterLink
                      :to="'/app/sets/' + set.id"
                      class="text-white"
                      :text="'View Details'"
                    />
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </div>
      </div>
      <ImageModal
        v-if="showImageModal"
        :visible="showImageModal"
        :image-source="selectedImageSource"
        @close="closeImageModal"
      />
    </ContentBody>
  </ContentOverlay>
</template>
