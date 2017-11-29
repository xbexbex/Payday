import { BonusCompensationStep, OvertimeCompensationStep } from '../constants/interfaces';
import { roundToTwoDecimals } from '../constants/functions';

export class Day {
    private date: string;
    private hours: number;

    private pay: number;
    private bonusCompensation: number;
    private overtimeCompensation: number;

    private hourlyWage: number;
    private bonusCompensationStep: BonusCompensationStep; // for deciding when bonus payment should be paid
    private overtimeCompensationSteps: OvertimeCompensationStep[]; // for deciding when overtime payment should be paid

    constructor(
        date: string,
        hourlyWage: number,
        bonusCompensationStep: BonusCompensationStep,
        overtimeCompensationSteps: OvertimeCompensationStep[]
    ) {
        this.date = date;
        this.hours = 0;
        this.pay = 0;
        this.bonusCompensation = 0;
        this.overtimeCompensation = 0;
        this.hourlyWage = hourlyWage;
        this.bonusCompensationStep = bonusCompensationStep;
        this.overtimeCompensationSteps = overtimeCompensationSteps;
    }

    public getDate(): string {
        return this.date;
    }

    /**
     * Adds a workshift for the day
     * @param {Number} pay
     * @param {Number} pay
     */
    public addWorkShift(startTimeString: string, endTimeString: string) { // add payment for worked hours
        const startTime = this.convertTimeStringToNumber(startTimeString);
        const endTime = this.convertTimeStringToNumber(endTimeString);
        const hours = this.calculateWorkHours(startTime, endTime);
        const pay = hours * this.hourlyWage;
        const bonusCompensation = this.calculateBonusCompensation(startTime, endTime, this.bonusCompensationStep);
        const overtimeCompensation = this.calculateOvertimeCompensation(this.hours, hours, this.hourlyWage, this.overtimeCompensationSteps);

        this.hours += hours;
        this.pay += pay;
        this.bonusCompensation += bonusCompensation;
        this.overtimeCompensation += overtimeCompensation;
    }

    /**
     * Returns a sum of all the hourly wages and compensations
     * @return {Number} pay
     */
    public getPay(): number { // returns accumulated payment
        return (this.pay + this.overtimeCompensation + this.bonusCompensation);
    }

    private calculateWorkHours(time1: number, time2: number): number {
        if (time1 > time2) {
            time2 += 24;
        }
        return (time2 - time1);
    }

    private calculateBonusCompensation(time1: number, time2: number, bcs: BonusCompensationStep): number { // returns hours and minutes between two times
        if (bcs.bonusPay == 0) {
            return 0;
        }
        let endTime = bcs.endTime;
        if (bcs.startTime > endTime) {
            endTime += 24;
        }
        if (time1 > time2) {
            time2 += 24;
        }
        const start = Math.max(time1, bcs.startTime);
        const end = Math.min(time2, endTime);
        if (end > start) {
            return (bcs.bonusPay * (end - start));
        }
        return 0;
    }

    private calculateOvertimeCompensation(oldHours: number, newHours: number, wage: number, ocss: OvertimeCompensationStep[]) { // calculates the summed up compensation for all the overtime
        let compensation = 0;
        for (let i = 0; i < ocss.length; i++) {
            const ocs = ocss[i];
            if (oldHours + newHours > ocs.startTime) {
                let overHours;
                if (!(((ocss.length - 1) > i) && (ocss[i + 1].startTime <= oldHours))) {
                    if ((ocss.length - 1) > i) {
                        overHours = Math.min((ocss[i + 1].startTime - ocs.startTime), ((oldHours + newHours) - Math.max(ocs.startTime, oldHours)));
                    } else {
                        overHours = ((oldHours + newHours) - Math.max(ocs.startTime, oldHours));
                    }
                    oldHours += overHours;
                    newHours -= overHours;
                    compensation += overHours * wage * ocs.bonusMultiplier;
                }
            } else {
                break;
            }
        }
        return compensation;
    }

    private convertTimeStringToNumber(timeString: string): number { // converts the HH:MM -string to HH.MM -number
        const numbers: string[] = timeString.split(':');
        const integer: number = Number.parseInt(numbers[0]);
        const decimals: number = (Number.parseInt(numbers[1]) / 100);
        if (integer > 23 || decimals > 59) {
            throw 'invalid time';
        }
        return roundToTwoDecimals(integer + (decimals  * 1.666666666667));
    }
}