<template>
  <v-container fluid>
    <v-row v-if="loading" justify="center" align="center" style="min-height: 400px">
      <v-col cols="12" class="text-center">
        <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
        <p class="mt-4">Loading data...</p>
      </v-col>
    </v-row>

    <v-row v-else-if="error" justify="center" align="center" style="min-height: 400px">
      <v-col cols="12" md="8" class="text-center">
        <v-alert type="error" prominent>
          <v-alert-title>Error loading data</v-alert-title>
          {{ error }}
        </v-alert>
      </v-col>
    </v-row>

    <v-row v-else-if="apiData" class="mt-2">
      <v-col cols="12" md="4">
        <LeftBlock :chemical-properties="chemicalProperties" />
      </v-col>
      <v-col cols="12" md="8">
        <RightBlock :api-data="apiData" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchEpiSuiteData } from '@/services/api'
import type { ApiResponse } from '@/types/api'
import LeftBlock from '@/components/LeftBlock.vue'
import RightBlock from '@/components/RightBlock.vue'

const route = useRoute()
const loading = ref(false)
const error = ref<string | null>(null)
const apiData = ref<ApiResponse | null>(null)

const chemicalProperties = computed(() => {
  return apiData.value?.chemicalProperties || null
})

async function loadData() {
  const cas = route.query.cas as string
  
  if (!cas) {
    error.value = 'CAS parameter is not specified'
    return
  }

  loading.value = true
  error.value = null

  try {
    apiData.value = await fetchEpiSuiteData(cas)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Unknown error'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadData()
})
</script>
