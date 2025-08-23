interface ParameterFunctionSearchProduct {
  product: null | string;
}

interface ReturnFunctionSearchProduct {
  products?: Array<DetailsProducts> | null | undefined | boolean | string;
  error: boolean;
  lote: string | null | undefined | boolean;
  message: null | string;
}

type DetailsProducts = {
  lote?: string | null;
  title?: string | null;
  description?: string | null;
  value?: number | null;
  images?: any[] | null;
  link?: string | null;
};

interface ReturnAPIBrowserlessLinksMedicine {
  data: Datum[];
}

interface Datum {
  results: Result[];
  selector: string;
}

interface Result {
  attributes: [{ name: string; value: string }];
  height: number;
  html: string;
  left: number;
  text: string;
  top: number;
  width: number;
}

type ParametersCatchInfoMedicine = {
  listMedicine: Array<{ name: string; value: string }>;
}

interface ReturnAPIBrowserlessInfoMedicine {
  data: Datum[];
}

interface Datum {
  results: Result[];
  selector: string;
}

interface Result {
  height: number;
  html: string;
  left: number;
  text: string;
  top: number;
  width: number;
}


export type {
  ParameterFunctionSearchProduct,
  ReturnFunctionSearchProduct,
  ReturnAPIBrowserlessLinksMedicine,
  ReturnAPIBrowserlessInfoMedicine,
  ParametersCatchInfoMedicine,
};
