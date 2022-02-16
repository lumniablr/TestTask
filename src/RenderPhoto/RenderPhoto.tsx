import React from "react";
import {albumAPI, AlbumApiType} from '../API/album-api'
import './renderPhoto.css'

type RenderPhotoPropsType = {
    filteredById: AlbumApiType[],
    currentPhotos: AlbumApiType[],
    handleModalData: (url: string, id: number) => void,
    deletePhotoItem: (id: number) => void,
    selectedValue: number | string,
}

function RenderPhoto({
                         filteredById,
                         currentPhotos,
                         handleModalData,
                         deletePhotoItem,
                         selectedValue
                     }: RenderPhotoPropsType) {

    const currentData =
        currentPhotos.map((p) =>
            <div key={p.id} className="gallery">
                <div className="content">
                    <img
                        src={p.thumbnailUrl}
                        onClick={() => handleModalData(p.url, p.id)}
                    />
                    <p>
                        {p.title}
                    </p>
                    <button
                        className="buy"
                        onClick={() => deletePhotoItem(p.id)}
                    >
                        Delete Image
                    </button>
                </div>
            </div>
        )
    return (
        <>
            {
                filteredById.length !== 0
                    ? currentData
                    : <h3>Вы удалили все фото из этого альбома</h3>

            }

        </>
    )
}

export default RenderPhoto