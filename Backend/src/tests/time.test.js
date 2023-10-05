const { time_in_future, is_late } = require('../components/time');

// Testes para time_in_future
describe('time_in_future', () => {
    it('deve retornar uma nova data no futuro', () => {
        const current_date = new Date('2023-09-28T12:00:00');
        const minutes = 30;
        const expected_date = new Date('2023-09-28T12:30:00');

        const result = time_in_future(current_date, minutes);

        expect(result).toEqual(expected_date);
    });

    it('deve retornar uma nova data no futuro quando o número de minutos é negativo (voltando no tempo)', () => {
        const current_date = new Date('2023-09-28T12:00:00');
        const minutes = -30;
        const expected_date = new Date('2023-09-28T11:30:00');
    
        const result = time_in_future(current_date, minutes);
    
        expect(result).toEqual(expected_date);
    });
});

// Testes para is_late
describe('is_late', () => {
    it('deve retornar verdadeiro se a data atual for maior ou igual à data limite', () => {
        const current_date = new Date('2023-09-28T12:00:00');
        const limit_date = new Date('2023-09-28T12:00:00');

        const result = is_late(current_date, limit_date);

        expect(result).toBe(true);
    });

    it('deve retornar falso se a data atual for menor do que a data limite', () => {
        const current_date = new Date('2023-09-28T12:00:00');
        const limit_date = new Date('2023-09-28T13:00:00');

        const result = is_late(current_date, limit_date);

        expect(result).toBe(false);
    });
});
