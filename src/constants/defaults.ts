import { BonusCompensationStep, OvertimeCompensationStep } from './interfaces';

export const bonusCompensationStep: BonusCompensationStep = { bonusPay: 1.15, startTime: 18.00, endTime: 6.00 };

export const overTimeCompensationSteps: OvertimeCompensationStep[] = [
    { bonusMultiplier: 0.25, startTime: 8 },
    { bonusMultiplier: 0.5, startTime: 10 },
    { bonusMultiplier: 1, startTime: 12 }
];

export const wage: number = 3.75;