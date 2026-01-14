<template>
  <v-card v-if="props.apiData && currentDataBlock" elevation="2" class="shadow">
    <v-card-title class="bg-white text-primary pa-4">
      <div class="d-flex justify-space-between align-center w-100">
        <div>
          <h3 class="text-h5 mb-0">
            <span>Log</span> <span>K</span><span class="text-body-2">OW</span>
            <small class="text-h6 font-weight-semibold text-grey ms-1">Octanol-Water Partition Coefficient</small>
          </h3>
        </div>
      </div>
    </v-card-title>

    <v-tabs v-model="activeTab" bg-color="transparent">
      <v-tab
        v-for="(block, index) in blocks"
        :key="index"
        :value="index"
      >
        {{ block.title }}
      </v-tab>
    </v-tabs>

    <v-window v-model="activeTab">
      <v-window-item
        v-for="(block, index) in blocks"
        :key="index"
        :value="index"
      >
        <v-card-text class="pa-0">
          <component
            :is="block.component"
            :block-data="block.key === 'aimAnalogs' ? props.apiData : currentDataBlock"
          />
        </v-card-text>
      </v-window-item>
    </v-window>
  </v-card>
  <v-card v-else elevation="2">
    <v-card-text class="text-center text-grey">
      No additional data blocks
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ApiResponse, ResultBlock } from '@/types/api'
import SummaryBlock from './blocks/SummaryBlock.vue'
import ModelDescriptorsBlock from './blocks/ModelDescriptorsBlock.vue'
import ModelOutputBlock from './blocks/ModelOutputBlock.vue'
import AIMAnalogsBlock from './blocks/AIMAnalogsBlock.vue'

interface Props {
  apiData: ApiResponse | null
}

const props = defineProps<Props>()

const activeTab = ref(0)

const blocks = computed<ResultBlock[]>(() => {
  return [
    {
      title: 'Summary',
      key: 'summary',
      component: SummaryBlock
    },
    {
      title: 'Model Descriptors',
      key: 'modelDescriptors',
      component: ModelDescriptorsBlock
    },
    {
      title: 'Model Output',
      key: 'modelOutput',
      component: ModelOutputBlock
    },
    {
      title: 'AIM Analogs',
      key: 'aimAnalogs',
      component: AIMAnalogsBlock
    }
  ]
})

const currentDataBlock = computed(() => {
  if (!props.apiData) return null
  return props.apiData.logKow || null
})
</script>

<style scoped>
.shadow {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075) !important;
}
</style>
