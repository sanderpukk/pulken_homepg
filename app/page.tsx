import Image from 'next/image'
import NavbarDefault from '@/app/components/header'
import Footer from '@/app/components/footer'
import MainPage from './components/mainPage'


export default function Home() {
  return (
    <main className="min-h-screen bg-background-globe bg-cover bg-center">
      <NavbarDefault></NavbarDefault>
      <MainPage></MainPage>
      <Footer></Footer>
    </main>
  )
}
