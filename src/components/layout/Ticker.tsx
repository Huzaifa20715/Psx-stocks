"use client"

import { psxStocks } from "@/lib/mockData"
import { formatNumber, formatPercent } from "@/lib/utils"
import { TrendingUp, TrendingDown } from "lucide-react"

export default function Ticker() {
  const tickerStocks = psxStocks.slice(0, 20)

  return (
    <div className="bg-slate-900 border-b border-slate-700 overflow-hidden h-9 flex items-center">
      <div className="flex-shrink-0 bg-blue-600 h-full flex items-center px-3">
        <span className="text-white text-xs font-bold tracking-wider">LIVE</span>
      </div>
      <div className="flex overflow-hidden flex-1 relative">
        <div className="flex animate-ticker whitespace-nowrap">
          {[...tickerStocks, ...tickerStocks].map((stock, idx) => (
            <span
              key={`${stock.symbol}-${idx}`}
              className="inline-flex items-center gap-1.5 px-4 text-xs"
            >
              <span className="font-bold text-slate-200">{stock.symbol}</span>
              <span className="font-mono text-slate-300">{formatNumber(stock.price)}</span>
              <span className={`flex items-center gap-0.5 font-mono font-semibold ${stock.changePercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {stock.changePercent >= 0
                  ? <TrendingUp className="w-3 h-3" />
                  : <TrendingDown className="w-3 h-3" />
                }
                {formatPercent(stock.changePercent)}
              </span>
              <span className="text-slate-600 ml-2">|</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
