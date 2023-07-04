import { InformationCircleIcon } from '@heroicons/react/24/outline'

import TernoaLogo from '../assets/ternoa.svg'

export default function HomePage() {
  return (
    <div className="relative  z-10  min-h-screen bg-gradient-to-t from-stone-900 via-indigo-900 to-indigo-500 text-white">
      <svg
        className="absolute inset-0 -z-10 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="1440"
        height="560"
        preserveAspectRatio="none"
        viewBox="0 0 1440 560"
      >
        <g fill="none">
          <rect width="1440" height="560" x="0" y="0"></rect>
          <path
            d="M1153.35-63.29C963.55-38.26 853.74 397.59 542.64 398.7 231.55 399.81 94.52 178.2-68.06 174.7"
            stroke="#cececf29"
            stroke-width="1"
          ></path>
          <path
            d="M657.97-40.6C563.86-16.69 621.4 223.58 389.33 239.89 157.25 256.2-5.94 422.13-147.96 424.69"
            stroke="#cececf29"
            stroke-width="1"
          ></path>
          <path
            d="M581.99-105.63C458.41-31.47 530.98 388.81 299.71 397 68.43 405.19-120.09 269.01-264.86 268.2"
            stroke="#cececf29"
            stroke-width="1"
          ></path>
          <path
            d="M1244.85-1.47C1086.84 41.66 1045.42 470.52 800.95 480.39 556.48 490.26 579 410.39 357.05 410.39 135.1 410.39 25.5 480.18-86.85 480.39"
            stroke="#cececf29"
            stroke-width="1"
          ></path>
          <path
            d="M1058.86-59.71C903.57-50.09 808.28 230.93 513.27 239.68 218.25 248.43 109.2 389.49-32.33 390.88"
            stroke="#cececf29"
            stroke-width="1"
          ></path>
        </g>
      </svg>
      <div className="mx-auto max-w-7xl pt-9">
        <header className="flex justify-between">
          <div className="flex">
            <h1 className="font-bold md:flex-1 md:text-3xl lg:flex-none">WinnerPredictions</h1>
          </div>
        </header>
        <div className="mt-20 flex items-center justify-center text-orange-200">
          <InformationCircleIcon className="mr-2 h-5 w-5" />
          <span className="text-xl">Coming soon</span>
        </div>
        <h2 className="mx-auto mt-20 max-w-7xl text-center text-9xl">
          Predict, Win, <br /> and Mint your <br /> Soulbound Token
        </h2>
        <div className="mx-auto mt-20 flex flex-col items-center text-center text-xl">
          <span>Build on top of the Ternoa chain</span> <TernoaLogo className="mt-10 h-20 w-20" />
        </div>
      </div>
    </div>
  )
}
