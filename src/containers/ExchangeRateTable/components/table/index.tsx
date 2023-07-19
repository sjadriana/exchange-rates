import React, { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { localeText } from '../utils/localeTextTranslations';
import axios from 'axios'
import Autocomplete from '@mui/material/Autocomplete';
import _keys from 'lodash/keys'
import { TextField } from '@mui/material';
import { useColumns } from '../utils/columns';
import { useTranslation } from 'react-i18next';

const TableExhangeRate = () => {
    const { t } = useTranslation()
    const [data, setData] = useState({});
    const [newRows, setNewRows] = useState([])
    const [currencies, setCurrencies] = useState([])
    const [value, setValue] = useState('BRL');
    const currencyKeys = _keys(currencies)
    const columns = useColumns(value)

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get(
                `https://v6.exchangerate-api.com/v6/8b51c6e461529c9fcff3b0ef/latest/${value}`

            );
            setData(response.data);
            setCurrencies(response.data.conversion_rates)
        } catch (error) {
            console.error(error);
        }
    }, [value]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const transformObjectToArray = useCallback((obj: any) => {
        const result: any = [];
        const newObj = obj.conversion_rates
        for (const currency in newObj) {
            result.push({ currency: currency, value: newObj[currency], id: currency, timestamp: obj.time_last_update_unix });
        }
        return result
    }, [])

    useEffect(() => {
        setNewRows(transformObjectToArray(data))

    }, [transformObjectToArray, data])

    return (
        <Box sx={{ width: '70%' }} >
            <Box sx={{ width: '50%', my: 2 }}  >
                <Autocomplete
                    options={currencyKeys}
                    onChange={(event: any, newValue: any) => setValue(newValue || 'BRL')}
                    renderInput={(params) => <TextField {...params} label={t('general.chooseAcurrency')} />
                    }
                />
            </Box>
            <DataGrid
                slotProps={{ toolbar: { printOptions: { disableToolbarButton: true } } }}
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