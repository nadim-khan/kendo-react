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
    return (
            <div>
                <div className="k-search-box">
                <span className="search-icon">🔍</span>
                <Input placeholder="Search..." className="search-input" value={inputValue} onChange={onSearchChange}/>
            </div>
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
                    <tr key={rowIndex}>
                        {args.hasOwnProperty('isShowRowNumber') && args.isShowRowNumber && <td>{rowIndex+1}</td>}
                        {columns.map((column, colIndex) => (
                            <td key={colIndex}>{row[column.accessor]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </Table>
        </div>
        
    );
};

export default ReusableTable;
