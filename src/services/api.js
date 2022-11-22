import axios from "axios";

const SERVER_URL = 'http://localhost:8080/files';

const api = {
    async fetchCategories() {
        try {
            return axios(`${SERVER_URL}/categories.json`);
        }
        catch (error) {
            console.error(error);
        }
    },
    async fetchProducts(id) {
        try {
            return axios(`${SERVER_URL}/products/${id}.json`);
        }
        catch (error) {
            console.error(error);
        }
    },
}

export default api;