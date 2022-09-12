import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='ID'>
      <Head>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;500;600;700&family=Roboto:ital,wght@0,300;1,400&display=swap" rel="stylesheet" />
             <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}