interface ParameterFunctionSearchProduct {
    store: null | string | undefined;
    product: null | string;
}

interface ReturnFunctionSearchProduct {
    products?: Array<DetailsProducts> | null | undefined | boolean | string;
    error: boolean;
    lote: string | null | undefined | boolean;
    message: null | string;
}

type DetailsProducts = {
    lote?: string | null,
    title?: string | null,
    description?: string | null,
    value?: number | null,
    images?: any[] | null,
    link?: string | null,
}

export type {
    ParameterFunctionSearchProduct,
    ReturnFunctionSearchProduct,
}