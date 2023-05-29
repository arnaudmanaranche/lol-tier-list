import type { AppProps } from 'next/app'

import '@lpr/ui/dist/output.css'
import '../styles/tailwind.css'

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default App
