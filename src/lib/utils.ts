import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number, decimals = 2): string {
  return new Intl.NumberFormat('en-PK', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num)
}

export function formatCurrency(num: number): string {
  return `PKR ${formatNumber(num, 2)}`
}

export function formatVolume(num: number): string {
  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(2)}B`
  }
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(2)}M`
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(2)}K`
  }
  return num.toString()
}

export function formatMarketCap(num: number): string {
  if (num >= 1_000_000_000_000) {
    return `PKR ${(num / 1_000_000_000_000).toFixed(2)}T`
  }
  if (num >= 1_000_000_000) {
    return `PKR ${(num / 1_000_000_000).toFixed(2)}B`
  }
  if (num >= 1_000_000) {
    return `PKR ${(num / 1_000_000).toFixed(2)}M`
  }
  return `PKR ${formatNumber(num, 0)}`
}

export function formatPercent(num: number, showSign = true): string {
  const sign = showSign && num > 0 ? '+' : ''
  return `${sign}${num.toFixed(2)}%`
}

export function formatChange(num: number): string {
  const sign = num > 0 ? '+' : ''
  return `${sign}${formatNumber(num, 2)}`
}

export function getChangeColor(value: number): string {
  if (value > 0) return 'text-emerald-400'
  if (value < 0) return 'text-red-400'
  return 'text-slate-400'
}

export function getChangeBg(value: number): string {
  if (value > 0) return 'bg-emerald-400/10 text-emerald-400'
  if (value < 0) return 'bg-red-400/10 text-red-400'
  return 'bg-slate-400/10 text-slate-400'
}
