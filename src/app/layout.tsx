import './globals.css';

export const metadata = {
  title: 'Consultório de Acupuntura',
  description: 'Página para contratar serviços de acupuntura e terapias integrativas',
}

export default function RootLayout({
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
