import { OptionGroup } from './OptionGroup'

export class Product {
  constructor(
    public id: string,
    public name: string,
    public price: number,
    public categoryId: string,
    public status: 'Ativo' | 'Inativo',
    public order: number,
    public createdAt: Date,
    public updatedAt: Date,
    public description?: string,
    public photoUrl?: string
  ) {}

  isActive(): boolean {
    return this.status === 'Ativo'
  }

  getDisplayPrice(): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(this.price)
  }

  async getOptionGroups(): Promise<OptionGroup[]> {
    return OptionGroup.getByProductId(this.id)
  }
}
