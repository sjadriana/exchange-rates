import React, { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import columns from '../utils/columns';
import { localeText } from '../utils/localeTextTranslations';
import axios from 'axios'
// import Autocomplete from '@mui/material/Autocomplete';
// import _keys from 'lodash/keys'
// import { TextField } from '@mui/material';

const TableExhangeRate = () => {
    const [data, setData] = useState({});
    const [newRows, setNewRows] = useState([])
    // implementação da seleção de moeda :
    // const [currencies, setCurrencies] = useState([])
    // const [value, setValue] = useState('USD');
    // const currencyKeys = _keys(currencies)

    const fetchData = async () => {
        try {
            const response = await axios.get(
                'https://mocki.io/v1/e57779a0-8c69-4b94-8b86-9f065869f289'
                // implementação da seleção de moeda:
                // `http://data.fixer.io/api/latest?access_key=85cc2cda75e4378a6fde2b2e24550fa5&base=${value}` não permite selecionar a moeda no plano free

            );
            setData(response.data);
            // implementação da seleção de moeda:
            // setCurrencies(response.data.rates)
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
            <Box sx={{ width: '50%', my: 2 }}  >
                {/* implementação da seleção de moeda: */}
                {/* opção de escolha de moeda, versão free não permite */}
                {/* <Autocomplete
                    options={currencyKeys}
                    onChange={(event: any, newValue: any) => {
                        setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params}
                    />
                    }
                /> */}
            </Box>
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