<template>
  <div v-if="blockData" class="ma-3">
    <div class="mb-3" v-if="!loadedAnalogs.length">
      <v-btn
        color="primary"
        @click="loadAnalogs"
        :loading="loading"
        :disabled="!analogsList || !analogsList.length"
      >
        Load AIM Analogs
      </v-btn>
    </div>

    <div v-if="loading" class="text-center text-grey pa-4">
      <v-progress-circular indeterminate color="primary" size="32"></v-progress-circular>
      <p class="mt-2">Loading analogs...</p>
    </div>

    <div v-else-if="error" class="text-center text-grey pa-4">
      <v-alert type="error" variant="tonal">
        {{ error }}
      </v-alert>
    </div>

    <div v-else-if="loadedAnalogs.length" class="row" style="overflow-y: auto; max-height: 600px;">
      <div
        v-for="(analog, index) in loadedAnalogs"
        :key="index"
        class="col-md-4 mb-4"
      >
        <AnalogCard :analog="analog" />
      </div>
    </div>

    <div v-else-if="!loading && analogsList && !analogsList.length" class="text-center text-grey pa-4">
      No analogs available
    </div>
  </div>
  <div v-else class="text-center text-grey pa-4">
    No data to display
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { fetchEpiSuiteData } from '@/services/api'
import type { ApiResponse } from '@/types/api'
import AnalogCard from './AnalogCard.vue'

interface Props {
  blockData: ApiResponse | null
}

const props = defineProps<Props>()

const loading = ref(false)
const error = ref<string | null>(null)
const loadedAnalogs = ref<ApiResponse[]>([])

const analogsList = computed(() => {
  if (!props.blockData) return null
  if (props.blockData.analogs && Array.isArray(props.blockData.analogs) && props.blockData.analogs.length) return props.blockData.analogs
  if (props.blockData.logKowAnalogs && Array.isArray(props.blockData.logKowAnalogs) && props.blockData.logKowAnalogs.length) return props.blockData.logKowAnalogs
  return null
})

async function loadAnalogs() {
  if (!analogsList.value || !analogsList.value.length) {
    error.value = 'No analogs available to load'
    return
  }

  loading.value = true
  error.value = null
  loadedAnalogs.value = []

  try {
    const promises = analogsList.value.map((cas: string) =>
      fetchEpiSuiteData(cas).catch((err) => {
        console.error(`Error loading data for CAS ${cas}:`, err)
        return null
      })
    )

    const results = await Promise.all(promises)
    loadedAnalogs.value = results.filter((result): result is ApiResponse => result !== null)

    if (!loadedAnalogs.value.length) {
      error.value = 'Failed to load analogs data'
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An error occurred while loading analogs'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -12px;
}

.col-md-4 {
  flex: 0 0 33.333333%;
  max-width: 33.333333%;
  padding: 0 12px;
}

@media (max-width: 960px) {
  .col-md-4 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
</style>
