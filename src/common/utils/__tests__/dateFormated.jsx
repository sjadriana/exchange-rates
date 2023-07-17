import i18n from '../../i18n';
import dateFormated from '../date-formater';

describe('dateFormated', () => {
    it('deve formatar corretamente a data e hora', () => {
        const mockTimestamp = { value: 1626422400000 }
        const result = dateFormated(mockTimestamp);
        expect(result).toBe('16/07/2021 at 05:00');
    });

    it('deve utilizar corretamente a tradução para "at"', () => {
        const mockTimestamp = { value: 1626422400000 }
        i18n.t = jest.fn().mockReturnValue('em');
        const result = dateFormated(mockTimestamp);
        expect(result).toBe('16/07/2021 em 05:00');
    });
});
