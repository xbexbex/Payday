import { Day } from '../../classes/Day';
import * as Defaults from '../../constants/defaults';

describe('Day', () => {
  const eveningCompensation = Defaults.bonusCompensationStep.bonusPay;
  let day = new Day('6.6.6666', Defaults.wage, Defaults.bonusCompensationStep, Defaults.overTimeCompensationSteps);

  beforeEach(() => {
    day = new Day('6.6.6666', Defaults.wage, Defaults.bonusCompensationStep, Defaults.overTimeCompensationSteps);
  });

  it('should initialize properly', () => {
    expect(day.getPay()).toBe(0);
  });

  it('should increase normal wage correctly', () => {
    day.addWorkShift('8:00', '12:00');
    expect(day.getPay()).toBe((4 * Defaults.wage));
  });

  it('should increase normal wage with uneven hours correctly', () => {
    day.addWorkShift('8:45', '12:15');
    expect(day.getPay()).toBe((3.5 * Defaults.wage));
  });

  it('should increase normal wage with uneven hours correctly', () => {
    day.addWorkShift('8:15', '12:45');
    expect(day.getPay()).toBe((4.5 * Defaults.wage));
  });

  it('should increase normal wage multiple times correctly', () => {
    day.addWorkShift('8:15', '12:45');
    day.addWorkShift('13:45', '15:15');
    expect(day.getPay()).toBe((6 * Defaults.wage));
  });

  it('should increase wage with evening compensation multiple times correctly', () => {
    day.addWorkShift('8:15', '12:45');
    day.addWorkShift('18:45', '22:15');
    expect(day.getPay()).toBe(((8 * Defaults.wage) + (3.5 * eveningCompensation)));
  });

  it('should increase wage with evening compensation correctly', () => {
    day.addWorkShift('18:00', '23:00');
    expect(day.getPay()).toBe((5 * (Defaults.wage + eveningCompensation)));
  });

  it('should increase wage with evening compensation and uneven hours correctly', () => {
    day.addWorkShift('18:45', '23:15');
    expect(day.getPay()).toBe(4.5 * (Defaults.wage + eveningCompensation));
  });

  it('should increase wage with tier 1 overtime correctly', () => {
    day.addWorkShift('06:00', '16:00');
    expect(day.getPay()).toBe(((8 * Defaults.wage) + (2 * (1.25 * Defaults.wage))));
  });

  it('should increase wage with tier 2 overtime correctly', () => {
    day.addWorkShift('06:00', '18:00');
    expect(day.getPay()).toBe(((8 * Defaults.wage) + (2 * (1.25 * Defaults.wage)) + (2 * (1.5 * Defaults.wage))));
  });

  it('should increase wage with tier 3 overtime correctly', () => {
    day.addWorkShift('06:00', '21:00');
    expect(day.getPay()).toBe(((8 * Defaults.wage) + (2 * (1.25 * Defaults.wage)) + (2 * (1.5 * Defaults.wage)) + (3 * (2 * Defaults.wage)) + (3 * eveningCompensation)));
  });

  it('should increase wage with all extra compensations correctly', () => {
    day.addWorkShift('07:00', '06:00');
    expect(day.getPay()).toBe(((8 * Defaults.wage) + (2 * (1.25 * Defaults.wage)) + (2 * (1.5 * Defaults.wage)) + (11 * (2 * Defaults.wage)) + (12 * eveningCompensation)));
  });

  it('should increase wage with overtime compensations multiple times correctly', () => {
    day.addWorkShift('06:00', '12:00');
    day.addWorkShift('12:15', '17:45');
    expect(day.getPay()).toBe((11.5 * Defaults.wage) + (2 * (0.25 * Defaults.wage)) + (1.5 * (0.5 * Defaults.wage)));
  });

  it('should increase wage with overtime compensations multiple times correctly', () => {
    day.addWorkShift('07:00', '10:00');
    day.addWorkShift('10:30', '20:15');
    day.addWorkShift('20:30', '23:15');
    day.addWorkShift('23:30', '06:00');
    expect(day.getPay()).toBe((22 * Defaults.wage) + (2 * (0.25 * Defaults.wage)) + (2 * (0.5 * Defaults.wage)) + (10 * (Defaults.wage)) + (11.5 * eveningCompensation));
  });
});