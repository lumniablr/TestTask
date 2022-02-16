import React, {useEffect, useState} from 'react';
import './App.css';
import {albumAPI, AlbumApiType} from "./API/album-api";
import {Pagination, SelectChangeEvent} from "@mui/material";
import Modal from "./Modal/Modal";
import AlbumSelect from "./Select/AlbumSelect";
import RenderPhoto from "./RenderPhoto/RenderPhoto";
import CustomPagination from "./CustomPagination/CustomPagination"


function App() {

    const [initialPhotos, setInitialPhotos] = useState<AlbumApiType[]>([])
    //const [loading, setLoading] = useState<boolean>(false)
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectedValue, setSelectedValue] = useState<number | string>(0)
    const [albumId, setAlbumId] = useState<number[]>([])
    const [filteredById, setFilteredById] = useState<AlbumApiType[]>([])
    const [currentItem, setCurrentItem] = useState<AlbumApiType | undefined>({} as AlbumApiType)

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
                    setSelectedValue(res.data[0].albumId)
                }
            )
        //setLoading(false)
    }, [])

    useEffect(() => {
        if (selectedValue === 'ALL') {
            setFilteredById(initialPhotos)
        } else {
            setFilteredById(initialPhotos.filter((d) => d.albumId === selectedValue))
        }
    }, [selectedValue])

    const handleChangePageNumber = (e: React.ChangeEvent<unknown>, p: number) => {
        setCurrentPage(p)
    }

    const openModal = (url: string, id: number) => {
        setCurrentItem(initialPhotos.find(i => i.id === id))
        setIsOpen(true)
    }

    const deletePhotoItem = (id: number) => {
        let deletedInitialPhotos = initialPhotos.filter((p) => p.id !== id)
        setInitialPhotos(deletedInitialPhotos)
        let deletedFilteredPhotos = filteredById.filter((p) => p.id !== id)
        setFilteredById(deletedFilteredPhotos)
    }

    const handleChangeAlbumId = (event: SelectChangeEvent) => {
        const albumID = event.target.value
        setSelectedValue(albumID)
        let filteredAlbumID =
            albumID === 'ALL'
                ? initialPhotos
                : initialPhotos.filter((p) => p.albumId === Number(albumID))
        setFilteredById(filteredAlbumID)
    };

    return (
        <div className='wrapper'>
            <AlbumSelect
                selectedValue={selectedValue}
                handleChangeAlbumId={handleChangeAlbumId}
                albumId={albumId}
            />
            {
                filteredById.length !== 0 &&
                <CustomPagination
                    countPagesNumber={countPagesNumber}
                    currentPage={currentPage}
                    handleChangePageNumber={handleChangePageNumber}
                />
            }
            <Modal
                modalActive={isOpen}
                setModalActive={setIsOpen}
                currentItem={currentItem}
            />
            <RenderPhoto
                filteredById={filteredById}
                currentPhotos={currentPhotos}
                handleModalData={openModal}
                deletePhotoItem={deletePhotoItem}
                selectedValue={selectedValue}
            />
        </div>
    )
}

export default App;