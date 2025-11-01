'use client'

import Image from 'next/image'

interface StoreConfigData {
  id: string
  name: string
  logoUrl: string | null
  coverUrl: string | null
  description: string | null
  openingHours: string | null
}

interface CoverSectionProps {
  storeConfig: StoreConfigData
}

export function CoverSection({ storeConfig }: CoverSectionProps) {
  return (
    <section className="w-full">
      {storeConfig.coverUrl && (
        <div className="relative w-full h-64 md:h-96">
          <Image
            src={storeConfig.coverUrl}
            alt="Capa do restaurante"
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      {storeConfig.description && (
        <div className="container mx-auto px-4 py-6">
          <p className="text-gray-700 text-center max-w-2xl mx-auto">
            {storeConfig.description}
          </p>
        </div>
      )}
    </section>
  )
}

