export interface IClientInfoData {
  client: {
    requires_two_factor: boolean,
    two_factor_secret: string,
    email: string,
  };
  addresses: {
    // tslint:disable-next-line:no-reserved-keywords
    type: 'City' | 'Country' | 'Street Address 1' | 'Street Address 2' | 'Postcode' | 'Main Phone',
    label: string | null,
  }[];
  contact: {
    fullname: string;
  };
  entity: {
    trading_code: string,
    name: string,
  };
}

type TClientInfoAddressItem = {
  itemType: 'City' | 'Country' | 'Street Address 1' | 'Street Address 2' | 'Postcode' | 'Main Phone';
  label: string | null;
};

export type TClientInfo = {
  requiresTwoFactor: boolean;
  twoFactorSecret: string;
  email: string;
  fullName: string;
  contactInfo: TClientInfoAddressItem[];
};

// tslint:disable-next-line:export-name
export const clientInfoMapFrom = (data: IClientInfoData): TClientInfo => {
  return {
    requiresTwoFactor: data.client.requires_two_factor,
    twoFactorSecret: data.client.two_factor_secret,
    email: data.client.email,
    fullName: data.contact.fullname,
    contactInfo: data.addresses.map(item => ({
      itemType: item.type,
      label: item.label,
    })),
  };
};
