interface ParameterFunctionVerifyStore {
    store: string;
}

interface ReturnFunctionVerifyStore {
  error: boolean;
  message: null | string;
  data: null | ReturnFunctionVerifyStoreData;
}

type ReturnFunctionVerifyStoreData = {
  store: string;
}

export type {
    ParameterFunctionVerifyStore,
    ReturnFunctionVerifyStore,
}