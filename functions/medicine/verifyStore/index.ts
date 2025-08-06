import {
  ParameterFunctionVerifyStore,
  ReturnFunctionVerifyStore,
} from "../../../types/functions/medicine/verifyStore/index.ts";

export default function verifyStore({
  store,
}: ParameterFunctionVerifyStore): ReturnFunctionVerifyStore {
  const Store = store.toLocaleLowerCase();

  const stores = ["araia", "araujo", "paguemenos"];

  const validationStore = stores.find((data) => {
    return data == Store;
  });

  if (validationStore) {
    return {
      error: false,
      message: null,
      data: {
        store: Store,
      },
    };
  } else {
    return {
      error: true,
      message: "Not identify store. Please verify again the payload",
      data: null,
    };
  }
}
