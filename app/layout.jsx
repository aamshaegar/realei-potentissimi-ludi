import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "next-themes";
import NextTopLoader from "nextjs-toploader";
import NavBar from "@/components/NavBar";
import ThemeToggle from "@/components/ThemeToggle";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

// export const metadata = {
// 	title: "Realei – Notte dei Ricercatori",
// 	description: "Scopri eventi, attività e iniziative della Notte dei Ricercatori.",
// 	applicationName: "realei-notte-ricercatori",
// 	manifest: "/manifest.webmanifest",
// 	themeColor: "#000000",
// 	appleWebApp: {
// 		capable: true,
// 		statusBarStyle: "default",
// 		title: "Realei – Notte dei Ricercatori",
// 	},
// };

// export const viewport = {
// 	width: "device-width",
// 	initialScale: 1,
// 	viewportFit: "cover",
// };

export default function RootLayout({ children }) {
	return (
		<html
			lang="it"
			suppressHydrationWarning
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col">
				<ThemeProvider
					attribute="class"
					defaultTheme="system	"
					enableSystem
				// disableTransitionOnChange
				>
					<NextTopLoader
						color="#000000"
						initialPosition={0.08}
						crawlSpeed={200}
						height={3}
						crawl
						showSpinner={false}
						easing="ease"
						speed={200}
					/>

					<NavBar />
					<ThemeToggle />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
