
import { GridColDef } from '@mui/x-data-grid';
import dateFormated from '../../../../common/utils/date-formater';
import i18n from '../../../../common/i18n';

const columns: GridColDef[] = [
    {
        field: 'currency',
        headerName: i18n.t('general.currency'),
        width: 150,
    },
    {
        field: 'value',
        headerName: i18n.t('general.amount'),
        width: 200,
    },
    {
        field: 'timestamp',
        headerName: i18n.t('general.time'),
        width: 200,
        valueFormatter: (timestamp) => dateFormated(timestamp)
    },

];
export default columns

