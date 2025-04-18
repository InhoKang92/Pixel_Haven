import { atom } from "jotai";

import axios from "axios";
import { searchAtom } from "../primitiveAtoms/searchAtom";
import { pageAtom } from "../primitiveAtoms/pageAtom";

//unsplash 오픈 API 호출
const API_URL = "https://api.unsplash.com/search/photos";
const API_KEY = "kQ5AgBHi2sIWEZmbuiFyw2nlwPWBtk7Nsj1fFhNyqWk";
const PER_PAGE = 30;

export const imageData = atom(async (get) => {
    const searchValue = get(searchAtom)
    const pageValue = get(pageAtom)

    try{
        const res = await axios.get(`${API_URL}?query=${searchValue}&client_id=${API_KEY}&page=${pageValue}&per_page=${PER_PAGE}`);
        // console.log(res);
        return res;
    }catch(error){
        console.log(error);
        return null;
    }
})