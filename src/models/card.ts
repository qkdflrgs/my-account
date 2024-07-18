type Promotion = {
  title: string
  terms: string
}

export interface Card {
  name: string
  corpName: string
  tags: string[]
  benefit: string[]
  promotion?: Promotion
  payback?: string
}
