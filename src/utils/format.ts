export function formatNumber(value: number | null | undefined, options?: {
  minimumFractionDigits?: number
  maximumFractionDigits?: number
  useExponential?: boolean
}): string {
  if (value === null || value === undefined) return '—'
  
  if (typeof value !== 'number') {
    return String(value)
  }

  const {
    minimumFractionDigits = 3,
    maximumFractionDigits = 3,
    useExponential = false
  } = options || {}

  if (useExponential && (value < 0.001 || value > 1000000)) {
    return value.toExponential(2)
  }

  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits,
    maximumFractionDigits
  }).format(value)
}
