import React from 'react'
export default function UploadImg() {
    function fileSelectedHandler(event){
        console.log(event.target.files);
    }
    return (
        <div>
            <input type="file" onChange={(event)=>fileSelectedHandler(event)} />
        </div>
    )
}
