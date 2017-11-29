import { Day } from './Day';
import { BonusCompensationStep, OvertimeCompensationStep } from '../constants/interfaces';
import { roundToTwoDecimals } from '../constants/functions';
import * as Defaults from '../constants/defaults';

export class Employee {
    private name: string;
    private id: number;
    private days: Day[];
    private hourlyWage: number;
    private bonusCompensationStep: BonusCompensationStep; // for deciding when bonus payment should be paid
    private overtimeCompensationSteps: OvertimeCompensationStep[]; // for deciding when overtime payment should be paid

    constructor(
        id: number,
        hourlyWage: number = Defaults.wage,
        bonusCompensationStep: BonusCompensationStep = Defaults.bonusCompensationStep,
        overtimeCompensationSteps: OvertimeCompensationStep[] = Defaults.overTimeCompensationSteps
    ) {
        this.id = id;
        this.hourlyWage = hourlyWage;
        this.bonusCompensationStep = bonusCompensationStep;
        this.overtimeCompensationSteps = overtimeCompensationSteps;
        this.days = [];
    }

    public setName(name: string) {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }

    public getId(): number {
        return this.id;
    }

    /**
     * Sums all the payments for all the workshifts that have been added to the employee
     * @return {Number} wage
     */
    public getWage(): number {
        let wage = 0;
        for (let day of this.days) {
            wage += day.getPay();
        }
        return roundToTwoDecimals(wage);
    }

    public getFirstDayMonth(): string {
        if (this.days) {
            const numbers = this.days[0].getDate().split('.');
            if (numbers.length > 2) {
                return (numbers[1] + '-' + numbers[2]);
            }
        }
        return '';
    }

    /**
     * Adds a workshift for the employee
     * @param {String} date 
     * @param {String} startTime
     * @param {String} endTime
     */
    public addWorkShift(date: string, startTime: string, endTime: string) {
        let day: Day = new Day(date, this.hourlyWage, this.bonusCompensationStep, this.overtimeCompensationSteps);
        let dayFound: boolean = false;
        for (let i = this.days.length - 1; i >= 0; i--) {
            const dayDate: string = this.days[i].getDate.toString();
            if (dayDate == date) {
                day = this.days[i];
                dayFound = true;
                break;
            }
        }
        if (!dayFound) {
            this.days.push(day);
        }
        day.addWorkShift(startTime, endTime);
    }
    
    public toString(): string {
        return `${this.id},${this.name},$${this.getWage()}`;
    }
}