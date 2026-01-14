<template>
  <div v-if="blockData && factors" class="ma-3">
    <pre class="ascii-table">{{ asciiTable }}</pre>
  </div>
  <div v-else class="text-center text-grey pa-4">
    No data to display
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formatNumber } from '@/utils/format'
import type { DataBlock, ModelFactor } from '@/types/api'

interface Props {
  blockData: DataBlock | null
}

const props = defineProps<Props>()

const factors = computed(() => {
  if (!props.blockData?.estimatedValue?.model?.factors) return null
  return props.blockData.estimatedValue.model.factors
})

const estimatedValue = computed(() => {
  return props.blockData?.estimatedValue?.value || null
})

function getTypeLabel(type: string): string {
  const typeMap: Record<string, string> = {
    Fragment: 'Frag',
    Factor: 'Factor',
    Constant: 'Const'
  }
  return typeMap[type] || type
}

function formatCoefficient(coeff: number | null | undefined): string {
  if (coeff === null || coeff === undefined) return '         '
  const formatted = formatNumber(coeff, { minimumFractionDigits: 4, maximumFractionDigits: 4, useExponential: false })
  const padded = coeff >= 0 ? ` ${formatted}` : formatted
  return padLeft(padded, 9)
}

function getValue(factor: ModelFactor): number {
  if (factor.type === 'Constant') return factor.contribution !== undefined ? factor.contribution : (factor.coefficient || 0)
  if (factor.contribution !== undefined && factor.contribution !== null) return factor.contribution
  const num = factor.fragmentCount || 0
  const coeff = factor.coefficient || 0
  return num * coeff
}

function formatValue(value: number): string {
  const formatted = formatNumber(value, { minimumFractionDigits: 4, maximumFractionDigits: 4, useExponential: false })
  const padded = value >= 0 ? ` ${formatted}` : formatted
  return padLeft(padded, 8)
}

function padRight(str: string, length: number): string {
  return str.padEnd(length, ' ')
}

function padLeft(str: string, length: number): string {
  return str.padStart(length, ' ')
}

const asciiTable = computed(() => {
  if (!factors.value) return ''
  
  const separator = '-------+-----+--------------------------------------------+---------+--------'
  const header = ' TYPE  | NUM |        LOGKOW FRAGMENT DESCRIPTION         |  COEFF  |  VALUE '
  
  let table = separator + '\n'
  table += header + '\n'
  table += separator + '\n'
  
  factors.value.forEach((factor: ModelFactor) => {
    const type = padRight(getTypeLabel(factor.type), 5)
    const num = factor.type === 'Constant' ? '     ' : padLeft(String(factor.fragmentCount || ''), 4)
    const desc = padRight(factor.description || '', 44)
    const coeff = factor.type === 'Constant' ? '         ' : formatCoefficient(factor.coefficient)
    const value = formatValue(getValue(factor))
    
    table += ` ${type} |${num} |  ${desc} |${coeff} |${value}\n`
  })
  
  table += separator + '\n'
  
  if (estimatedValue.value !== null) {
    const resultValue = formatValue(estimatedValue.value)
    const label = 'Log Kow'
    const totalLineLength = 73
    const labelPart = `${label}   =`
    const paddingLength = totalLineLength - labelPart.length - resultValue.length
    const padding = ' '.repeat(Math.max(0, paddingLength))
    table += `${padding}${labelPart}${resultValue}\n`
  }
  
  return table
})
</script>

<style scoped>
.ascii-table {
  font-family: 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.4;
  white-space: pre;
  overflow-x: auto;
  background-color: #f5f5f5;
  padding: 12px;
  border-radius: 4px;
  margin: 0;
}
</style>
