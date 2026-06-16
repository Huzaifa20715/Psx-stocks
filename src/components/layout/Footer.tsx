import Link from "next/link"
import { BarChart2 } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-slate-700 bg-slate-900 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 bg-blue-600 rounded-lg">
              <BarChart2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-slate-200">
              PSX <span className="text-blue-400">Stocks</span>
            </span>
          </div>

          <div className="text-center text-sm text-slate-500">
            <p>Data is for demonstration purposes only. Not financial advice.</p>
            <p className="mt-1">Pakistan Stock Exchange market data</p>
          </div>

          <div className="flex items-center gap-4 text-sm text-slate-500">
            <Link href="/" className="hover:text-slate-300 transition-colors">Dashboard</Link>
            <Link href="/stocks" className="hover:text-slate-300 transition-colors">Stocks</Link>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 text-center text-xs text-slate-600">
          <p>&copy; {new Date().getFullYear()} PSX Stocks. All rights reserved. | Pakistan Stock Exchange (PSX)</p>
        </div>
      </div>
    </footer>
  )
}
