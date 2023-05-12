import Document, { Head, Html, Main, NextScript } from "next/document"

import { AppConfig } from "@/utils/AppConfig"

// Need to create a custom _document because i18n support is not compatible with `next export`.
class MyDocument extends Document {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Html lang={AppConfig.locale}>
        <Head>
          <link rel="stylesheet" href="https://use.typekit.net/cmb6fbq.css" />
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-583M58GF2E"
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
			  window.dataLayer = window.dataLayer || [];
			  function gtag(){dataLayer.push(arguments);}
			  gtag('js', new Date());
			  gtag('config', 'G-583M58GF2E', {
				page_path: window.location.pathname,
			  });
			`
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
