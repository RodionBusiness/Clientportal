export interface IBalanceHistoryCollectionItemData {
  EUR: number;
  GBP: number;
  SEK: number;
  JPY: number;
  settlement_date: string;
  usd_equiv: number;
}

export interface IBalanceHistoryCollectionItemModel {
  EUR: number;
  GBP: number;
  SEK: number;
  JPY: number;
  settlementDate: string;
  usdEquivalent: number;
}

export const balanceHistoryCollectionMapFrom = (
  data: IBalanceHistoryCollectionItemData,
): IBalanceHistoryCollectionItemModel => {
  return {
    EUR: data.EUR,
    GBP: data.GBP,
    SEK: data.SEK,
    JPY: data.JPY,
    settlementDate: data.settlement_date,
    usdEquivalent: data.usd_equiv,
  };
};
