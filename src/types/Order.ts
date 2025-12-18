export interface Order {
    id: number;
    referenceCommande: string;
    nomVendeur: string;
    adresseVendeur: string;
    mfVendeur: string;
    gsmVendeur: number;
    proprietaireId?: number;

    titreAcheteur: number;
    nomAcheteur: string;
    adresseAcheteur: string;
    mfAcheteur: string;
    gsmAcheteur: number;

    listIdsTransactions: number[];

    montantTotalHT: number;
    tva: number;
    montantTotalTTC: number;
}
