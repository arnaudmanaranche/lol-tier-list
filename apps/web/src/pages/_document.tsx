import Document, { Head, Html, Main, NextScript } from 'next/document'

class AppDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <meta name="theme-color" content="#03acbf" />
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
          <meta name="twitter:site" content="@bearnais_volant" />
          <link rel="manifest" href="/manifest.json" />
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
