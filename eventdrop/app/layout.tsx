"use client"

import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { FirebaseProvider } from '../components/Context/FirebaseContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Event Drop',
  description: 'Drop tokens & NFTs at events',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <FirebaseProvider>
          {children}
        </FirebaseProvider>
      </body>
    </html>
  )
}
