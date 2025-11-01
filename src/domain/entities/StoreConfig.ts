import { supabase } from '@/lib/supabase/server'

export class StoreConfig {
  constructor(
    public id: string,
    public name: string,
    public logoUrl: string | null,
    public coverUrl: string | null,
    public description: string | null,
    public openingHours: string | null,
    public createdAt: Date,
    public updatedAt: Date
  ) {}

  getLogoUrl(): string | null {
    return this.logoUrl
  }

  getCoverUrl(): string | null {
    return this.coverUrl
  }

  getName(): string {
    return this.name
  }

  getDescription(): string | null {
    return this.description
  }

  getOpeningHours(): string | null {
    return this.openingHours
  }

  static async getSettings(): Promise<StoreConfig> {
    const { data, error } = await supabase
      .from('store_settings')
      .select('*')
      .limit(1)
      .single()

    if (error) {
      throw new Error(`Error fetching store settings: ${error.message}`)
    }

    if (!data) {
      throw new Error('Store settings not found')
    }

    return new StoreConfig(
      data.id,
      data.name,
      data.logo_url ?? null,
      data.cover_url ?? null,
      data.description ?? null,
      data.opening_hours ?? null,
      new Date(data.created_at),
      new Date(data.updated_at)
    )
  }
}

