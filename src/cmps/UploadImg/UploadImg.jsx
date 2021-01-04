import React, { useState } from 'react'
import FileBase from 'react-file-base64'
import { uploadImg } from '../../services/uploadImg.js'
import './UploadImg.scss'
export default function UploadImg(props) {

    // async function showImgUrl(event) {
    //     const file = event.target.files[0]
    //     await uploadImg(file)
    //         .then(res => props.uploadImg(res.url))
    // }


    function testImg(base64){
        console.log('hi');
        console.log(base64.base64);
        props.uploadImg(base64.base64)
    }

    return (
        <div>
            {/* <input className="upload-inp" type="file" onChange={(event) => showImgUrl(event)} /> */}
            <FileBase type ="file"
            multiple={false}
            onDone = {(base64) => testImg(base64)}
            />
        </div>
    )
}
