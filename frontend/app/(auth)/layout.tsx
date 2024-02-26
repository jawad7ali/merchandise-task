import '../globals.css'

export const metadata = {
    title: 'Keycense',
    description: 'Merchandise Store'
  }
  
  export default function AuthLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    )
  }
  