import React, { useState, useEffect } from 'react'
import MultiSelect from "react-multi-select-component";
import './MultiOptions.scss'
export default function MultiOptions(props) {

    let [selectedClr, setSelectedClr] = useState([]);
    let [selectedSize, setSelectedSize] = useState([]);

    const optionsColors = [
        { label: "white ", value: "white" },
        { label: "green ", value: "green" },
        { label: "blue ", value: "blue" },
        { label: "beige ", value: "beige" },
        { label: "brown ", value: "brown" },
        { label: "pink ", value: "pink" },
        { label: "maroon ", value: "maroon" },
        { label: "black ", value: "black" },
        { label: "gray ", value: "gray" },
        { label: "jeans ", value: "jeans" },
        { label: "lightblue ", value: "lightblue" },
        { label: "lightgreen ", value: "lightgreen" },
    ]

    const optionsSizes = [
        { label: "XS", value: "XS" },
        { label: "S ", value: "S" },
        { label: "M ", value: "M" },
        { label: "L ", value: "L" },
        { label: "XL ", value: "XL" },
        { label: "XXL ", value: "XXL" },
        { label: "3XL ", value: "3XL" },
        { label: "4XL ", value: "4XL" },
        { label: "5XL ", value: "5XL" },
        { label: "6XL ", value: "6XL" },
        { label: "7XL ", value: "7XL" },
        { label: "8XL ", value: "8XL" },
        { label: "9XL ", value: "9XL" },
        { label: "10XL ", value: "10XL" },
        { label: "11XL ", value: "11XL" },
        { label: "12XL ", value: "12XL" },
    ]


    return (

        <div className="multi-options">

            <div className="colors flex column">
                צבעים:
                <div onClick={props.clickedClrs}>
                    <MultiSelect
                        options={optionsColors}
                        value={selectedClr}
                        onChange={setSelectedClr}
                        labelledBy={"Select"}
                        disableSearch={true}
                        hasSelectAll={false}
                    />
                </div>
                {!props.isClrsSaved && <div className="unsaved-changes">לחץ שמור לשמירת שינויים</div>}
                {props.isClrsSaved && <div className="saved-changes" >שינויים נשמרו</div>}

                <button className="app-btn" onClick={(ev) => props.saveColors(ev, selectedClr)}>שמור צבעים</button>
            </div>
            <div className="sizes flex column">
                מידות:
            <div onClick={props.clickedSizes}>
                    <MultiSelect
                        options={optionsSizes}
                        value={selectedSize}
                        onChange={setSelectedSize}
                        labelledBy={"Select"}
                        disableSearch={true}
                        hasSelectAll={false}
                    />
                </div>
                {!props.isSizesSaved && <div className="unsaved-changes">לחץ שמור לשמירת שינוים</div>}
                {props.isSizesSaved && <div className="saved-changes">שינויים נשמרו</div>}
                <button className="app-btn" onClick={(ev) => props.saveSizes(ev, selectedSize)}>שמור מידות</button>
            </div>
        </div>
    )
}
