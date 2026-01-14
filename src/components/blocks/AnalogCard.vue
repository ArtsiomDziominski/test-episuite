<template>
  <v-card class="h-100" elevation="2">
    <v-card-title class="bg-white text-primary d-flex justify-space-between align-center">
      <div class="text-body-2 mt-1" style="max-width: 90%;">
        {{ analog.chemicalProperties?.name || 'N/A' }}
      </div>
    </v-card-title>
    <v-card-text>
      <div class="mb-3">
        <img 
          v-if="analog.chemicalProperties?.smiles"
          :src="`https://episuite.dev/EpiWebSuite/api/draw-chemical?smiles=${encodeURIComponent(analog.chemicalProperties.smiles)}`"
          :alt="`Chemical structure for ${analog.chemicalProperties.name}`"
          style="height: 200px; max-width: 75%;"
          class="mb-3"
        />
      </div>
      <div class="mb-3">
        <small class="text-muted">Systematic Name</small>
        <h6 class="fw-semibold">{{ analog.chemicalProperties?.systematicName || 'N/A' }}</h6>
      </div>
      <div class="mb-3">
        <small class="text-muted">CAS RN</small>
        <h6 class="fw-semibold">{{ analog.chemicalProperties?.cas || 'N/A' }}</h6>
      </div>
      <div class="mb-3">
        <small class="text-muted">Molecular Formula</small>
        <h6 class="fw-semibold" v-html="analog.chemicalProperties?.molecularFormulaHtml || analog.chemicalProperties?.molecularFormula || 'N/A'"></h6>
      </div>
      <div class="mb-3">
        <small class="text-muted">Molecular Mass</small>
        <h6 class="fw-semibold">{{ formatNumber(analog.chemicalProperties?.molecularWeight) }}</h6>
      </div>
      <div class="mb-3">
        <small class="text-muted">SMILES</small>
        <h6 class="fw-semibold">{{ analog.chemicalProperties?.smiles || 'N/A' }}</h6>
      </div>
      <div v-if="analog.logKow?.selectedValue" class="mb-3">
        <small class="text-muted">Log K<sub>OW</sub></small>
        <h6 class="fw-semibold">{{ formatNumber(analog.logKow.selectedValue.value) }}</h6>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { ApiResponse } from '@/types/api'
import { formatNumber } from '@/utils/format'

interface Props {
  analog: ApiResponse
}

defineProps<Props>()
</script>

<style scoped>
.text-muted {
  color: rgba(0, 0, 0, 0.6);
  font-size: 0.875rem;
}

.fw-semibold {
  font-weight: 600;
}
</style>
