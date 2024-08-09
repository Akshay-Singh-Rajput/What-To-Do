import axios from "axios";

export const checkBackendHealth = () => {
    return axios.get(`/health`).then(response => {
        console.log('Response:', response);
    }).catch(error => {
        console.error('Error:', error);
    });
};