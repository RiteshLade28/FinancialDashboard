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
        <script
          src="https://getblox.app/widget.js"
          data-apppack-key="blx_ZUVBJcjyEmLWDhbWRYfto3yYUmM"
          data-apppack-url="https://getblox.app"
          async
        ></script>
      </body>
    </html>
  );
}
