import React from "react";
import {albumAPI, AlbumApiType} from '../API/album-api'

type RenderPhotoP = {
    filteredById: AlbumApiType[],
    currentPhotos: AlbumApiType[],
    handleModalData: (url: string) => void,
    deletePhotoItem: (id: number) => void,
    selectedValue: number,

}

function RenderPhoto({filteredById, currentPhotos, handleModalData, deletePhotoItem, selectedValue}: RenderPhotoP) {

    const currentData =
        currentPhotos.map((p) =>
            <div key={p.id} className="gallery">
                <div className="content">
                    <img
                        src={p.thumbnailUrl}
                        onClick={() => handleModalData(p.url)}
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
                filteredById.length === 0 && selectedValue === 0
                    ? <h3>Выберите альбом, который хотите увидеть </h3>
                    : currentData

            }

        </>
    )
}

export default RenderPhoto