import React, { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import api from '../../../../common/resources/api/exchange-rate-api';
import columns from '../utils/columns';
import { useTranslation } from 'react-i18next';
import { localeText } from '../utils/localeTextTranslations';


const TableExhangeRate = () => {
    const { t } = useTranslation()
    const [user, setUser] = useState({});
    const [newRows, setNewRows] = useState([])


    useEffect(() => {
        api.get('e57779a0-8c69-4b94-8b86-9f065869f289').then((response: any) => setUser(response.data)).catch((err: any) => {
            console.error(t('general.error') + err);
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
                slots={{ toolbar: GridToolbar }}
                localeText={localeText}
            />
        </Box>

    );
}

export default TableExhangeRate