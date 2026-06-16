import { notFound } from "next/navigation"
import Link from "next/link"
import { psxStocks, getSimilarStocks } from "@/lib/mockData"
import { formatNumber, formatVolume, formatMarketCap, formatPercent, formatChange } from "@/lib/utils"
import StockChart from "@/components/stocks/StockChart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, ArrowLeft, Building2, Newspaper, BarChart2 } from "lucide-react"

export async function generateStaticParams() {
  return psxStocks.map((stock) => ({ symbol: stock.symbol }))
}

export async function generateMetadata({ params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = await params
  const stock = psxStocks.find((s) => s.symbol === symbol)
  if (!stock) return { title: "Stock Not Found | PSX Stocks" }
  return {
    title: `${stock.symbol} - ${stock.name} | PSX Stocks`,
    description: `${stock.symbol} stock price, chart, and key statistics on PSX`,
  }
}

const mockNews = (symbol: string) => [
  {
    id: 1,
    title: `${symbol} reports strong Q4 earnings, beats analyst expectations`,
    source: "Business Recorder",
    time: "2 hours ago",
    sentiment: "positive",
  },
  {
    id: 2,
    title: `PSX market analysis: ${symbol} among top performers this week`,
    source: "The News International",
    time: "5 hours ago",
    sentiment: "positive",
  },
  {
    id: 3,
    title: `Analysts maintain buy rating on ${symbol} amid sector growth`,
    source: "Dawn News",
    time: "1 day ago",
    sentiment: "neutral",
  },
  {
    id: 4,
    title: `${symbol} announces dividend payout for FY2024`,
    source: "Profit by Pakistan Today",
    time: "2 days ago",
    sentiment: "positive",
  },
]

interface StatItemProps {
  label: string
  value: string
  highlight?: boolean
}

function StatItem({ label, value, highlight }: StatItemProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-slate-500">{label}</span>
      <span className={`text-sm font-mono font-semibold tabular-nums ${highlight ? 'text-blue-400' : 'text-slate-200'}`}>
        {value}
      </span>
    </div>
  )
}

