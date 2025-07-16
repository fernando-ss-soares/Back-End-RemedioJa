interface ParameterFunctionSearchProduct {
    store: null | string | undefined;
    product: null | string;
}

interface ReturnFunctionSearchProduct {
    products?: Array<DetailsProducts> | null | undefined;
    error: boolean;
    message: null | string;
}

type DetailsProducts = {
    name: string | null;
    description: string | null;
    value: number | null;
    image: string | null;
}

export type {
    ParameterFunctionSearchProduct,
    ReturnFunctionSearchProduct,
}