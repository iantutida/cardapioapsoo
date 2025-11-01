'use client'

import { useState } from 'react'
import { Category } from '@/src/domain/entities/Category'
import { Product } from '@/src/domain/entities/Product'
import { StoreConfig } from '@/src/domain/entities/StoreConfig'
import { CartItem } from '@/src/types/cart'
import { Header } from '@/src/components/menu/Header'
import { CoverSection } from '@/src/components/menu/CoverSection'
import { CategoryNavigation } from '@/src/components/menu/CategoryNavigation'
import { MenuContent } from '@/src/components/menu/MenuContent'
import { LoadingIndicator } from '@/src/components/menu/LoadingIndicator'
import { ProductDetailModal } from '@/src/components/menu/ProductDetailModal'
import { FloatingCartButton } from '@/src/components/menu/FloatingCartButton'
import { CartModal } from '@/src/components/menu/CartModal'

interface MenuPageClientProps {
  categories: Category[]
  categoryProducts: Map<string, Product[]>
  storeConfig: StoreConfig
}

export function MenuPageClient({
  categories,
  categoryProducts,
  storeConfig,
}: MenuPageClientProps) {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [isCartModalOpen, setIsCartModalOpen] = useState(false)
  const [editItem, setEditItem] = useState<CartItem | null>(null)

  const handleProductClick = (productId: string) => {
    setSelectedProductId(productId)
    setEditItem(null)
    setIsProductModalOpen(true)
  }

  const handleCloseProductModal = () => {
    setIsProductModalOpen(false)
    setSelectedProductId(null)
    setEditItem(null)
  }

  const handleEditItem = (item: CartItem) => {
    setSelectedProductId(item.productId)
    setEditItem(item)
    setIsCartModalOpen(false)
    setIsProductModalOpen(true)
  }

  return (
    <>
      <Header storeConfig={storeConfig} />
      <CoverSection storeConfig={storeConfig} />
      <CategoryNavigation categories={categories} />
      <MenuContent
        categories={categories}
        categoryProducts={categoryProducts}
        onProductClick={handleProductClick}
      />
      <FloatingCartButton onClick={() => setIsCartModalOpen(true)} />
      <ProductDetailModal
        productId={selectedProductId}
        isOpen={isProductModalOpen}
        onClose={handleCloseProductModal}
        onProductLoad={() => {}}
        editItem={editItem}
      />
      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
        onEditItem={handleEditItem}
      />
    </>
  )
}
