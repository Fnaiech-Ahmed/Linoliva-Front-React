export interface Transaction {
    id: number;
    referenceCommande: string;
    referenceLot: string;
    productId: number;
    nomProduit: string;
    prixUnitaire: number;
    quantityEntered: number;
    ptht: number;
    tva: number;
    pttc: number;
    typeTransaction: number;
    remainingQuantity: number;
}
