/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'

const PANELBEAR_CONFIG = {
  site: 'EDTH57eGNsp',
  spaMode: 'history',
  debug: false
}

function getPanelbearScript() {
  if (PANELBEAR_CONFIG.debug) {
    console.warn(
      'Panelbear is running in debug mode, you should probably turn this off for production.'
    )
  }

  return `window.panelbear = window.panelbear || function(){ window.panelbearQ = window.panelbearQ || []; panelbearQ.push(arguments); };
panelbear("config", ${JSON.stringify(PANELBEAR_CONFIG)});
`
}

class AppDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render(): JSX.Element {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#03acbf" />
          <link rel="apple-touch-icon" href="" />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="https://assets.vercel.com/image/upload/q_auto/front/favicon/vercel/152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="https://assets.vercel.com/image/upload/q_auto/front/favicon/vercel/180x180.png"
          />
          <meta property="fb:app_id" content="229332461869949" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://lol-power-ranking.app" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content="https://lol-power-ranking.app" />
          <meta name="twitter:site" content="@a_manaranche" />
          <link rel="manifest" href="/manifest.json" />
          <link
            rel="preload"
            href="/fonts/fira-sans.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="true"
          />
          <link
            rel="preload"
            href="/fonts/merriweather.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="true"
          />
          <script async src="https://cdn.panelbear.com/analytics.js?site=EDTH57eGNsp" />
          <script dangerouslySetInnerHTML={{ __html: getPanelbearScript() }}></script>
          <script
            async
            src="https://cmp.osano.com/169le9SWhqJ5CDSP/d125558d-b1ba-4e3b-a1f2-7fb2afc827d7/osano.js"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default AppDocument
