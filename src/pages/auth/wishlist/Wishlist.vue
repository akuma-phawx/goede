<script setup lang="ts">
import { ref, computed } from "vue";
import { useToast } from "vue-toast-notification";
import DeleteModal from "@/components/modals/DeleteModal.vue";
import ContentHeader from "@/components/content/ContentHeader.vue";
import ContentBody from "@/components/content/ContentBody.vue";
import ContentOverlay from "@/components/content/ContentOverlay.vue";
import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";
import { TheCard } from "@/services/card";

// Data
const showDeleteModal = ref(false);
const cardToDeleteIdentifier = ref(""); // Initialize with an empty string

const userStore = useUserStore();
const { wishlist } = storeToRefs(userStore);

// Function to set the card identifier when the delete button is clicked
const removeCard = (identifier: string) => {
  wishlist.value.cards = wishlist.value?.cards.filter(
    (c) => c.id !== identifier
  );
};
const closeDeleteModal = () => {
  cardToDeleteIdentifier.value = "";
  showDeleteModal.value = false;
};
// Event handlers
function zoomIn(event: MouseEvent): void {
  (event.target as HTMLElement).classList.add("zoom-in");
}

function zoomOut(event: MouseEvent): void {
  (event.target as HTMLElement).classList.remove("zoom-in");
}

const $toast = useToast();

// Async function to remove a card from the wishlist
async function removeFromWishlist(): Promise<void> {
  showDeleteModal.value = false;
  wishlist.value.cards = wishlist.value?.cards.filter(
    (c) => c.id !== cardToDeleteIdentifier.value
  );
  $toast.error("Removed from wishlist.", {
    position: "top-right",
    duration: 1000,
  });
}
</script>
<template>
  <ContentOverlay>
    <ContentHeader
      :color="'instagram-gradient-candy'"
      :icon="'mdi-heart'"
      :title="'My Wishlist'"
      :subtitle="'The cards that you are looking for!'"
    />
    <ContentBody>
      <div
        v-if="wishlist?.cards.length && wishlist?.cards.length > 0"
        class="row mt-5"
      >
        <div class="row px-4 mt-5">
          <template class="d-block">
            <RouterLink to="/app/cards">
              <v-btn class="mt-1 mb-10" color="primary" text="Find More Cards"
            /></RouterLink>
          </template>
        </div>
        <div
          v-for="card in wishlist?.cards"
          class="col-lg-3 col-md-4 col-sm-6 p-4"
          :key="card?.id"
        >
          <div class="card" data-animation="true">
            <div class="text-center p-0 position-relative mt-n4 mx-3 z-index-2">
              <RouterLink
                class="d-block blur-shadow-image cursor-pointer"
                :to="'/app/cards/' + card?.id"
              >
                <img
                  :src="card?.small_image_url"
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
                <a href="javascript:;">{{ card?.name }}</a>
              </h5>
              <v-btn
                size="small"
                color="danger"
                class="text-white"
                depressed
                elevation="5"
                @click="removeCard(card?.id)"
                text="Remove"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-else class="row m-0">
        <div class="col-lg-4 col-md-4 col-sm-6 p-4">
          <p class="text-muted">
            Wishlist is empty.
            <router-link to="/app/cards" class="link-info">
              Add More Cards</router-link
            >
          </p>
        </div>
      </div>
    </ContentBody>
    <DeleteModal
      v-if="showDeleteModal"
      title="Remove Card"
      :visible="showDeleteModal"
      @close="closeDeleteModal"
      @delete="removeFromWishlist"
    />
  </ContentOverlay>
</template>
