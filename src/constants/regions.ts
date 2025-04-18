export const REGIONS = {
    UKRAINE: {
        id: 'ukraine',
        currency: 'UAH',
        name: 'Украина'
    },
    TURKEY: {
        id: 'turkey',
        currency: 'TRY',
        name: 'Турция'
    }
} as const;

export type RegionCurrency = typeof REGIONS[keyof typeof REGIONS]['currency']; 