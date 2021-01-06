import NextDocument, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
} from 'next/document'
import React from "react";

export default class Document extends NextDocument {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await NextDocument.getInitialProps(ctx)
        return {...initialProps}
    }

    render() {
        return (
            <Html lang="th">
                <Head>
                    <link
                        rel="preload"
                        href="/assets/fonts/Inter/Inter-roman.var.woff2?3.13"
                        as="font"
                        type="font/woff2"
                        crossOrigin="true"
                    />
                    <meta charSet="utf-8" />
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}