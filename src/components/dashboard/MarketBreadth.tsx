"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatVolume } from "@/lib/utils"

interface MarketBreadthData {
  advances: number
  declines: number
  unchanged: number
  total: number
  totalVolume: number
  totalValue: number
}

interface MarketBreadthProps {
  data: MarketBreadthData
}

export default function MarketBreadth({ data }: MarketBreadthProps) {
  const advancesPct = (data.advances / data.total) * 100
  const declinesPct = (data.declines / data.total) * 100
  const unchangedPct = (data.unchanged / data.total) * 100

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold text-slate-300">
          <div className="w-2 h-2 rounded-full bg-blue-400" />
          Market Breadth
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Advances/Declines bar */}
        <div>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="text-emerald-400 font-semibold">{data.advances} Advances</span>
            <span className="text-slate-400">{data.unchanged} Unchanged</span>
            <span className="text-red-400 font-semibold">{data.declines} Declines</span>
          </div>
          <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
            <div
              className="bg-emerald-500 transition-all duration-500"
              style={{ width: `${advancesPct}%` }}
            />
            <div
              className="bg-slate-500 transition-all duration-500"
              style={{ width: `${unchangedPct}%` }}
            />
            <div
              className="bg-red-500 transition-all duration-500"
              style={{ width: `${declinesPct}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-slate-600 mt-1">
            <span>{advancesPct.toFixed(0)}%</span>
            <span>{unchangedPct.toFixed(0)}%</span>
            <span>{declinesPct.toFixed(0)}%</span>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-700">
          <div className="text-center">
            <div className="text-xl font-bold font-mono text-emerald-400">{data.advances}</div>
            <div className="text-xs text-slate-500 mt-0.5">Advances</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold font-mono text-slate-400">{data.unchanged}</div>
            <div className="text-xs text-slate-500 mt-0.5">Unchanged</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold font-mono text-red-400">{data.declines}</div>
            <div className="text-xs text-slate-500 mt-0.5">Declines</div>
          </div>
        </div>

        {/* Volume / Value */}
        <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-700">
          <div>
            <p className="text-xs text-slate-500">Total Volume</p>
            <p className="text-sm font-mono font-semibold text-slate-200 mt-0.5">
              {formatVolume(data.totalVolume)}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-500">Total Value</p>
            <p className="text-sm font-mono font-semibold text-slate-200 mt-0.5">
              PKR {formatVolume(data.totalValue)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