export default async function StockDetailPage({ params }: { params: Promise<{ symbol: string }> }) {
  const { symbol } = await params
  const stock = psxStocks.find((s) => s.symbol === symbol)

  if (!stock) {
    notFound()
  }

  const similarStocks = getSimilarStocks(symbol, 4)
  const news = mockNews(symbol)
  const isPositive = stock.changePercent >= 0

  return (
    <div className="container mx-auto px-4 py-6 space-y-6 max-w-7xl">
      {/* Back link */}
      <Link
        href="/stocks"
        className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-300 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Stocks
      </Link>

      {/* Stock Header */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-600/20 border border-blue-500/30 rounded-xl">
                <span className="text-blue-400 font-bold text-sm">{stock.symbol.slice(0, 2)}</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-slate-100">{stock.symbol}</h1>
                  <Badge variant="secondary" className="text-xs">{stock.sector}</Badge>
                </div>
                <p className="text-sm text-slate-400">{stock.name}</p>
              </div>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <div className="text-3xl font-bold font-mono text-slate-100 tabular-nums">
              PKR {formatNumber(stock.price, 2)}
            </div>
            <div className={`flex items-center gap-1.5 mt-1 ${isPositive ? 'text-emerald-400' : 'text-red-400'} sm:justify-end`}>
              {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span className="font-mono font-semibold text-sm">
                {formatChange(stock.change)} ({formatPercent(stock.changePercent)})
              </span>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mt-5 pt-4 border-t border-slate-700">
          <StatItem label="Open" value={formatNumber(stock.open, 2)} />
          <StatItem label="High" value={formatNumber(stock.high, 2)} />
          <StatItem label="Low" value={formatNumber(stock.low, 2)} />
          <StatItem label="Prev Close" value={formatNumber(stock.prevClose, 2)} />
          <StatItem label="Volume" value={formatVolume(stock.volume)} />
          <StatItem label="Mkt Cap" value={formatMarketCap(stock.marketCap)} />
        </div>
      </div>

      {/* Chart */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold text-slate-300 flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-blue-400" />
            Price History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <StockChart
            symbol={stock.symbol}
            currentPrice={stock.price}
            changePercent={stock.changePercent}
          />
        </CardContent>
      </Card>

      {/* Key Statistics + About */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Key Stats */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-slate-300">Key Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
                <StatItem label="52W High" value={`PKR ${formatNumber(stock.high52w, 2)}`} />
                <StatItem label="52W Low" value={`PKR ${formatNumber(stock.low52w, 2)}`} />
                <StatItem label="P/E Ratio" value={`${stock.pe.toFixed(1)}x`} highlight />
                <StatItem label="EPS (PKR)" value={formatNumber(stock.eps, 2)} />
                <StatItem label="Book Value" value={`PKR ${formatNumber(stock.bookValue, 2)}`} />
                <StatItem label="Dividend Yield" value={stock.dividendYield > 0 ? `${stock.dividendYield.toFixed(1)}%` : 'N/A'} highlight />
                <StatItem label="Market Cap" value={formatMarketCap(stock.marketCap)} />
                <StatItem label="Volume (Today)" value={formatVolume(stock.volume)} />
              </div>

              {/* 52W Range Bar */}
              <div className="mt-6">
                <div className="flex justify-between text-xs text-slate-500 mb-2">
                  <span>52W Low: PKR {formatNumber(stock.low52w, 2)}</span>
                  <span>52W High: PKR {formatNumber(stock.high52w, 2)}</span>
                </div>
                <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-yellow-500 to-emerald-500 opacity-30 rounded-full" />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow border-2 border-blue-400"
                    style={{
                      left: `calc(${((stock.price - stock.low52w) / (stock.high52w - stock.low52w)) * 100}% - 6px)`,
                    }}
                  />
                </div>
                <div className="text-center text-xs text-slate-400 mt-1.5">
                  Current: PKR {formatNumber(stock.price, 2)} ({(((stock.price - stock.low52w) / (stock.high52w - stock.low52w)) * 100).toFixed(1)}% of 52W range)
                </div>
              </div>
            </CardContent>
          </Card>

          {/* News */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Newspaper className="w-4 h-4 text-blue-400" />
                Recent News
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {news.map((item) => (
                <div key={item.id} className="flex gap-3 p-3 rounded-lg hover:bg-slate-700/50 transition-colors cursor-pointer">
                  <div className={`w-1 rounded-full flex-shrink-0 ${item.sentiment === 'positive' ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                  <div>
                    <p className="text-sm text-slate-200 leading-snug">{item.title}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-xs text-blue-400 font-medium">{item.source}</span>
                      <span className="text-slate-600">·</span>
                      <span className="text-xs text-slate-500">{item.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* About */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-400" />
                About
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-400 leading-relaxed">{stock.description}</p>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Sector</span>
                  <span className="text-slate-300 font-medium">{stock.sector}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Symbol</span>
                  <span className="text-blue-400 font-mono font-bold">{stock.symbol}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Exchange</span>
                  <span className="text-slate-300">PSX (KSE)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Similar Stocks */}
          {similarStocks.length > 0 && (
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-slate-300">Similar Stocks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {similarStocks.map((s) => (
                  <Link key={s.symbol} href={`/stocks/${s.symbol}`}>
                    <div className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-700/50 transition-colors cursor-pointer">
                      <div>
                        <div className="font-bold text-blue-400 text-sm">{s.symbol}</div>
                        <div className="text-xs text-slate-500 truncate max-w-[120px]">{s.name}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-mono text-slate-200">{formatNumber(s.price, 2)}</div>
                        <div className={`text-xs font-mono font-semibold ${s.changePercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {formatPercent(s.changePercent)}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
