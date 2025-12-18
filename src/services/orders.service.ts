import api from "@/api/axiosConfig";

export async function fetchOrders() {
    const res = await api.get("/Commande/Get-List-Commandes");
    return res.data;
}
