import api from "@/api/axiosConfig";

export async function fetchOrders() {
    const res = await api.get("/Commande/Get-List-Commandes");
    return res.data;
}

export async function deleteOrder(orderId: number) {
    const res = await api.delete(`/Commande/delete-Commande/${orderId}`);
    return res.data; 
}

/*export async function updateOrder(
    commandeId: number, 
    commandeDTO: any, 
    transactions: any[]
) {
    const url = `/Commande/update-Commande/${commandeId}`;
    
    console.log("=== DEBUG UPDATE ORDER ===");
    console.log("Command ID:", commandeId);
    console.log("Transactions reçues:", transactions);
    
    // Construire les query params pour les transactions
    const queryParams = transactions.map((tx, index) => {
        const params = [
            `ListTransactions[${index}].Id=${tx.id || 0}`,
            `ListTransactions[${index}].ProductId=${tx.productId || 0}`,
            `ListTransactions[${index}].NomProduit=${encodeURIComponent(tx.nomProduit || "")}`,
            `ListTransactions[${index}].QuantityEntered=${tx.quantityEntered || 1}`,
            `ListTransactions[${index}].PrixUnitaire=${tx.prixUnitaire || 0}`,
            `ListTransactions[${index}].ReferenceCommande=${encodeURIComponent(tx.referenceCommande || "")}`
        ];
        console.log(`Transaction ${index}:`, params.join('&'));
        return params.join('&');
    }).join('&');

    console.log("Query params complets:", queryParams);

    // Convertir le DTO en PascalCase pour correspondre au backend C#
    const backendDTO = {
        NomVendeur: commandeDTO.nomVendeur || "",
        AdresseVendeur: commandeDTO.adresseVendeur || "",
        MFVendeur: commandeDTO.mfVendeur || "",
        GSMVendeur: commandeDTO.gsmVendeur || 0,
        TitreAcheteur: commandeDTO.titreAcheteur || 0,
        NomAcheteur: commandeDTO.nomAcheteur || "",
        AdresseAcheteur: commandeDTO.adresseAcheteur || "",
        MFAcheteur: commandeDTO.mfAcheteur || "",
        GSMAcheteur: commandeDTO.gsmAcheteur || 0,
        ProprietaireId: commandeDTO.proprietaireId || null,
        TVA: commandeDTO.tva || 0,
    };

    const fullUrl = queryParams ? `${url}?${queryParams}` : url;

    console.log("URL FINALE:", fullUrl);
    console.log("Body (DTO):", JSON.stringify(backendDTO, null, 2));
    console.log("========================");

    const res = await api.put(fullUrl, backendDTO);
    return res.data;
}*/

export async function updateOrder(
    commandeId: number,
    commandeDTO: any,
    transactions: any[]
) {
    const url = `/Commande/update-Commande/${commandeId}`;

    console.log("=== DEBUG UPDATE ORDER ===");
    console.log("Command ID:", commandeId);
    console.log("Transactions reçues:", transactions);

    // ✅ CORRECTION ICI : chaque transaction = un JSON encodé sous ListTransactions
    const queryParams = transactions.map(tx => {
        const txForBackend = {
            id: tx.id ?? 0,
            referenceCommande: tx.referenceCommande || "",
            referenceLot: tx.referenceLot || "Néant",
            productId: tx.productId || 0,
            nomProduit: tx.nomProduit || "",
            prixUnitaire: tx.prixUnitaire || 0,
            quantityEntered: tx.quantityEntered || 1,
            ptht: tx.ptht || 0,
            tva: tx.tva || 0,
            pttc: tx.pttc || 0,
            typeTransaction: tx.typeTransaction || 1,
            remainingQuantity: tx.remainingQuantity || 0
        };

        const jsonStr = JSON.stringify(txForBackend);
        const encoded = encodeURIComponent(jsonStr);
        console.log("Transaction encodée:", jsonStr);
        return `ListTransactions=${encoded}`;
    }).join('&');

    console.log("Query params complets:", queryParams);

    // DTO en PascalCase
    const backendDTO = {
        ReferenceCommande: commandeDTO.ReferenceCommande || "",
        NomVendeur: commandeDTO.nomVendeur || "",
        AdresseVendeur: commandeDTO.adresseVendeur || "",
        MFVendeur: commandeDTO.mfVendeur || "",
        GSMVendeur: commandeDTO.gsmVendeur || 0,
        TitreAcheteur: commandeDTO.titreAcheteur || 0,
        NomAcheteur: commandeDTO.nomAcheteur || "",
        AdresseAcheteur: commandeDTO.adresseAcheteur || "",
        MFAcheteur: commandeDTO.mfAcheteur || "",
        GSMAcheteur: commandeDTO.gsmAcheteur || 0,
        ProprietaireId: commandeDTO.proprietaireId || null,
        TVA: commandeDTO.tva || 0,
    };

    const fullUrl = queryParams ? `${url}?${queryParams}` : url;

    console.log("URL FINALE:", fullUrl);
    console.log("Body (DTO):", JSON.stringify(backendDTO, null, 2));
    console.log("========================");

    const res = await api.put(fullUrl, backendDTO);
    return res.data;
}