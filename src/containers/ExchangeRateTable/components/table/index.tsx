// const columns: GridColDef[] = [
//     {
//         field: 'currency',
//         headerName: 'Moeda',
//     },
//     {
//         field: 'value',
//         headerName: 'Valor (em BRL)',
//     },
//     {
//         field: 'timestamp',
//         headerName: 'Horário',
//     },

// ];


// const TableExhangeRate = () => {
//     const [user, setUser] = useState({});
//     const [newRows, setNewRows] = useState([])


//     useEffect(() => {
//         api.get('e57779a0-8c69-4b94-8b86-9f065869f289').then((response: any) => setUser(response.data)).catch((err: any) => {
//             console.error("ops! ocorreu um erro" + err);
//         });
//     }, []);
//     console.log('user', user)

//     const transformObjectToArray = useCallback((obj: any) => {
//         const result: any = [];
//         const newObj = obj.rates
//         for (const currency in newObj) {
//             console.log('currency', currency)
//             result.push({ currency: currency, value: newObj[currency], id: currency, timestamp: obj.timestamp, });
//         }
//         return result
//     }, [])

//     useEffect(() => {
//         setNewRows(transformObjectToArray(user))

//     }, [transformObjectToArray, user])

//     return (
//         <AppBar >
//             <DataGrid
//                 rows={newRows}
//                 columns={columns}
//                 initialState={{
//                     pagination: {
//                         paginationModel: {
//                             pageSize: 5,
//                         },
//                     },
//                 }}
//                 pageSizeOptions={[5]}
//                 disableRowSelectionOnClick
//             />
//         </AppBar>
//     );
// }

// export default TableExhangeRate
import React, { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import api from '../../../../common/resources/api/magacred-api';


const columns: GridColDef[] = [
    {
        field: 'currency',
        headerName: 'Moeda',
        width: 150,
    },
    {
        field: 'value',
        headerName: 'Valor (em BRL)',
        width: 200,
    },
    {
        field: 'timestamp',
        headerName: 'Horário',
        width: 150,
    },

];


export default function TableExhangeRate() {
    const [user, setUser] = useState({});
    const [newRows, setNewRows] = useState([])


    useEffect(() => {
        api.get('e57779a0-8c69-4b94-8b86-9f065869f289').then((response: any) => setUser(response.data)).catch((err: any) => {
            console.error("ops! ocorreu um erro" + err);
        });
    }, []);
    console.log('user', user)

    const transformObjectToArray = useCallback((obj: any) => {
        const result: any = [];
        const newObj = obj.rates
        for (const currency in newObj) {
            console.log('currency', currency)
            result.push({ currency: currency, value: newObj[currency], id: currency, timestamp: obj.timestamp, });
        }
        return result
    }, [])

    useEffect(() => {
        setNewRows(transformObjectToArray(user))

    }, [transformObjectToArray, user])

    return (

        <Box sx={{ height: 600, width: '70%' }} >
            <DataGrid
                rows={newRows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                pageSizeOptions={[10]}
                disableRowSelectionOnClick
            />
        </Box>

    );
}