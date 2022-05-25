/* eslint-disable @next/next/next-script-for-ga */
// eslint-disable-next-line @next/next/no-document-import-in-page
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx)
		return { ...initialProps }
	}

	render() {
		return (
			<Html>
				<Head>
					<link
						href="https://cdn.sanity.io/"
						rel="dns-prefetch"
					></link>
					<link href="https://cdn.sanity.io/" rel="preconnect" />
					<link
						href="https://www.googletagmanager.com"
						rel="dns-prefetch"
					/>
					<link
						href="https://www.googletagmanager.com"
						rel="preconnect"
					/>
					<link
						href="https://www.google-analytics.com"
						rel="dns-prefetch"
					/>
					<link
						href="https://www.google-analytics.com"
						rel="preconnect"
					/>
					<link
						href="https://connect.facebook.net"
						rel="dns-prefetch"
					/>
					<link
						href="https://connect.facebook.net"
						rel="preconnect"
					/>
					<script
						defer
						src="https://www.google-analytics.com/analytics.js"
					></script>
					<script
						async
						src="https://www.googletagmanager.com/gtag/js?id=G-7YE589QRV1"
					></script>
					<meta
						name="google-site-verification"
						content="64NCVujurs1DPgIl3hCk9uJKu10cMG3Ww1e2LEzdNUs"
					/>
					<script
						dangerouslySetInnerHTML={{
							__html: `
							window.dataLayer = window.dataLayer || [];
							function gtag(){dataLayer.push(arguments);}
							gtag('js', new Date());
							
							gtag('config', 'G-7YE589QRV1');
							`
						}}
					></script>
					<link
						href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/4.0.0/github-markdown.min.css"
						rel="stylesheet"
					/>
					<link
						href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/atom-one-dark.min.css"
						rel="stylesheet"
					/>
					<link rel="icon" type="image/x-icon" href="/favicon.ico" />
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
