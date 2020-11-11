import React from 'react'
import { uploadImg } from '../../services/uploadImg.js'
import './UploadImg.scss'
export default function UploadImg(props) {

    async function showImgUrl(event) {
        const file = event.target.files[0]
        await uploadImg(file)
            .then(res => props.uploadImg(res.url))
    }
    return (
        <div>
            <input className="upload-inp" type="file" onChange={(event) => showImgUrl(event)} />
        </div>
    )
}
