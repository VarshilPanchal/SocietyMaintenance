export interface AmountMaster {
    id: string;
    userMasterid: string;
    description: string;
    amountType: string;
    payType: string;
    reading: string;
    createdDate: Date;
    updatedDate: Date;
    waterAmount: string;
    MaintenanceAmount: string;
    amount: number;
}