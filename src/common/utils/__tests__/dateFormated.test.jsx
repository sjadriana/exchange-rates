import i18n from '../../i18n';
import dateFormated from '../date-formater';

describe('dateFormated', () => {

    it('Should format timestamp', () => {
        const timestamp = { value: 1679999999 };
        const expectedDate = `28/03/2023 ${i18n.t('general.at')} 07:39`

        const result = dateFormated(timestamp);

        expect(result).toBe(expectedDate);
    });
});


