import api from "@/api/axiosConfig";

export interface Transaction {
    productId: number;
    nomProduit: string;
    prixUnitaire: number;
    quantityEntered: number;
    ptht: number;
    tva: number;
    pttc: number;
}

export interface CreateCommandeRequest {
    nomVendeur: string;
    adresseVendeur: string;
    mfVendeur: string;

    nomAcheteur: string;
    adresseAcheteur: string;
    mfAcheteur: string;
}

const buildTransactionsQuery = (transactions: Transaction[]) => {
    const params = new URLSearchParams();

    transactions.forEach((t, i) => {
        params.append(`ListTransactions[${i}].ProductId`, String(t.productId));
        params.append(`ListTransactions[${i}].NomProduit`, t.nomProduit);
        params.append(`ListTransactions[${i}].PrixUnitaire`, String(t.prixUnitaire));
        params.append(`ListTransactions[${i}].QuantityEntered`, String(t.quantityEntered));
        params.append(`ListTransactions[${i}].PTHT`, String(t.ptht));
        params.append(`ListTransactions[${i}].TVA`, String(t.tva));
        params.append(`ListTransactions[${i}].PTTC`, String(t.pttc));
        params.append(`ListTransactions[${i}].TypeTransaction`, "1");
    });

    return params.toString();
};
const API_URL = import.meta.env.VITE_BACKEND_URL;
export async function createCommande(
    body: CreateCommandeRequest,
    transactions: Transaction[]
) {
    const qs = buildTransactionsQuery(transactions);

    const res = await api.post(
        `/Commande/Create-Commande?${qs}`,
        body
    );

    return res.data;
}
