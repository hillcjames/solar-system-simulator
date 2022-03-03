import React, { Component, useContext, useEffect, useState } from "react";
// import { Cell, Column, Table } from "@blueprintjs/table";

import { ReactTabulator, reactFormatter } from "react-tabulator";
import "react-tabulator/lib/styles.css"; // default theme
// import "react-tabulator/css/bootstrap/tabulator_bootstrap.min.css";
import "react-tabulator/css/tabulator_midnight.min.css";


import { ModelState } from "../types/Model";
import { Planet } from "../types/Planet";
import { Vector2d } from "../types/Vector2d";


import '../css/BasicDataTableDisplay.css';
// import "~@blueprintjs/table/lib/css/table.css";


export interface BasicDataTableDisplayProps {
    model: ModelState;
    rowClickCallback: (e: any, row: any) => void;
}




const _BasicDataTableDisplay: React.FC<BasicDataTableDisplayProps> = (props) => {

    const [ref, setRef] = useState<any>(null);

    let customFormatter = (cell: any, formatterParams: any, onRendered: any) => {
        let pos: Vector2d = cell.getValue();
        return pos.x.toFixed(1) + " " + pos.y.toFixed(1);
    }

    useEffect(() => {
        // console.log("Updating _BasicDataTableDisplay useEffect ");

        // TODO replaceData and updateOrAddData cause lag, even with a small number of table entries. What gives?
        if (ref !== null && ref.current !== null) {
            ref.current.updateData(props.model.planets);
            if (ref.current.getRows().length < props.model.planets.length) {
                ref.current.updateOrAddData(props.model.planets);
            }

        }
    });

    // useEffect(() => {
    //     console.log("Updating _BasicDataTableDisplay useEffect ");
    // });


    const columns = [
        { title: "Name", field: "name", width: 30 },
        // { title: "Pos", field: "pos", formatter: reactFormatter(<div>{pos}</div>) },
        { title: "Pos", field: "pos", width: 100, formatter: customFormatter },
        { title: "Velocity", field: "v", width: 100, formatter: customFormatter },
        { title: "Mass", field: "mass", width: 150 },
        { title: "Rank", field: "rank", width: 150 },
        { title: "Debug", field: "debug", width: 150 },
        { title: "Dead", field: "dead" },
    ];

    // useEffect(() => {
    //     console.log("Updating table!!")
    // });

    // const nameCellRenderer = (rowIndex: number) => {
    //     let p: Planet = props.model.state.planets[rowIndex];
    //     return (<Cell>{p.id}</Cell>);
    // }
    const posCellRenderer = (rowIndex: number) => {
        // <Cell>{`€${(rowIndex * 10 * 0.85).toFixed(2)}`}</Cell>
        let p: Planet = props.model.planets[rowIndex];
        return (<div>{p.pos}</div>);
    }

    return (
        <div className="BasicDataTableDisplay">
            {/* <Table numRows={props.model.state.planets.length}>
                <Column name="Name" cellRenderer={nameCellRenderer}/>
                <Column name="Pos" cellRenderer={posCellRenderer} />
            </Table> */}
            <ReactTabulator
                      onRef={(ref) => (setRef(ref))}
                      columns={columns}
                      data={props.model.planets}
                      events={{
                        rowClick: props.rowClickCallback}}
                    />
                    {/* options={options} */}
                    {/* data-custom-attr="test-custom-attribute"
                    className="custom-css-class" */}
        </div>
    );
}


const BasicDataTableDisplay = React.memo(_BasicDataTableDisplay);
export default BasicDataTableDisplay;