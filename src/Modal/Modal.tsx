import React from "react";
import "../Modal/modal.css"
import {AlbumApiType} from "../API/album-api";


type ModalPropsType = {
    modalActive: boolean,
    setModalActive: (flag: boolean) => void,
    currentItem: AlbumApiType | undefined,
}

function Modal({modalActive, setModalActive, currentItem}: ModalPropsType) {
    return (
        <div className={modalActive ? 'modal active' : 'modal'} onClick={() => setModalActive(false)}>
            <div className={modalActive ? 'modal__content active' : 'modal__content'}>
                <img
                    alt=''
                    src={currentItem?.url}
                />
            </div>
        </div>
    )
}

export default Modal;