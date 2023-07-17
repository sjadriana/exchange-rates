import React, { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import columns from '../utils/columns';
import { localeText } from '../utils/localeTextTranslations';

import axios from 'axios'

const TableExhangeRate = () => {
    const [data, setData] = useState({});
    const [newRows, setNewRows] = useState([])

    const fetchData = async () => {
        try {
            const response = await axios.get(
                'https://mocki.io/v1/e57779a0-8c69-4b94-8b86-9f065869f289'
            );
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const transformObjectToArray = useCallback((obj: any) => {
        const result: any = [];
        const newObj = obj.rates
        for (const currency in newObj) {
            result.push({ currency: currency, value: newObj[currency], id: currency, timestamp: obj.timestamp, });
        }
        return result
    }, [])

    useEffect(() => {
        setNewRows(transformObjectToArray(data))

    }, [transformObjectToArray, data])

    return (

        <Box sx={{ width: '70%' }} >
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
                pageSizeOptions={[5, 10, 25, 50, 75, 100]}
                disableRowSelectionOnClick
                slots={{ toolbar: GridToolbar }}
                localeText={localeText}
            />
        </Box>

    );
}

export default TableExhangeRate