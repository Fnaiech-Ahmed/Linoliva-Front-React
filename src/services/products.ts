import api from "@/api/axiosConfig";
import {Product} from "@/types/Product.ts";


export async function fetchProducts() {
    const response = await api.get("/Product/externe-get-list-products");
    return response.data;
}

export async function getProducts() {
    const res = await api.get("/Product/externe-get-list-products");
    return res.data;
}

export async function addProduct(product: any) {
    const res = await api.post("/Product/add-product", product);
    return res.data;
}

export async function updateProduct(id: number, product: any) {
    const res = await api.put(`/Product/update-product/${id}`, product);
    return res.data;
}

export async function deleteProduct(id: number) {
    const res = await api.delete(`/Product/delete-product/${id}`);
    return res.data;
}


