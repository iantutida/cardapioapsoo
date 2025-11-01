import { supabase } from '@/lib/supabase/server'
import { Option } from './Option'

export class OptionGroup {
  constructor(
    public id: string,
    public name: string,
    public selectionType: 'single' | 'multiple',
    public createdAt: Date,
    public updatedAt: Date
  ) {}

  getName(): string {
    return this.name
  }

  getSelectionType(): 'single' | 'multiple' {
    return this.selectionType
  }

  async getOptions(): Promise<Option[]> {
    const { data, error } = await supabase
      .from('options')
      .select('*')
      .eq('option_group_id', this.id)
      .order('name', { ascending: true })

    if (error) {
      throw new Error(`Error fetching options: ${error.message}`)
    }

    return (data ?? []).map(
      (row) =>
        new Option(
          row.id,
          row.name,
          Number(row.additional_price),
          row.option_group_id,
          new Date(row.created_at),
          new Date(row.updated_at)
        )
    )
  }

  static async getByProductId(productId: string): Promise<OptionGroup[]> {
    const { data, error } = await supabase
      .from('product_option_links')
      .select('option_group_id, option_groups(*)')
      .eq('product_id', productId)

    if (error) {
      throw new Error(`Error fetching option groups: ${error.message}`)
    }

    if (!data || data.length === 0) {
      return []
    }

    return data
      .map((row: any) => {
        const group = row.option_groups
        if (!group) return null
        return new OptionGroup(
          group.id,
          group.name,
          group.selection_type,
          new Date(group.created_at),
          new Date(group.updated_at)
        )
      })
      .filter((group): group is OptionGroup => group !== null)
  }
}

