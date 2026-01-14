import type { Component } from 'vue'

export interface ChemicalProperties {
  name: string
  systematicName: string | null
  cas: string
  smiles: string
  molecularWeight: number
  molecularFormula: string
  molecularFormulaHtml: string
  organic: boolean
  organicAcid: boolean
  aminoAcid: boolean
  nonStandardMetal: boolean
  flags: Record<string, unknown> | null
}

export interface ValueWithType {
  value: number | null
  units: string | null
  valueType: string
}

export interface ExperimentalValue {
  author: string
  year: number
  order: number
  value: number
  units: string | null
  valueType: string
}

export interface ModelFactor {
  type: string
  description: string
  fragmentCount: number
  coefficient: number
  contribution: number
  trainingCount?: number
  validationCount?: number
}

export interface EstimatedValueModel {
  factors?: ModelFactor[]
  logKow?: number
  output?: string
  notes?: string
  flags?: Record<string, unknown>
  [key: string]: unknown
}

export interface EstimatedValue {
  model: EstimatedValueModel
  value: number
  units: string
  valueType: string
}

export interface DataBlock {
  estimatedValue?: EstimatedValue
  experimentalValues: ExperimentalValue[]
  selectedValue: ValueWithType
  parameters?: Record<string, unknown>
}

export interface LogKowBlock extends DataBlock {
  parameters: {
    smiles: string
    cas: string
  }
  estimatedValue: EstimatedValue
}

export interface MeltingPointBlock extends DataBlock {
  estimatedValue: EstimatedValue
}

export interface ApiResponse {
  parameters: Record<string, unknown>
  chemicalProperties: ChemicalProperties
  logKow?: LogKowBlock
  meltingPoint?: MeltingPointBlock
  boilingPoint?: DataBlock
  vaporPressure?: DataBlock
  waterSolubilityFromLogKow?: DataBlock
  waterSolubilityFromWaterNt?: DataBlock
  henrysLawConstant?: DataBlock
  logKoa?: DataBlock
  logKoc?: DataBlock
  biodegradationRate?: DataBlock
  analogs?: string[]
  logKowAnalogs?: string[]
  [key: string]: unknown
}

export interface ResultBlock {
  title: string
  key: string
  data?: DataBlock
  component?: Component
}
