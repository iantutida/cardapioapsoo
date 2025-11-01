import { supabase } from '@/lib/supabase/server'

export class Coupon {
  constructor(
    public id: string,
    public code: string,
    public discountType: 'percentage' | 'fixed',
    public discountValue: number,
    public status: 'Ativo' | 'Inativo',
    public createdAt: Date,
    public updatedAt: Date
  ) {}

  getDiscountType(): 'percentage' | 'fixed' {
    return this.discountType
  }

  getDiscountValue(): number {
    return this.discountValue
  }

  isActive(): boolean {
    return this.status === 'Ativo'
  }

  calculateDiscount(subtotal: number): number {
    if (this.discountType === 'percentage') {
      const discount = (subtotal * this.discountValue) / 100
      return Math.min(discount, subtotal)
    } else {
      return Math.min(this.discountValue, subtotal)
    }
  }

  getDisplayValue(): string {
    if (this.discountType === 'percentage') {
      return `${this.discountValue}%`
    }
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(this.discountValue)
  }

  static async validate(code: string): Promise<Coupon | null> {
    const { data, error } = await supabase
      .from('coupons')
      .select('*')
      .eq('code', code.toUpperCase().trim())
      .eq('status', 'Ativo')
      .single()

    if (error || !data) {
      return null
    }

    return new Coupon(
      data.id,
      data.code,
      data.discount_type,
      Number(data.discount_value),
      data.status,
      new Date(data.created_at),
      new Date(data.updated_at)
    )
  }
}

