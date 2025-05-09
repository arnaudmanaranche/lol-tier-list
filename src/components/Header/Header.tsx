import type { User } from '@supabase/supabase-js'
import Link from 'next/link'
import type { ReactNode } from 'react'

import { Button } from '@/components/Button'
import { useLogin } from '@/hooks/useLogin'
import { ROUTES } from '@/utils/constants'

import XIcon from '../../svgs/x.svg'

interface HeaderProps {
  user: User | null
}

export function Header({ user }: HeaderProps): ReactNode {
  const handleLogin = useLogin()

  return (
    <header className="mx-auto flex w-full max-w-7xl items-center px-4 pt-6 md:px-6">
      <div className="mx-auto flex flex-1 items-center justify-between p-3 md:flex-row md:p-5">
        <nav>
          <ul className="flex items-center gap-4">
            <li className="md:pr-10">
              <Link
                href={ROUTES.HOME}
                prefetch={false}
                className="text-center font-bold text-white"
              >
                <div className="flex items-center space-x-2">
                  <svg
                    width="130"
                    viewBox="0 0 177 89"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.10769 76.7231L61.6154 76.7231C63.884 76.7231 65.7231 74.884 65.7231 72.6154L65.7231 64.4C65.7231 62.1314 63.884 60.2923 61.6154 60.2923L4.10769 60.2923C1.83908 60.2923 1.27565e-06 62.1314 1.07732e-06 64.4L3.59106e-07 72.6154C1.60777e-07 74.884 1.83908 76.7231 4.10769 76.7231Z"
                      fill="#FBBF24"
                    />
                    <path
                      d="M20.5385 52.0769L61.6154 52.0769C63.884 52.0769 65.7231 50.2378 65.7231 47.9692L65.7231 39.7538C65.7231 37.4852 63.884 35.6462 61.6154 35.6462L20.5385 35.6461C18.2698 35.6461 16.4308 37.4852 16.4308 39.7538L16.4308 47.9692C16.4308 50.2378 18.2698 52.0769 20.5385 52.0769Z"
                      fill="#A3E635"
                    />
                    <path
                      d="M36.9692 27.4308L61.6154 27.4308C63.884 27.4308 65.7231 25.5917 65.7231 23.3231L65.7231 15.1077C65.7231 12.8391 63.884 11 61.6154 11L36.9692 11C34.7006 11 32.8615 12.8391 32.8615 15.1077L32.8615 23.3231C32.8615 25.5917 34.7006 27.4308 36.9692 27.4308Z"
                      fill="#EF4444"
                    />
                    <path
                      d="M74.845 9.5H79.795V36.5H87.94V41H74.845V9.5ZM90.3138 9.5H103.814V14H95.2638V22.325H102.059V26.825H95.2638V36.5H103.814V41H90.3138V9.5ZM110.486 9.5H117.191L122.321 41H117.371L116.471 34.745V34.835H110.846L109.946 41H105.356L110.486 9.5ZM115.886 30.56L113.681 14.99H113.591L111.431 30.56H115.886ZM131.655 41.45C129.255 41.45 127.425 40.775 126.165 39.425C124.905 38.045 124.275 36.08 124.275 33.53V16.97C124.275 14.42 124.905 12.47 126.165 11.12C127.425 9.74 129.255 9.05 131.655 9.05C134.055 9.05 135.885 9.74 137.145 11.12C138.405 12.47 139.035 14.42 139.035 16.97V19.67H134.355V16.655C134.355 14.585 133.5 13.55 131.79 13.55C130.08 13.55 129.225 14.585 129.225 16.655V33.89C129.225 35.93 130.08 36.95 131.79 36.95C133.5 36.95 134.355 35.93 134.355 33.89V27.725H131.88V23.225H139.035V33.53C139.035 36.08 138.405 38.045 137.145 39.425C135.885 40.775 134.055 41.45 131.655 41.45ZM149.413 41.45C147.013 41.45 145.183 40.775 143.923 39.425C142.663 38.045 142.033 36.08 142.033 33.53V9.5H146.983V33.89C146.983 34.97 147.193 35.75 147.613 36.23C148.063 36.71 148.693 36.95 149.503 36.95C150.313 36.95 150.928 36.71 151.348 36.23C151.798 35.75 152.023 34.97 152.023 33.89V9.5H156.793V33.53C156.793 36.08 156.163 38.045 154.903 39.425C153.643 40.775 151.813 41.45 149.413 41.45ZM160.319 9.5H173.819V14H165.269V22.325H172.064V26.825H165.269V36.5H173.819V41H160.319V9.5Z"
                      fill="white"
                    />
                    <path
                      d="M78.08 53H73.48V49H87.08V53H82.48V77H78.08V53ZM89.2103 49H93.6103V77H89.2103V49ZM96.9056 49H108.906V53H101.306V60.4H107.346V64.4H101.306V73H108.906V77H96.9056V49ZM111.437 49H117.957C120.224 49 121.877 49.5333 122.917 50.6C123.957 51.64 124.477 53.2533 124.477 55.44V57.16C124.477 60.0667 123.517 61.9067 121.597 62.68V62.76C122.664 63.08 123.41 63.7333 123.837 64.72C124.29 65.7067 124.517 67.0267 124.517 68.68V73.6C124.517 74.4 124.544 75.0533 124.597 75.56C124.65 76.04 124.784 76.52 124.997 77H120.517C120.357 76.5467 120.25 76.12 120.197 75.72C120.144 75.32 120.117 74.6 120.117 73.56V68.44C120.117 67.16 119.904 66.2667 119.477 65.76C119.077 65.2533 118.37 65 117.357 65H115.837V77H111.437V49ZM117.437 61C118.317 61 118.97 60.7733 119.397 60.32C119.85 59.8667 120.077 59.1067 120.077 58.04V55.88C120.077 54.8667 119.89 54.1333 119.517 53.68C119.17 53.2267 118.61 53 117.837 53H115.837V61H117.437ZM127.57 49H131.97V73H139.21V77H127.57V49ZM141.32 49H145.72V77H141.32V49ZM154.735 77.4C152.602 77.4 150.988 76.8 149.895 75.6C148.802 74.3733 148.255 72.6267 148.255 70.36V68.76H152.415V70.68C152.415 72.4933 153.175 73.4 154.695 73.4C155.442 73.4 156.002 73.1867 156.375 72.76C156.775 72.3067 156.975 71.5867 156.975 70.6C156.975 69.4267 156.708 68.4 156.175 67.52C155.642 66.6133 154.655 65.5333 153.215 64.28C151.402 62.68 150.135 61.24 149.415 59.96C148.695 58.6533 148.335 57.1867 148.335 55.56C148.335 53.3467 148.895 51.64 150.015 50.44C151.135 49.2133 152.762 48.6 154.895 48.6C157.002 48.6 158.588 49.2133 159.655 50.44C160.748 51.64 161.295 53.3733 161.295 55.64V56.8H157.135V55.36C157.135 54.4 156.948 53.7067 156.575 53.28C156.202 52.8267 155.655 52.6 154.935 52.6C153.468 52.6 152.735 53.4933 152.735 55.28C152.735 56.2933 153.002 57.24 153.535 58.12C154.095 59 155.095 60.0667 156.535 61.32C158.375 62.92 159.642 64.3733 160.335 65.68C161.028 66.9867 161.375 68.52 161.375 70.28C161.375 72.5733 160.802 74.3333 159.655 75.56C158.535 76.7867 156.895 77.4 154.735 77.4ZM167.338 53H162.738V49H176.338V53H171.738V77H167.338V53Z"
                      fill="white"
                    />
                  </svg>
                </div>
              </Link>
            </li>
            <li className="hidden md:block">
              <Link
                href={ROUTES.TOURNAMENTS}
                className="text-lg font-bold text-white"
              >
                Tournaments
              </Link>
            </li>
            <li className="hidden md:block">
              <Link
                href={ROUTES.TIER_LISTS}
                className="text-lg font-bold text-white"
              >
                Tier Lists
              </Link>
            </li>
            <li className="hidden items-center space-x-2 md:flex">
              <Link
                href={ROUTES.DAILY_GUESS}
                className="text-lg font-bold text-white"
              >
                Daily Guess
              </Link>
              <span className="rounded-md bg-[#472878] px-2 py-1 text-xs font-bold text-white">
                NEW
              </span>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        {!user ? (
          <div
            onClick={handleLogin}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#1DA1F2] px-4 py-2 font-bold text-white transition hover:bg-[#1A91DA]"
          >
            Sign in with
            <XIcon className="h-5 w-5 fill-white" />
          </div>
        ) : (
          <Button to={ROUTES.MY_ACCOUNT}>My Tier Lists</Button>
        )}
      </div>
    </header>
  )
}
