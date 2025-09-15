import Document, { Head, Html, Main, NextScript } from 'next/document'
import Script from 'next/script'

class AppDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="icon"
            type="image/png"
            href="/favicon-96x96.png"
            sizes="96x96"
          />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <meta name="apple-mobile-web-app-title" content="Begintrips" />
          <link rel="manifest" href="/site.webmanifest" />
          <Script
            src="https://analytics.ahrefs.com/analytics.js"
            data-key="KlczvsyN9AlO57BGXL30+w"
            async
          />
        </Head>
        <body className="bg-gunmetalDark antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default AppDocument
