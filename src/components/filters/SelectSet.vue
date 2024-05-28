<script setup lang="ts">
import type { Ref } from "vue";
import { computed, onMounted, ref, watch } from "vue";
import { fetchSets } from "@/services/set";
import type { TheSet } from "@/services/set";
const props = defineProps<{
  modelValue: string | null;
  label: string;
}>();
const emit = defineEmits(["update:modelValue"]);
const sets = ref<TheSet[]>([]);
const selectedSet = ref<string | null>(null);

const sortedSets = computed(() => {
  // Use a slice to avoid mutating the original array
  const setsCopy = [...sets.value];

  // Sort the array alphabetically based on the 'name' property
  return setsCopy.sort((a, b) => a.name.localeCompare(b.name));
});
watch(
  () => props.modelValue,
  (newVal) => {
    selectedSet.value = newVal;
  }
);

watch(
  () => selectedSet.value,
  (newVal) => {
    if (newVal !== props.modelValue) {
      emit("update:modelValue", newVal);
    }
  }
);

onMounted(async () => {
  try {
    sets.value = await fetchSets();
  } catch (error) {
    console.error(error);
  }
});
</script>
<template>
  <v-select
    density="compact"
    :label="label"
    :items="sortedSets"
    color="info"
    clearable
    item-title="name"
    item-value="id"
    variant="outlined"
    v-model="selectedSet"
  >
    <template #selection="{ item }">
      <span class="mx-2">
        <v-avatar size="small" rounded="2" class="shadow-lg p-1 m-1">
          <v-img :src="item.raw.logo_url" />
        </v-avatar>
        {{ item.title }}
      </span>
    </template>
    <template #item="{ item, props }">
      <v-list-item v-bind="props">
        <template #title>
          <v-avatar size="small" rounded="2" class="shadow-lg p-1 m-1">
            <v-img :src="item.raw.logo_url" />
          </v-avatar>
          <span class="mx-2">{{ item.title }}</span>
        </template>
      </v-list-item>
    </template>
  </v-select>
</template>
