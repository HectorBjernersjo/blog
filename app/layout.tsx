import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetBrainsMono = JetBrains_Mono({
	weight: ['400', '500', '800'],
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: "Hectors dev blog",
	description: "",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={jetBrainsMono.className}>
				{children}
			</body>

		</html>
	);
}
