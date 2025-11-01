export class Option {
  constructor(
    public id: string,
    public name: string,
    public additionalPrice: number,
    public optionGroupId: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}

  getName(): string {
    return this.name
  }

  getAdditionalPrice(): number {
    return this.additionalPrice
  }

  getDisplayPrice(): string {
    if (this.additionalPrice === 0) {
      return 'Grátis'
    }
    return `+${new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(this.additionalPrice)}`
  }
}

