import axios from 'axios';
import { apiBaseUrl } from 'config';

const _token = window.localStorage.getItem("token");

const instance = axios.create({
    baseURL: apiBaseUrl,
    headers: {
        'content-type':'application/json',
        'Authorization': `Bearer ${_token}`
    },
});

export default {
    get: (url: string, params:any = '') =>
        instance({
            method:'GET',
            url,
            params,
        }),
    post: (url: string, data: any) =>
        instance({
            method: 'POST',
            url,
            data
        }),
    put: (url: string, data: any) =>
        instance({
            method: 'PUT',
            url,
            data
        }),
    patch: (url: string, data: any) =>
        instance({
            method: 'PATCH',
            url,
            data
        }),
    delete: (url: string, data: any) =>
        instance({
            method: 'DELETE',
            url,
            data
        }),
}