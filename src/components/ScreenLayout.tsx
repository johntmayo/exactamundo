import type { ReactNode } from 'react'

interface ScreenLayoutProps {
  children: ReactNode
}

export default function ScreenLayout({ children }: ScreenLayoutProps) {
  return <main className="screen">{children}</main>
}
