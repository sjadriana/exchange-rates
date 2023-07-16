import i18n from "../i18n";

const dateFormated = (timestamp: any) => {

    function padZero(numero: number): string {
        return numero.toString().padStart(2, '0');
    }

    const data = new Date(timestamp.value);
    const day = padZero(data.getDate());
    const month = padZero(data.getMonth() + 1)
    const year = data.getFullYear();
    const hour = padZero(data.getHours());
    const minutes = padZero(data.getMinutes());

    return `${day}/${month}/${year} ${i18n.t('general.at')} ${hour}:${minutes}`;
}



export default dateFormated