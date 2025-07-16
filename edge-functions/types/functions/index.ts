interface ParametersQueriesMedicine {
    store?: string;
    product?:string;
}

interface ParameterFunctionScrapingMedicine {
    product: string | null
}

export type {
    ParametersQueriesMedicine,
    ParameterFunctionScrapingMedicine
}