import Image from 'next/image'
import { Landing } from './landing'
import { Header } from '@/components/header'

export default function Home() {
  return (
    <>
      <Header />
      <Landing />
    </>
  )
}
