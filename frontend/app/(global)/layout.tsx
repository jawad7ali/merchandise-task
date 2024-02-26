import '../globals.css'
import { Inter } from 'next/font/google'
// import getCurrentUser from '../actions/getCurrentUser'
import ProvidersWrapperLayout from './ProvidersWrapperLayout'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'KeyCense | Home',
  description: 'Home of the best merchandise store',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProvidersWrapperLayout children={children} />
      </body>
    </html>
  )
}
