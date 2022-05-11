import axios from "axios";

export const baseUrl = 'https://bayut.p.rapidapi.com';

export const fetchApi = async (url) => {
    const { data } = await axios.get((url), {
        headers: {
            'x-rapidapi-host': 'bayut.p.rapidapi.com',
            'x-rapidapi-key': '9a958eb62bmshfcfc3e0f87aabcap1176e0jsn7464a731a0fe',
        },
    });

    return data;
}