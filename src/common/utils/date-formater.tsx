import i18n from "../i18n";
import { format, fromUnixTime } from 'date-fns';
const dateFormated = (timestamp: any) => {
    console.log("time", timestamp.value)
    const formatedTime = format(fromUnixTime(timestamp.value), `dd/MM/yyyy' ${i18n.t('general.at')}' HH:mm'`)
    console.log("fff", fromUnixTime(timestamp.value))

    console.log("formatedTime", format(fromUnixTime(timestamp.value), `dd/MM/yyyy' ${i18n.t('general.at')}' HH:mm'`))

    return formatedTime;
}



export default dateFormated