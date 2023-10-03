'use client'

import Image from 'next/image'
import NavbarDefault from '@/app/components/header'
import Footer from '@/app/components/footer'
import MapComponent from '@/app/components/mainMap'
import React, { useEffect } from 'react';

export default function Page() {

  return (
    <main className="min-h-screen bg-background-globe bg-cover bg-center">
      <div className="hidden md:block">
        <MapComponent />
      </div>
    </main>
  )
}
