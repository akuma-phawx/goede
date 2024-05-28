<!-- eslint-disable vue/no-parsing-error -->
<script setup lang="ts">
import { onMounted, ref, Ref } from "vue";
import { useToast } from "vue-toast-notification";
import { useUserStore } from "@/stores/userStore";
import ChangePasswordModal from "@/components/modals/ChangePasswordModal.vue";
import DeleteModal from "@/components/modals/DeleteModal.vue";
import ContentHeader from "@/components/content/ContentHeader.vue";
import SelectCountry from "@/components/filters/SelectCountry.vue";
import { deleteMe } from "@/services/auth";
import router from "@/router";
const { userProfile } = useUserStore();

const fullName = ref("");
const description = ref("");
const facebook = ref("");
const twitter = ref("");
const instagram = ref("");
const youtube = ref("");
const twitch = ref("");
const selectedCountry = ref("");

const showDeleteAccountModal = ref(false);
const isSaving = ref(false);
const $toast = useToast();
const save = () => {
  isSaving.value = true;
  userProfile.fullName = fullName.value;
  userProfile.countryId = selectedCountry.value;
  userProfile.description = description.value;
  userProfile.facebook = facebook.value;
  userProfile.twitter = twitter.value;
  userProfile.instagram = instagram.value;
  userProfile.youtube = youtube.value;
  userProfile.twitch = twitch.value;

  $toast.success("Profile updated!", {
    position: "top-right",
    duration: 1000,
  });

  isSaving.value = false;
};

const deleteAccount = async () => {
  await deleteMe();
  router.push("/");
};

onMounted(async () => {
  fullName.value = userProfile?.fullName ?? "";
  selectedCountry.value = userProfile?.countryId ?? "";
  description.value = userProfile?.description ?? "";
  facebook.value = userProfile?.facebook ?? "";
  twitter.value = userProfile?.twitter ?? "";
  instagram.value = userProfile?.instagram ?? "";
  youtube.value = userProfile?.youtube ?? "";
  twitch.value = userProfile?.twitch ?? "";
});

const showChangePasswordModal = ref(false);
</script>

<template>
  <div class="row">
    <div class="col-lg-12 position-relative z-index-2">
      <div class="card">
        <ContentHeader
          :color="'instagram-gradient-autumn'"
          :icon="'mdi-tools'"
          :title="'User Settings'"
          :subtitle="'Profile settings customization'"
        />
        <div class="card-body col-12">
          <div>
            <v-btn
              color="danger"
              class="mx-1 text-white"
              depressed
              elevation="5"
              @click="showDeleteAccountModal = true"
              text="Delete Account"
            />
            <v-btn
              color="dark"
              class="mx-1 text-white"
              depressed
              elevation="5"
              @click="showChangePasswordModal = true"
              text="Password Change"
            />
          </div>
          <div class="row mt-6">
            <div class="col-6">
              <div class="row mt-2">
                <v-text-field
                  density="compact"
                  v-model="fullName"
                  label="Full Name"
                  hint="Enter your full name"
                  variant="outlined"
                  color="info"
                >
                  <template #prepend-inner>
                    <v-icon color="#0074D9">mdi-account</v-icon>
                  </template>
                </v-text-field>
              </div>
              <template class="row mt-4">
                <SelectCountry
                  v-model="selectedCountry"
                  :label="'Location'"
                  :initial-country="selectedCountry"
                />
              </template>
              <div class="row mt-3">
                <v-textarea
                  density="compact"
                  v-model="description"
                  color="info"
                  label="Description"
                  hint="Enter a brief description about yourself"
                  variant="outlined"
                />
              </div>
            </div>
            <div class="col-6">
              <div class="row mt-2">
                <v-text-field
                  v-model="facebook"
                  label="Facebook Account"
                  color="info"
                  hint="Enter your Facebook profile link"
                  variant="outlined"
                >
                  <template #prepend-inner>
                    <v-icon color="#3b5998">mdi-facebook</v-icon>
                  </template>
                </v-text-field>
              </div>
              <div class="row mt-3">
                <v-text-field
                  v-model="twitter"
                  color="info"
                  label="Twitter Account"
                  hint="Enter your twitter profile link"
                  variant="outlined"
                >
                  <template #prepend-inner>
                    <v-icon color="#1DA1F2">mdi-twitter</v-icon>
                  </template>
                </v-text-field>
              </div>
              <div class="row mt-3">
                <v-text-field
                  v-model="instagram"
                  label="Instagram Account"
                  color="info"
                  hint="Enter your instagram profile link"
                  variant="outlined"
                >
                  <template #prepend-inner>
                    <v-icon class="instagram-gradient">mdi-instagram</v-icon>
                  </template>
                </v-text-field>
              </div>
              <div class="row mt-3">
                <v-text-field
                  v-model="youtube"
                  label="Youtube Account"
                  hint="Enter your youtube profile link"
                  color="info"
                  variant="outlined"
                >
                  <template #prepend-inner>
                    <v-icon color="#FF0000">mdi-youtube</v-icon>
                  </template>
                </v-text-field>
              </div>
              <div class="row mt-3">
                <v-text-field
                  v-model="twitch"
                  label="Twitch Account"
                  color="info"
                  hint="Enter your twitch profile link"
                  variant="outlined"
                >
                  <template #prepend-inner>
                    <v-icon color="#9146FF">mdi-twitch</v-icon>
                  </template>
                </v-text-field>
              </div>
            </div>
          </div>
          <div class="row mt-4">
            <div class="d-flex justify-content-center">
              <v-btn
                :loading="isSaving"
                color="primary"
                depressed
                elevation="5"
                @click.prevent="save"
                text="Apply Changes"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <DeleteModal
      v-if="showDeleteAccountModal"
      title="Delete Account"
      :visible="showDeleteAccountModal"
      @close="showDeleteAccountModal = false"
      @delete="deleteAccount"
    />
    <ChangePasswordModal
      v-if="showChangePasswordModal"
      :visible="showChangePasswordModal"
      @close="showChangePasswordModal = false"
    />
  </div>
</template>
