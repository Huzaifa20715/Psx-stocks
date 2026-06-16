"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BarChart2, Search, Sun, Moon, Menu, X, TrendingUp } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { psxStocks } from "@/lib/mockData"

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<typeof psxStocks>([])
  const [showSearch, setShowSearch] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const router = useRouter()

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    if (query.length >= 1) {
      const results = psxStocks.filter(
        (s) =>
          s.symbol.toLowerCase().includes(query.toLowerCase()) ||
          s.name.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
      setSearchResults(results)
      setShowSearch(true)
    } else {
      setSearchResults([])
      setShowSearch(false)
    }
  }, [])

  const handleSelectStock = (symbol: string) => {
    setSearchQuery("")
    setSearchResults([])
    setShowSearch(false)
    router.push(`/stocks/${symbol}`)
  }

  const navLinks = [
    { href: "/", label: "Dashboard" },
    { href: "/stocks", label: "Stocks" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-700 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/80">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-lg">
              <BarChart2 className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-slate-100 text-lg tracking-tight hidden sm:block">
              PSX <span className="text-blue-400">Stocks</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-sm text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-md transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Search stocks... (e.g. OGDC, HBL)"
                className="pl-9 h-8 text-sm bg-slate-800 border-slate-600"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => searchResults.length > 0 && setShowSearch(true)}
                onBlur={() => setTimeout(() => setShowSearch(false), 200)}
              />
            </div>

            {/* Search Dropdown */}
            {showSearch && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-slate-800 border border-slate-600 rounded-lg shadow-2xl z-50 overflow-hidden">
                {searchResults.map((stock) => (
                  <button
                    key={stock.symbol}
                    className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-slate-700 transition-colors text-left"
                    onMouseDown={() => handleSelectStock(stock.symbol)}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-blue-400 text-sm">{stock.symbol}</span>
                        <span className="text-slate-400 text-xs">{stock.sector}</span>
                      </div>
                      <p className="text-slate-300 text-xs truncate">{stock.name}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-slate-100 text-sm font-mono font-semibold">{stock.price.toFixed(2)}</p>
                      <p className={`text-xs font-mono ${stock.changePercent >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Market status */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 rounded-full border border-slate-700">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-slate-400 font-medium">OPEN</span>
            </div>

            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="h-8 w-8"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-8 w-8"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-700 py-3">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-1.5 px-3 py-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-slate-400 font-medium">Market: OPEN</span>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
