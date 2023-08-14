import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import DeleteIcon from '@mui/icons-material/Delete';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import Typography from '@mui/material/Typography';

//core
import "primereact/resources/primereact.min.css";

export default function TableView() {
    const [datas, setDatas] = useState();
    useEffect(() => {
        contactData()
    }, [])
    const contactData = () => {
        const getData = {
            method: 'get',
            url: 'http://localhost:3000/contact'
        }
        axios(getData)
            .then((response) => {
                console.log(response);
                setDatas(response.data);
            })
    }

    const onRowEditComplete = (e) => {
        let _rows = [...datas];
        let { newData, index } = e;

        _rows[index] = newData;

        setDatas(_rows);
    };
    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    };
    const deleteID =(e,item)=>{
          const config = {
            method: 'delete',
            url:`http://localhost:3000/contact/${item.id}`,
          }
          axios(config)
          .then((response)=>{
            contactData()
          })
    }
    const bodyDelete =(item)=>{
        return  <DeleteIcon onClick={(e)=>{deleteID(e,item)}}></DeleteIcon>
    }


    return (
        <>
            <div>
                <DataTable value={datas} editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete} tableStyle={{ minWidth: '50rem' }}>
                    <Column field="name" header="Name" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                    <Column field="email" header="Email" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                    <Column field="subject" header="Subject" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                    <Column field="message" header="Message" editor={(options) => textEditor(options)} style={{ width: '20%' }}></Column>
                    <Column header='Edit' rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                    <Column header='Delete' body={bodyDelete} headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                </DataTable>
            </div>
        </>

    )
}
