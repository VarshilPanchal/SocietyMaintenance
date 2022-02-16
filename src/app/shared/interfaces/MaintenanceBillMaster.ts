export interface MaintenanceBillMaster {
    id: string;
    maintenanceAmount: number;
    waterAmount: number;
    amount: number;
    reading: number;
    usedUnit: number;
    previousReading: number;
    currentReading: number;
    meterNotWorking: boolean;
    averageReading: number;
    payType: string;
    userMasterid: string;
    createdBy: string;
    createdDate;
}