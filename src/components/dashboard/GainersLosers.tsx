"use client"

import Link from "next/link"
import { Stock } from "@/lib/mockData"
import { formatNumber, formatPercent } from "@/lib/utils"
import { TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface GainersLosersProps {
  gainers: Stock[]
  losers: Stock[]
}

function StockRow({ stock, rank, isGainer }: { stock: Stock; rank: number; isGainer: boolean }) {
  const color = isGainer ? 'text-emerald-400' : 'text-red-400'
  const bg = isGainer ? 'bg-emerald-400/10' : 'bg-red-400/10'

  return (
    <Link href={`/stocks/${stock.symbol}`}>
      <div className="flex items-center justify-between py-2.5 px-3 hover:bg-slate-700/50 rounded-lg transition-colors cursor-pointer group">
        <div className="flex items-center gap-3">
          <span className="text-slate-600 text-xs font-mono w-4">{rank}</span>
          <div>
            <div className="font-bold text-slate-100 text-sm group-hover:text-blue-400 transition-colors">{stock.symbol}</div>
            <div className="text-xs text-slate-500 truncate max-w-[120px]">{stock.name}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-mono font-semibold text-slate-200 tabular-nums">{formatNumber(stock.price, 2)}</div>
          <div className={`text-xs font-mono font-bold flex items-center gap-0.5 justify-end ${color}`}>
            {isGainer ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {formatPercent(stock.changePercent)}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function GainersLosers({ gainers, losers }: GainersLosersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold text-slate-300">
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            Top Gainers
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 px-3">
          <div className="space-y-0.5">
            {gainers.map((stock, i) => (
              <StockRow key={stock.symbol} stock={stock} rank={i + 1} isGainer={true} />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold text-slate-300">
            <div className="w-2 h-2 rounded-full bg-red-400" />
            Top Losers
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 px-3">
          <div className="space-y-0.5">
            {losers.map((stock, i) => (
              <StockRow key={stock.symbol} stock={stock} rank={i + 1} isGainer={false} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
