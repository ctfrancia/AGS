export interface Policy {
    id: string,
    amountInsured: number,
    email: string,
    inceptionDate: string,
    installmentPayment: boolean,
    clientId: string,
}

export interface PolicyResponse {
    policies: Policy[],
}