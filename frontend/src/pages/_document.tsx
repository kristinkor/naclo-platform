import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Meta Tags */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="NACLO is a contest where middle and high school students solve linguistic puzzles, learning about language diversity and consistency while exercising logic skills."
        />
        <meta
          name="google-site-verification"
          content="lY2bJOg_3a-61Sp6N-s-EHOMqyZXoV5PGwqmjIhMraM"
        />
        <meta name="robots" content="index, follow" />
        <meta
          name="title"
          content="North American Computational Linguistics Open Competition (NACLO)"
        />
        <meta name="language" content="en" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />

        <title>
          NACLO - North American Computational Linguistics Open Competition
        </title>

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/icons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/icons/favicon-16x16.png"
        />
        <link rel="manifest" href="/assets/icons/site.webmanifest" />

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Work+Sans:ital,wght@0,100..900;1,100..900&family=Zen+Dots&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="document">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
