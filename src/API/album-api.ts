import axios from "axios";

export type AlbumApiType = {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string
}

const instance = axios.create({
    baseURL: "http://jsonplaceholder.typicode.com/",
    responseType: "json"

});

export const albumAPI = {
    getAllAlbum() {
        return instance.get<AlbumApiType[]>('photos')
    },
}


