import { Geist } from 'next/font/google'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { preconnect } from 'react-dom'
import VisualEditing from '@/ui/modules/visual-editing'
import '@/app.css'

const fontSans = Geist({
	subsets: ['latin'],
})

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	preconnect('https://cdn.sanity.io')

	return (
		<html lang="en" data-scroll-behavior="smooth">
			<head>
				<meta name="facebook-domain-verification" content="sg4hflggopy1vznwdko8j9i7ucz1g0" />
				<script
					dangerouslySetInnerHTML={{
						__html: `(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "45hqenq9ef");`,
					}}
				/>
				<script
					dangerouslySetInnerHTML={{
						__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-K5WCC2R');`,
					}}
				/>
			</head>
			<NuqsAdapter>
				<body className={`${fontSans.className} bg-background text-foreground antialiased`}>
					<noscript>
						<iframe
							title="gtm"
							src="https://www.googletagmanager.com/ns.html?id=GTM-K5WCC2R"
							height="0"
							width="0"
							style={{ display: 'none', visibility: 'hidden' }}
						/>
					</noscript>
					<main>{children}</main>

					<VisualEditing />
				</body>
			</NuqsAdapter>
		</html>
	)
}
