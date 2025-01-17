import Link from 'next/link'
import type { ReactNode } from 'react'

export const Footer = (): ReactNode => (
  <footer className="border-t border-brightGray">
    <div className="mx-auto max-w-7xl px-4 py-12 text-white md:px-6">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <div>
          <p className="mb-4 font-semibold">Legal</p>
          <ul className="space-y-2">
            <li>
              <Link href="/privacy-policy">Privacy policy</Link>
            </li>
            <li>
              <Link href="/terms-of-services">Terms of Services</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-4 font-semibold">Social</p>
          <ul className="space-y-2">
            <li>
              <Link
                href="https://buymeacoffee.com/arnaudmanaranche"
                target="_blank"
                rel="noopener noreferrer"
              >
                Support the project
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-4 font-semibold">Tier Lists</p>
          <ul className="space-y-2">
            <li>
              <Link href="/tier-list/lec/2025/winter/Nisqy">
                Nisqy LEC Tier List
              </Link>
            </li>
            <li>
              <Link href="/tier-list/lfl/2025/kickoff/DrakoFR_">
                Drako LFL Tier List
              </Link>
            </li>
            <li>
              <Link href="/tier-list/lec/2025/winter/DrakoFR_">
                Drako LEC Tier List
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-4 pt-4 text-center">
        <p>© Copyright {new Date().getFullYear()} - All rights reserved</p>
      </div>
    </div>
  </footer>
)
