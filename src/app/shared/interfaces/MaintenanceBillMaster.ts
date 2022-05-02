export interface MaintenanceBillMaster {
    id: string;
    maintenanceAmount: number;
    waterAmount: number;
    amount: number;
    amountReceived: number;
    reading: number;
    usedUnit: number;
    previousReading: number;
    currentReading: number;
    maintenancePaid: boolean;
    averageReading: number;
    payType: string;
    amountType: string;
    description: string;
    userMasterId: string;
    createdBy: string;
    createdDate;
    updatedDate;
    month;
    otherAmount;
    type;
}