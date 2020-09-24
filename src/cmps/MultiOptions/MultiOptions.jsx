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
        { label: "yellow ", value: "yellow" },
        { label: "red ", value: "red" },
        { label: "pink ", value: "pink" },
        { label: "orange ", value: "orange" },
        { label: "black ", value: "black" },
        { label: "gray ", value: "gray" },
        { label: "purple ", value: "purple" },
    ]
    
    const optionsSizes = [
        { label: "XXL ", value: "XXL" },
        { label: "XL ", value: "XL" },
        { label: "L ", value: "L" },
        { label: "M ", value: "M" },
        { label: "S ", value: "S" },
        { label: "XS", value: "XS" },
        { label: "XXS ", value: "XXS" },
    ]


    return (

        <div>

            {console.log('render', selectedSize, selectedClr)}
            <div className="colors flex column">
                colors:
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
                {!props.isClrsSaved && <div>press save to confirm changes</div>}
                {props.isClrsSaved && <div>changes saved</div>}

                <button onClick={(ev) => props.saveColors(ev, selectedClr)}>save colors</button>
            </div>
            <div className="sizes flex column">
                sizes:
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
                {!props.isSizesSaved && <div>press save to confirm changes</div>}
                {props.isSizesSaved && <div>changes saved</div>}
                <button onClick={(ev) => props.saveSizes(ev, selectedSize)}>save sizes</button>
            </div>
        </div>
    )
}
