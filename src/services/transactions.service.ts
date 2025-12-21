import api from "@/api/axiosConfig";
import type { Transaction } from "@/types/transaction";

// 🔥 GET : toutes les transactions
export async function getTransactions(): Promise<Transaction[]> {
    const res = await api.get("/Transaction/GetTransactions");
    return res.data;
}

// 🔥 GET : transactions par référence commande
export async function getTransactionsByReference(
    referenceCommande: string
): Promise<Transaction[]> {
    const res = await api.get(
        `/Transaction/getTransactionbyRef/${referenceCommande}`
    );
    return res.data;
}

// 🔥 GET : transaction par ID
export async function getTransactionById(
    id: number
): Promise<Transaction> {
    const res = await api.get(`/Transaction/GetTransactionById/${id}`);
    return res.data;
}

// 🔥 DELETE : supprimer une transaction
export async function deleteTransaction(id: number): Promise<boolean> {
    const res = await api.delete(`/Transaction/DeleteTransaction/${id}`);
    return res.status === 200;
}
