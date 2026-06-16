import { psxStocks } from "@/lib/mockData"
import StockTable from "@/components/stocks/StockTable"
import { BarChart2 } from "lucide-react"

export const metadata = {
  title: "Stock Screener | PSX Stocks",
  description: "Browse and screen all PSX listed stocks with real-time data",
}

export default function StocksPage() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-6 max-w-7xl">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <BarChart2 className="w-6 h-6 text-blue-400" />
          Stock Screener
        </h1>
        <p className="text-sm text-slate-500">
          {psxStocks.length} stocks listed on Pakistan Stock Exchange (PSX)
        </p>
      </div>

      <StockTable stocks={psxStocks} />
    </div>
  )
}
