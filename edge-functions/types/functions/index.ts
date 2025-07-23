interface ParametersQueriesMedicine {
  store?: string;
  product?: string;
}

interface ParameterFunctionScrapingMedicine {
  product: string | null;
}

interface ParameterFunctionFindLote {
  lote: string | null;
}

interface ReturnFunctionFindLote {
  medicines: FindLote | false;
}

type FindLote = {
  lote?: string | null | undefined;
  title?: string | null | undefined;
  description?: string | null | undefined;
  value?: string | null | undefined;
  images?: any[];
  link?: string | null | undefined;
};

export type {
  ParametersQueriesMedicine,
  ParameterFunctionScrapingMedicine,
  ParameterFunctionFindLote,
  ReturnFunctionFindLote,
};
