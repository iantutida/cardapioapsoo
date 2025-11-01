import { supabase } from '@/lib/supabase/server'
import { Product } from './Product'

export class Category {
  constructor(
    public id: string,
    public name: string,
    public order: number,
    public active: boolean,
    public createdAt: Date,
    public updatedAt: Date
  ) {}

  isActive(): boolean {
    return this.active
  }

  async hasActiveProducts(): Promise<boolean> {
    const { data, error } = await supabase
      .from('products')
      .select('id')
      .eq('category_id', this.id)
      .eq('status', 'Ativo')
      .limit(1)

    if (error) {
      throw new Error(`Error checking active products: ${error.message}`)
    }

    return (data?.length ?? 0) > 0
  }

  async getProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category_id', this.id)
      .eq('status', 'Ativo')
      .order('order', { ascending: true })

    if (error) {
      throw new Error(`Error fetching products: ${error.message}`)
    }

    return (data ?? []).map(
      (row) =>
        new Product(
          row.id,
          row.name,
          Number(row.price),
          row.category_id,
          row.status,
          row.order ?? 0,
          new Date(row.created_at),
          new Date(row.updated_at),
          row.description ?? undefined,
          row.photo_url ?? undefined
        )
    )
  }

  static async getAllActive(): Promise<Category[]> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('active', true)
      .order('order', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(`Error fetching categories: ${error.message}`)
    }

    return (data ?? []).map(
      (row) =>
        new Category(
          row.id,
          row.name,
          row.order ?? 0,
          row.active,
          new Date(row.created_at),
          new Date(row.updated_at)
        )
    )
  }
}

