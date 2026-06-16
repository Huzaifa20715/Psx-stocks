"use client"

import { IndexData } from "@/lib/mockData"
import { formatNumber, formatPercent, formatChange } from "@/lib/utils"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { AreaChart, Area, ResponsiveContainer } from "recharts"
import { Card, CardContent } from "@/components/ui/card"

interface IndexCardProps {
  index: IndexData
}

export default function IndexCard({ index }: IndexCardProps) {
  const isPositive = index.changePercent > 0
  const isNeutral = index.changePercent === 0

  const sparkData = index.sparkline.map((value, i) => ({ value, i }))

  const TrendIcon = isPositive ? TrendingUp : isNeutral ? Minus : TrendingDown
  const colorClass = isPositive ? 'text-emerald-400' : isNeutral ? 'text-slate-400' : 'text-red-400'
  const bgClass = isPositive ? 'from-emerald-400/10' : isNeutral ? 'from-slate-400/10' : 'from-red-400/10'
  const chartColor = isPositive ? '#10b981' : isNeutral ? '#94a3b8' : '#ef4444'

  return (
    <Card className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-all duration-200 hover:shadow-lg hover:shadow-black/20">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{index.name}</span>
              <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-semibold ${isPositive ? 'bg-emerald-400/10 text-emerald-400' : isNeutral ? 'bg-slate-400/10 text-slate-400' : 'bg-red-400/10 text-red-400'}`}>
                <TrendIcon className="w-3 h-3" />
                {formatPercent(index.changePercent)}
              </div>
            </div>

            <div className={`text-2xl font-bold font-mono text-slate-100 tabular-nums`}>
              {formatNumber(index.value, 2)}
            </div>

            <div className={`flex items-center gap-1.5 mt-1 text-sm font-mono ${colorClass}`}>
              <TrendIcon className="w-4 h-4" />
              <span>{formatChange(index.change)}</span>
            </div>
          </div>

          {/* Sparkline */}
          <div className="w-24 h-14">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparkData}>
                <defs>
                  <linearGradient id={`grad-${index.name}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartColor} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={chartColor}
                  strokeWidth={2}
                  fill={`url(#grad-${index.name})`}
                  dot={false}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex gap-4 mt-3 pt-3 border-t border-slate-700">
          <div>
            <p className="text-xs text-slate-500">High</p>
            <p className="text-xs font-mono text-slate-300">{formatNumber(index.high, 2)}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Low</p>
            <p className="text-xs font-mono text-slate-300">{formatNumber(index.low, 2)}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Volume</p>
            <p className="text-xs font-mono text-slate-300">{(index.volume / 1_000_000).toFixed(0)}M</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
