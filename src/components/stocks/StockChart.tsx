"use client"

import { useState, useMemo } from "react"
import { OHLCVData, generateHistoricalData } from "@/lib/mockData"
import { formatNumber, formatVolume } from "@/lib/utils"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"

type Period = '1D' | '1W' | '1M' | '3M' | '1Y'

const periodDays: Record<Period, number> = {
  '1D': 1,
  '1W': 7,
  '1M': 30,
  '3M': 90,
  '1Y': 365,
}

interface StockChartProps {
  symbol: string
  currentPrice: number
  changePercent: number
}

interface TooltipPayloadItem {
  value: number
}

interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipPayloadItem[]
  label?: string
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null

  return (
    <div className="bg-slate-900 border border-slate-600 rounded-lg p-3 shadow-xl text-xs">
      <p className="text-slate-400 mb-2 font-medium">{label}</p>
      <div className="space-y-1">
        {payload[0] && (
          <div className="flex gap-3 items-center">
            <span className="text-slate-500">Close</span>
            <span className="font-mono font-bold text-slate-100">{formatNumber(payload[0].value, 2)}</span>
          </div>
        )}
      </div>
    </div>
  )
}

interface VolumeTooltipProps {
  active?: boolean
  payload?: TooltipPayloadItem[]
  label?: string
}

function VolumeTooltip({ active, payload, label }: VolumeTooltipProps) {
  if (!active || !payload || !payload.length) return null
  return (
    <div className="bg-slate-900 border border-slate-600 rounded-lg p-3 shadow-xl text-xs">
      <p className="text-slate-400 mb-1">{label}</p>
      <span className="font-mono font-bold text-blue-400">{formatVolume(payload[0].value)}</span>
    </div>
  )
}

export default function StockChart({ symbol, currentPrice, changePercent }: StockChartProps) {
  const [period, setPeriod] = useState<Period>('1M')

  const allData = useMemo(() => generateHistoricalData(symbol, 365), [symbol])

  const chartData = useMemo(() => {
    const days = periodDays[period]
    return allData.slice(-days)
  }, [allData, period])

  const isPositive = changePercent >= 0
  const lineColor = isPositive ? '#10b981' : '#ef4444'
  const gradientId = `gradient-${symbol}`

  const prices = chartData.map((d) => d.close)
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)
  const priceRange = maxPrice - minPrice
  const yDomain = [minPrice - priceRange * 0.05, maxPrice + priceRange * 0.05]

  const formatXAxis = (dateStr: string) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    if (period === '1D') return date.toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' })
    if (period === '1W') return date.toLocaleDateString('en-PK', { weekday: 'short' })
    if (period === '1M') return date.toLocaleDateString('en-PK', { day: 'numeric', month: 'short' })
    return date.toLocaleDateString('en-PK', { month: 'short', year: '2-digit' })
  }

  return (
    <div className="space-y-4">
      {/* Period selector */}
      <div className="flex items-center gap-1">
        {(Object.keys(periodDays) as Period[]).map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
              period === p
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Price Chart */}
      <div className="h-56 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={lineColor} stopOpacity={0.3} />
                <stop offset="95%" stopColor={lineColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={formatXAxis}
              tick={{ fill: '#64748b', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={yDomain}
              tick={{ fill: '#64748b', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: number) => formatNumber(v, 0)}
              width={55}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine
              y={currentPrice}
              stroke={lineColor}
              strokeDasharray="4 4"
              strokeOpacity={0.4}
            />
            <Area
              type="monotone"
              dataKey="close"
              stroke={lineColor}
              strokeWidth={2}
              fill={`url(#${gradientId})`}
              dot={false}
              activeDot={{ r: 4, fill: lineColor, stroke: '#0f172a', strokeWidth: 2 }}
              isAnimationActive={true}
              animationDuration={400}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Volume Chart */}
      <div className="h-16 sm:h-20">
        <p className="text-xs text-slate-500 mb-1">Volume</p>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 0, right: 4, left: 0, bottom: 0 }}>
            <XAxis dataKey="date" hide />
            <YAxis hide />
            <Tooltip content={<VolumeTooltip />} />
            <Bar
              dataKey="volume"
              fill="#3b82f6"
              opacity={0.5}
              radius={[2, 2, 0, 0]}
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
