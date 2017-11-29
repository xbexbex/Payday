export interface BonusCompensationStep { // object for setting bonus payment
    bonusPay: number; // amount of paid bonus per hour
    startTime: number; // when the payment starts
    endTime: number; // when the payment should end
}

export interface OvertimeCompensationStep { // object for setting overtime payment
    bonusMultiplier: number; // multiplier of hourly wage
    startTime: number; // how many hours a day before the overtime kicks in
}

export interface LineObject {
    name: string;
    id: number;
    date: string;
    start: string;
    end: string;
}

export interface FileReaderEventTarget extends EventTarget {
    result: string;
}

export interface FileReaderEvent extends Event {
    target: FileReaderEventTarget;
    getMessage(): string;
}