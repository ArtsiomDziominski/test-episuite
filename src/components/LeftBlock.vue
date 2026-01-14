<template>
  <v-card v-if="chemicalProperties" elevation="2">
    <v-card-title class="text-h6">
      {{ chemicalProperties.name }}
    </v-card-title>
    <v-card-text>
      <div class="mb-4">
        <img 
          :src="chemicalStructureSvg" 
          alt="Chemical Structure" 
          class="chemical-structure-image"
          style="max-width: 100%; height: auto;"
        />
      </div>
      <div>
        <div class="mb-3">
          <div class="font-weight-medium mb-1">Systematic Name</div>
          <div class="text-grey">{{ chemicalProperties.systematicName || 'N/A' }}</div>
        </div>

        <div class="mb-3">
          <div class="font-weight-medium mb-1">CAS RN</div>
          <div class="text-grey">{{ chemicalProperties.cas || 'N/A' }}</div>
        </div>

        <div class="mb-3">
          <div class="font-weight-medium mb-1">Molecular Formula</div>
          <div class="text-grey" v-html="chemicalProperties.molecularFormulaHtml || chemicalProperties.molecularFormula"></div>
        </div>

        <div class="mb-3">
          <div class="font-weight-medium mb-1">Molecular Mass</div>
          <div class="text-grey">{{ formatNumber(chemicalProperties.molecularWeight) }}</div>
        </div>

        <div class="mb-3">
          <div class="font-weight-medium mb-1">SMILES</div>
          <div class="text-grey text-wrap">{{ chemicalProperties.smiles || 'N/A' }}</div>
        </div>
      </div>
    </v-card-text>
  </v-card>
  <v-card v-else elevation="2">
    <v-card-text class="text-center text-grey">
      Loading data...
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { ChemicalProperties } from '@/types/api'
import { formatNumber } from '@/utils/format'
import chemicalStructureSvg from '@/assets/svg/chemical-structure.svg'

interface Props {
  chemicalProperties: ChemicalProperties | null
}

defineProps<Props>()
</script>
