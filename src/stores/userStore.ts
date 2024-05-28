import {
  FullTradeRequest,
  getAllIncomingTradeRequests,
  getAllSentTradeRequests,
} from "@/services/tradeRequest";
import { getTradeboxes } from "@/services/tradebox";
import { FullUserProfile, getUserProfile } from "@/services/userProfile";
import { FullWishlist } from "@/services/wishlist";
import { TradeBox, TradeRequest } from "@prisma/client";
import { defineStore } from "pinia";
import { Ref, computed, ref } from "vue";

export const useUserStore = defineStore("user", () => {

  const userProfile: Ref<FullUserProfile | undefined> = ref({
    id: 0,
    name: "robgoedemidag",
    fullName: "Robert Goedemidag",
    email: "robert@goedemidag.com",
    description: "I hire Chris as a developer! I am joking!",
    userId: 0,
    locationId: 0,
    type: "USER",
    banner: "",
    isVerified: true,
    isPremium: true,
    isBanned: true,
    countryCode: "nl",
    location: {
      id: 0,
      code: "nl",
      name: "Dutch",
    },
    image:
      "https://img.freepik.com/premium-photo/bearded-man-illustration_665280-67047.jpg",
  });
  const tradeboxes: Ref<TradeBox[]> = ref([]);
  const wishlist: Ref<FullWishlist | undefined> = ref({
    cards: [],
  });
  // Trade Requests
  const sentRequests: Ref<FullTradeRequest[]> = ref([]);
  const sentRequestsPending = ref<TradeRequest[]>([]);
  const incomingRequests: Ref<FullTradeRequest[]> = ref([]);
  const incomingRequestsPending = ref<TradeRequest[]>([]);

  const isAdmin = computed(() => {
    return userProfile.value?.type === "ADMIN";
  });
  const isVerified = computed(() => {
    return userProfile.value?.isVerified;
  });

  async function initUser() {
    refreshUserProfile();
    fetchWishlist();
    fetchTradeboxes();
    fetchTradeRequests();
  }

  async function refreshUserProfile() {
    userProfile.value = await getUserProfile();
  }

  async function fetchTradeRequests() {
    sentRequests.value = await getAllSentTradeRequests();
    sentRequestsPending.value = sentRequests.value.filter(
      (request) => request.tradeStatus.identifier === "pending"
    );
    incomingRequests.value = await getAllIncomingTradeRequests();
    incomingRequestsPending.value = incomingRequests.value.filter(
      (request) => request.tradeStatus.identifier === "pending"
    );
  }
  function fetchWishlist() {
    return wishlist.value;
  }

  async function fetchTradeboxes() {
    tradeboxes.value = await getTradeboxes();
  }

  return {
    userProfile,
    isAdmin,
    isVerified,
    tradeboxes,
    wishlist,
    sentRequests,
    sentRequestsPending,
    incomingRequests,
    incomingRequestsPending,
    initUser,
    fetchWishlist,
    fetchTradeboxes,
  };
},{
  persist:true
});
