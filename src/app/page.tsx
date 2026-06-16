import { indices, getTopGainers, getTopLosers, getVolumeLeaders, sectorPerformance, marketBreadth } from "@/lib/mockData"
import IndexCard from "@/components/dashboard/IndexCard"
import GainersLosers from "@/components/dashboard/GainersLosers"
import SectorPerformance from "@/components/dashboard/SectorPerformance"
import MarketBreadth from "@/components/dashboard/MarketBreadth"
import VolumeLeaders from "@/components/dashboard/VolumeLeaders"
import { Clock, TrendingUp } from "lucide-react"

export default function DashboardPage() {
  const gainers = getTopGainers(5)
  const losers = getTopLosers(5)
  const volumeLeaders = getVolumeLeaders(5)

  return (
    <div className="container mx-auto px-4 py-6 space-y-6 max-w-7xl">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-blue-400" />
            Market Overview
          </h1>
          <p className="text-sm text-slate-500 mt-1">Pakistan Stock Exchange — Live Market Data</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Clock className="w-4 h-4" />
          <div className="flex items-center gap-1.5 ml-2 px-2.5 py-1 bg-emerald-400/10 border border-emerald-400/20 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 text-xs font-semibold">Market Open</span>
          </div>
        </div>
      </div>

      {/* Index Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <IndexCard index={indices.KSE100} />
        <IndexCard index={indices.KSE30} />
        <IndexCard index={indices.KMI30} />
      </div>

      {/* Market Breadth + Volume Leaders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <MarketBreadth data={marketBreadth} />
        <VolumeLeaders stocks={volumeLeaders} />
      </div>

      {/* Gainers & Losers */}
      <GainersLosers gainers={gainers} losers={losers} />

      {/* Sector Performance */}
      <SectorPerformance sectors={sectorPerformance} />
    </div>
  )
}
