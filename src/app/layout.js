import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from "./providers";
import NextTopLoader from 'nextjs-toploader';
import Search from '@/components/search/Search'
import GoToTop from '@/components/GoToTop';
import localFont from 'next/font/local';
import Footer from '@/components/Footer';
import Script from "next/script";

const inter = Inter({ subsets: ['latin'] })
const myfont = localFont({ src: "../static-fonts/28 Days Later.ttf" })

const APP_NAME = "Bertoo";
const APP_DEFAULT_TITLE = "Bertoo.pro - Watch Anime Online";
const APP_DESCRIPTION = "Explore a vast collection of anime on Bertoo.pro, your go-to destination for streaming the latest and classic anime series. Immerse yourself in captivating storylines, vibrant animation, and diverse genres. Discover a world of entertainment at your fingertips with Bertoo.pro, where every episode is an adventure.";

export const metadata = {
  metadataBase: new URL('https://bertoo.pro'),
  applicationName: APP_NAME,
  title: APP_DEFAULT_TITLE,
  description: APP_DESCRIPTION,
  keywords: [
    'anime',
    'trending anime',
    'watch anime subbed',
    'watch anime dubbed',
    'latest anime episodes',
    'anime streaming sub',
    'anime streaming dub',
    'subbed anime online',
    'dubbed anime online',
    'new anime releases',
    'watch anime sub and dub',
    'anime episodes subtitles',
    'english dubbed anime',
    'subbed and dubbed series',
    'anime series updates',
    'anime episodes english sub',
    'anime episodes english dub',
    'latest subbed anime',
    'latest dubbed anime',
    'subbed anime streaming',
    'dubbed anime streaming',
    'Bertoo.pro latest anime',
  ],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: APP_DEFAULT_TITLE,
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: APP_DEFAULT_TITLE,
    description: APP_DESCRIPTION,
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className='dark text-foreground bg-background'>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-W661D2QCV3"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-W661D2QCV3');`}
      </Script>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <script src="https://kit.fontawesome.com/c189d5d7c5.js" crossOrigin="anonymous" async></script>
      </head>
      <body className={inter.className}>
        <Providers>
          <NextTopLoader color="#CA1313" className="z-[99999]" />
          <Search />
          {children}
          <GoToTop />
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
