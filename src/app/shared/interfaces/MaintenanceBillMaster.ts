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
    userMasterid: string;
    createdBy: string;
    createdDate;
    updatedDate;
}