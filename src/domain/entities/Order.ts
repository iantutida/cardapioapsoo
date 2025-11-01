import { CartItem } from '@/src/types/cart'
import { supabase } from '@/lib/supabase/client'

export interface CustomerInfo {
  name?: string
  phone?: string
  tableNumber?: number
}

export class Order {
  constructor(
    public id: string,
    public orderType: 'Retirada' | 'Consumo no Local',
    public customerName: string | null,
    public customerPhone: string | null,
    public tableNumber: number | null,
    public status: 'Recebido' | 'Em Preparo' | 'Pronto',
    public subtotal: number,
    public discount: number,
    public total: number,
    public couponCode: string | null,
    public createdAt: Date,
    public updatedAt: Date
  ) {}

  getStatus(): string {
    return this.status
  }

  getTotal(): number {
    return this.total
  }

  getOrderType(): 'Retirada' | 'Consumo no Local' {
    return this.orderType
  }

  static async create(
    cartItems: CartItem[],
    customerInfo: CustomerInfo,
    orderType: 'Retirada' | 'Consumo no Local',
    appliedCoupon: { code: string; discountType: string; discountValue: number } | null
  ): Promise<Order> {
    if (cartItems.length === 0) {
      throw new Error('Carrinho vazio')
    }

    const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0)
    const discount = appliedCoupon
      ? appliedCoupon.discountType === 'percentage'
        ? (subtotal * appliedCoupon.discountValue) / 100
        : appliedCoupon.discountValue
      : 0
    const total = Math.max(0, subtotal - discount)

    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('TIMEOUT')), 30000)
    })

    const createOrderPromise = async (): Promise<Order> => {
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          order_type: orderType,
          customer_name: orderType === 'Retirada' ? customerInfo.name : null,
          customer_phone: orderType === 'Retirada' ? customerInfo.phone : null,
          table_number: orderType === 'Consumo no Local' ? customerInfo.tableNumber : null,
          status: 'Recebido',
          subtotal,
          discount,
          total,
          coupon_code: appliedCoupon?.code || null,
        })
        .select()
        .single()

      if (orderError || !orderData) {
        throw new Error(`Erro ao criar pedido: ${orderError?.message || 'Erro desconhecido'}`)
      }

      const order = new Order(
        orderData.id,
        orderData.order_type,
        orderData.customer_name,
        orderData.customer_phone,
        orderData.table_number,
        orderData.status,
        Number(orderData.subtotal),
        Number(orderData.discount),
        Number(orderData.total),
        orderData.coupon_code,
        new Date(orderData.created_at),
        new Date(orderData.updated_at)
      )

      for (const cartItem of cartItems) {
        const { data: itemData, error: itemError } = await supabase
          .from('order_items')
          .insert({
            order_id: order.id,
            product_id: cartItem.productId,
            product_name: cartItem.productName,
            product_price: cartItem.productPrice,
            quantity: cartItem.quantity,
            notes: cartItem.notes || null,
            total_price: cartItem.totalPrice,
          })
          .select()
          .single()

        if (itemError || !itemData) {
          await supabase.from('orders').delete().eq('id', order.id)
          throw new Error(`Erro ao criar item: ${itemError?.message || 'Erro desconhecido'}`)
        }

        if (cartItem.selectedOptions.length > 0) {
          for (const option of cartItem.selectedOptions) {
            const { error: optionError } = await supabase
              .from('order_item_options')
              .insert({
                order_item_id: itemData.id,
                option_group_id: option.optionGroupId,
                option_group_name: option.optionGroupName,
                option_id: option.optionId,
                option_name: option.optionName,
                additional_price: option.additionalPrice,
              })

            if (optionError) {
              await supabase.from('orders').delete().eq('id', order.id)
              throw new Error(`Erro ao criar opcional: ${optionError.message}`)
            }
          }
        }
      }

      return order
    }

    try {
      const order = await Promise.race([createOrderPromise(), timeoutPromise])
      return order
    } catch (error) {
      if (error instanceof Error && error.message === 'TIMEOUT') {
        throw new Error('TIMEOUT')
      }
      throw error
    }
  }
}
