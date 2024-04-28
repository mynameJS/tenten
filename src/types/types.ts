export type Filter = {
  address: string[];
  startsAtGte: Date | undefined;
  hourlyPayGte: number | string;
};

export type CardItems = {
  items: {
    item: {
      id: string;
      hourlyPay: number;
      startsAt: string;
      workhour: number;
      closed: boolean;
      shop: {
        item: {
          id: string;
          name: string;
          address1: string;
          imageUrl: string;
          originalHourlyPay: number;
        };
      };
    };
  }[];
};

export type EmployeeData = {
  item: {
    user: {
      item: {
        id: string;
        name: string;
        phone: string;
        bio: string;
      };
    };
    id: string;
    status: string;
    shop: {
      item: {
        id: string;
        name: string;
      };
    };
    notice: {
      item: {
        id: string;
        startsAt: string;
        workhour: number;
        hourlyPay: number;
      };
    };
  };
};

export type EmployerData = {
  item: {
    id: string;
    status: string;
    shop: {
      item: {
        id: string;
        name: string;
      };
    };
    user: {
      item: {
        id: string;
        name: string;
        phone: string;
        bio: string;
      };
    };
  };
};
