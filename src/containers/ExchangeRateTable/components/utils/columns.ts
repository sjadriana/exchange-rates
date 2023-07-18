
import { GridColDef } from '@mui/x-data-grid';
import dateFormated from '../../../../common/utils/date-formater';
import i18n from '../../../../common/i18n';
import _isNil from 'lodash/isNil'


export const currencyFormatter = (value: Number) => (_isNil(value) ? undefined : Number(value)
    .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))
export const useColumns = ((currency: any) => {
    const columns: GridColDef[] = [
        {
            field: 'currency',
            headerName: i18n.t('general.currency'),
            width: 150,
        },
        {
            field: 'value',
            headerName: i18n.t('general.amount', { currency: currency }),
            width: 200,
            valueFormatter: (value) => currencyFormatter(value.value)
        },
        {
            field: 'timestamp',
            headerName: i18n.t('general.time'),
            width: 200,
            valueFormatter: (timestamp) => dateFormated(timestamp)
        },

    ];
    return columns
})
