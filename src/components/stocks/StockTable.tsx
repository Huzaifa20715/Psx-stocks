"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Stock, sectors } from "@/lib/mockData"
import { formatNumber, formatVolume, formatMarketCap, formatPercent, formatChange } from "@/lib/utils"
import { TrendingUp, TrendingDown, Search, ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type SortKey = 'symbol' | 'price' | 'change' | 'changePercent' | 'volume' | 'marketCap' | 'pe'
type SortDir = 'asc' | 'desc'

interface StockTableProps {
  stocks: Stock[]
}

function SortIcon({ column, sortKey, sortDir }: { column: SortKey; sortKey: SortKey; sortDir: SortDir }) {
  if (column !== sortKey) return <ChevronsUpDown className="w-3 h-3 text-slate-600" />
  if (sortDir === 'asc') return <ChevronUp className="w-3 h-3 text-blue-400" />
  return <ChevronDown className="w-3 h-3 text-blue-400" />
}

export default function StockTable({ stocks }: StockTableProps) {
  const [search, setSearch] = useState("")
  const [sectorFilter, setSectorFilter] = useState("all")
  const [sortKey, setSortKey] = useState<SortKey>("volume")
  const [sortDir, setSortDir] = useState<SortDir>("desc")
  const [page, setPage] = useState(1)
  const pageSize = 15

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
    setPage(1)
  }

  const filtered = useMemo(() => {
    return stocks.filter((s) => {
      const matchesSearch =
        s.symbol.toLowerCase().includes(search.toLowerCase()) ||
        s.name.toLowerCase().includes(search.toLowerCase())
      const matchesSector = sectorFilter === 'all' || s.sector === sectorFilter
      return matchesSearch && matchesSector
    })
  }, [stocks, search, sectorFilter])

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let aVal: number | string = a[sortKey]
      let bVal: number | string = b[sortKey]
      if (typeof aVal === 'string') aVal = aVal.toLowerCase()
      if (typeof bVal === 'string') bVal = bVal.toLowerCase()
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1
      return 0
    })
  }, [filtered, sortKey, sortDir])

  const totalPages = Math.ceil(sorted.length / pageSize)
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize)

  const columns: { key: SortKey; label: string; align?: 'right' }[] = [
    { key: 'symbol', label: 'Symbol' },
    { key: 'price', label: 'Price (PKR)', align: 'right' },
    { key: 'change', label: 'Change', align: 'right' },
    { key: 'changePercent', label: '% Change', align: 'right' },
    { key: 'volume', label: 'Volume', align: 'right' },
    { key: 'marketCap', label: 'Mkt Cap', align: 'right' },
    { key: 'pe', label: 'P/E', align: 'right' },
  ]

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <Input
            placeholder="Search by symbol or company name..."
            className="pl-9"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
          />
        </div>
        <Select value={sectorFilter} onValueChange={(v) => { setSectorFilter(v); setPage(1) }}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="All Sectors" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sectors</SelectItem>
            {sectors.map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between text-sm text-slate-500">
        <span>Showing {paginated.length} of {filtered.length} stocks</span>
        {totalPages > 1 && (
          <span>Page {page} of {totalPages}</span>
        )}
      </div>

      {/* Table */}
      <div className="rounded-lg border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-900">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-200 transition-colors whitespace-nowrap ${col.align === 'right' ? 'text-right' : 'text-left'}`}
                    onClick={() => handleSort(col.key)}
                  >
                    <div className={`flex items-center gap-1 ${col.align === 'right' ? 'justify-end' : ''}`}>
                      {col.label}
                      <SortIcon column={col.key} sortKey={sortKey} sortDir={sortDir} />
                    </div>
                  </th>
                ))}
                <th className="px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider text-left">Sector</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {paginated.map((stock) => (
                <tr
                  key={stock.symbol}
                  className="hover:bg-slate-700/30 transition-colors group"
                >
                  <td className="px-4 py-3">
                    <Link href={`/stocks/${stock.symbol}`} className="block">
                      <div className="font-bold text-blue-400 text-sm group-hover:text-blue-300">{stock.symbol}</div>
                      <div className="text-xs text-slate-500 truncate max-w-[160px]">{stock.name}</div>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="font-mono font-semibold text-slate-100 text-sm tabular-nums">{formatNumber(stock.price, 2)}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={`font-mono text-sm tabular-nums ${stock.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {formatChange(stock.change)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-mono font-bold tabular-nums ${
                      stock.changePercent >= 0 ? 'bg-emerald-400/10 text-emerald-400' : 'bg-red-400/10 text-red-400'
                    }`}>
                      {stock.changePercent >= 0
                        ? <TrendingUp className="w-3 h-3" />
                        : <TrendingDown className="w-3 h-3" />
                      }
                      {formatPercent(stock.changePercent)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="font-mono text-sm text-slate-300 tabular-nums">{formatVolume(stock.volume)}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="font-mono text-sm text-slate-300 tabular-nums">{formatMarketCap(stock.marketCap)}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="font-mono text-sm text-slate-300 tabular-nums">{stock.pe.toFixed(1)}x</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-0.5 bg-slate-700 text-slate-300 rounded-full whitespace-nowrap">{stock.sector}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 text-sm bg-slate-800 border border-slate-700 rounded-md text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
            .map((p, i, arr) => (
              <span key={p}>
                {i > 0 && arr[i - 1] !== p - 1 && <span className="text-slate-600 px-1">...</span>}
                <button
                  onClick={() => setPage(p)}
                  className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                    p === page
                      ? 'bg-blue-600 text-white border border-blue-500'
                      : 'bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {p}
                </button>
              </span>
            ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1.5 text-sm bg-slate-800 border border-slate-700 rounded-md text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}
