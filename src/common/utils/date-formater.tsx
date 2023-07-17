import i18n from "../i18n";
import { format, fromUnixTime } from 'date-fns';
const dateFormated = (timestamp: any) => {
    const formatedTime = format(fromUnixTime(timestamp.value), `dd/MM/yyyy' ${i18n.t('general.at')}' HH:mm'`)
    return formatedTime;
}



export default dateFormated