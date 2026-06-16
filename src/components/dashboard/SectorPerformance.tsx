"use client"

import { SectorData } from "@/lib/mockData"
import { formatPercent, formatMarketCap } from "@/lib/utils"
import { TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SectorPerformanceProps {
  sectors: SectorData[]
}

function SectorCard({ sector }: { sector: SectorData }) {
  const isPositive = sector.change >= 0
  const absChange = Math.abs(sector.change)
  // Intensity based on change magnitude (0-5% range for color)
  const intensity = Math.min(absChange / 5, 1)

  return (
    <div
      className={`relative p-4 rounded-lg border transition-all duration-200 hover:scale-105 cursor-pointer ${
        isPositive
          ? 'border-emerald-800/60 bg-emerald-950/40 hover:bg-emerald-950/60 hover:border-emerald-700'
          : 'border-red-800/60 bg-red-950/40 hover:bg-red-950/60 hover:border-red-700'
      }`}
      style={{
        background: isPositive
          ? `rgba(6, 78, 59, ${0.1 + intensity * 0.25})`
          : `rgba(127, 29, 29, ${0.1 + intensity * 0.25})`,
      }}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-200">{sector.name}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{sector.stocks} stocks</p>
          </div>
          <div className={`flex items-center gap-1 text-sm font-bold font-mono ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {formatPercent(sector.change)}
          </div>
        </div>

        <div className="text-xs text-slate-500">
          Cap: {formatMarketCap(sector.marketCap)}
        </div>

        {/* Color bar */}
        <div className="h-1 rounded-full bg-slate-700 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${isPositive ? 'bg-emerald-400' : 'bg-red-400'}`}
            style={{ width: `${Math.max(10, intensity * 100)}%` }}
          />
        </div>

        <div className="flex gap-1 flex-wrap">
          {sector.leaders.map((leader) => (
            <span key={leader} className="text-xs px-1.5 py-0.5 bg-slate-800/60 rounded text-slate-400 font-mono">
              {leader}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function SectorPerformance({ sectors }: SectorPerformanceProps) {
  const sorted = [...sectors].sort((a, b) => b.change - a.change)

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold text-slate-300">
          <div className="w-2 h-2 rounded-full bg-blue-400" />
          Sector Performance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {sorted.map((sector) => (
            <SectorCard key={sector.name} sector={sector} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
