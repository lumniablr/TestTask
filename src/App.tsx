import React, {useEffect, useState} from 'react';
import './App.css';
import {albumAPI, AlbumApiType} from "./API/album-api";
import {Pagination, SelectChangeEvent} from "@mui/material";
import Modal from "./Modal/Modal";
import AlbumSelect from "./Select/AlbumSelect";
import RenderPhoto from "./RenderPhoto/RenderPhoto";


function App() {

    const [initialPhotos, setInitialPhotos] = useState<AlbumApiType[]>([])
    console.log(initialPhotos, 'initial photos')
    //const [loading, setLoading] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [photoURL, setPhotoURL] = useState<string>()
    const [selectedValue, setSelectedValue] = useState<number>(0)
    console.log(selectedValue)
    const [albumId, setAlbumId] = useState<number[]>([])
    console.log(albumId, 'albumId')
    const [filteredById, setFilteredById] = useState<AlbumApiType[]>([])
    console.log(filteredById, 'filtered by id')

    const PER_PAGE = 5;
    const paginateCounter = filteredById.length > 0
        ? filteredById.length
        : initialPhotos.length
    const countPagesNumber = Math.ceil(paginateCounter / PER_PAGE);
    const lastIndex = currentPage * PER_PAGE
    const firstIndex = lastIndex - PER_PAGE
    const currentPhotos = filteredById.length > 0
        ? filteredById.slice(firstIndex, lastIndex)
        : initialPhotos.slice(firstIndex, lastIndex)

    const uniqueAlbumID = (data: AlbumApiType[]) => {
        const AlbumID = Array.from(new Set(data.map(d => d.albumId)))
        setAlbumId(AlbumID)
    }

    useEffect(() => {
        //setLoading(true)
        albumAPI.getAllAlbum()
            .then((res) => {
                    setInitialPhotos(res.data)
                    uniqueAlbumID(res.data)
                }
            )
        //setLoading(false)
    }, [])

    const handleChangePageNumber = (e: React.ChangeEvent<unknown>, p: number) => {
        setCurrentPage(p)
    }

    const handleModalData = (url: string) => {
        setPhotoURL(url)
        setIsOpen(true)
    }

    const deletePhotoItem = (id: number) => {
        let deletedInitialPhotos = initialPhotos.filter((p) => p.id !== id)
        setInitialPhotos(deletedInitialPhotos)
        let deletedFilteredPhotos = filteredById.filter((p) => p.id !== id)
        setFilteredById(deletedFilteredPhotos)
    }

    const handleChangeAlbumId = (event: SelectChangeEvent) => {
        const albumID = +event.target.value
        setSelectedValue(albumID)
        let filteredAlbumID =
            albumID === 999999 //знаю, что так делать нельзя, что в дате может ид альбома таким же, на это есть свои причины
                ? initialPhotos
                : initialPhotos.filter((p) => p.albumId === albumID)
        setFilteredById(filteredAlbumID)
    };

    return (
        <div>
            <AlbumSelect
                selectedValue={selectedValue}
                handleChangeAlbumId={handleChangeAlbumId}
                albumId={albumId}
            />
            <div className="pagination_list">
                <Pagination
                    variant="outlined"
                    shape="rounded"
                    count={countPagesNumber}
                    page={currentPage}
                    onChange={(e, p) => handleChangePageNumber(e, p)}
                />
            </div>
            <Modal
                modalActive={isOpen}
                setModalActive={setIsOpen}
                imgUrl={photoURL}
            />
            <RenderPhoto
                filteredById={filteredById}
                currentPhotos={currentPhotos}
                handleModalData={handleModalData}
                deletePhotoItem={deletePhotoItem}
                selectedValue={selectedValue}
            />
        </div>
    )
}

export default App;


