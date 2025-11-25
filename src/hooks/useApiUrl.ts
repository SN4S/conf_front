import { useState, useEffect } from 'react';

export const useApiUrl = () => {
    const [apiUrl, setApiUrl] = useState<string>(() => {
        return localStorage.getItem('apiUrl') || 'https://ap.sn4s.pp.ua';
    });

    useEffect(() => {
        localStorage.setItem('apiUrl', apiUrl);
    }, [apiUrl]);

    return { apiUrl, setApiUrl };
};
