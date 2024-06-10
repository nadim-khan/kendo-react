// ReusableTable.js
import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { Input } from '@progress/kendo-react-inputs';
import './reusable-table.scss'

const ReusableTable = ({ data, columns ,...args}) => {
    const [inputValue, setInputValue] = useState('');

    const onSearchChange = (event)=>{
        args.onTableSearch(event.value)
        setInputValue(event.value)
    }

    const onRowClick = (rowData)=>{
        if(args.hasOwnProperty('isRowClickEnabled') && args.isRowClickEnabled){
            args.onRowClick(rowData)
        }
    }

    const clearSearch = ()=>{
        args.onTableSearch('')
        setInputValue('')
    }

    return (
            <div className='reusableTable'>
                { args && args.hasOwnProperty('isSearchEnabled') && args.isSearchEnabled &&
                <div className="k-search-box">

               {  inputValue==='' && <span className="k-icon k-font-icon k-i-search curp"></span>}
               { inputValue!=='' && <span className="k-icon k-font-icon k-i-x curp" onClick={clearSearch}></span>}
                <Input placeholder="Search..." className="search-input" value={inputValue} onChange={onSearchChange}/>
            </div>
    }
            <Table striped bordered hover>
            <thead>
                <tr>
                    {args.hasOwnProperty('isShowRowNumber') && args.isShowRowNumber && <th>S.No.</th>}
                    {columns.map((column, index) => (
                        <th key={index}>{column.header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex} onClick={()=>onRowClick(row)} className='curp'>
                        {args.hasOwnProperty('isShowRowNumber') && args.isShowRowNumber && <td>{rowIndex+1}</td>}
                        {columns.map((column, colIndex) => (
                            <td key={colIndex} className='table-cell'>{row[column.accessor]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </Table>
        </div>
        
    );
};

export default ReusableTable;
