import type { AppProps } from 'next/app'

import '@prodigy/ui/dist/output.css'
import '../styles/tailwind.css'

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default App
