import { Employee } from '../../classes/Employee';
import * as Defaults from '../../constants/defaults';

describe('Employee', () => {
  const eveningCompensation = Defaults.bonusCompensationStep.bonusPay;
  let employee: Employee = new Employee(0);

  beforeEach(() => {
    employee = new Employee(0);
  });

  it('should initialize properly', () => {
    expect(employee.getWage()).toBe(0);
  });

  it('should increase wage by correct amount', () => {
    employee.addWorkShift('6.6.6666', '12:00', '18:00');
    expect(employee.getWage()).toBe(6 * Defaults.wage);
  });

  it('should increase wage with multiple shifts on the same day', () => {
    employee.addWorkShift('6.6.6666', '12:00', '18:00');
    employee.addWorkShift('6.6.6666', '18:00', '20:00');
    expect(employee.getWage()).toBe((8 * Defaults.wage) + (2 * eveningCompensation));
  });

  it('should increase wage with shifts on different days', () => {
    employee.addWorkShift('6.6.6666', '12:00', '18:00');
    employee.addWorkShift('6.6.6667', '12:00', '18:00');
    expect(employee.getWage()).toBe(12 * Defaults.wage);
  });
});