"use client"

import Link from "next/link"
import { Stock } from "@/lib/mockData"
import { formatNumber, formatVolume, formatPercent } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Volume2 } from "lucide-react"

interface VolumeLeadersProps {
  stocks: Stock[]
}

export default function VolumeLeaders({ stocks }: VolumeLeadersProps) {
  const maxVolume = Math.max(...stocks.map((s) => s.volume))

  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold text-slate-300">
          <Volume2 className="w-4 h-4 text-blue-400" />
          Volume Leaders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {stocks.map((stock, i) => (
            <Link key={stock.symbol} href={`/stocks/${stock.symbol}`}>
              <div className="group flex items-center gap-3 p-2.5 hover:bg-slate-700/50 rounded-lg transition-colors cursor-pointer">
                <span className="text-slate-600 text-xs font-mono w-4 flex-shrink-0">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-100 text-sm group-hover:text-blue-400 transition-colors">{stock.symbol}</span>
                      <span className={`text-xs font-mono font-semibold ${stock.changePercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {formatPercent(stock.changePercent)}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-mono text-slate-300">{formatVolume(stock.volume)}</span>
                    </div>
                  </div>
                  {/* Volume bar */}
                  <div className="h-1 rounded-full bg-slate-700 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-blue-500/60"
                      style={{ width: `${(stock.volume / maxVolume) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
