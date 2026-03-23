import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import Script from 'next/script';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
        <Script
          src="http://localhost:3000/widget.js"
          data-apppack-key="blx_L2i-2zsxXeLcwR_D6ZYZOethHr4"
          data-apppack-url="http://localhost:3000"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
