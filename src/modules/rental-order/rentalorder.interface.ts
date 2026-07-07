import { RentalStatus } from "../../../generated/prisma/enums";

export interface IOrder {
    status: RentalStatus;
    id: string;
    createdAt: Date;
    customerId: string;
    gearId: string;
    providerId: string;
    startDate: Date;
    endDate: Date;
    totalDays: number;
    quantity: number;
    transactionId: string | null;
    pricePerDay: number;
    totalAmount: number;
    updatedAt: Date;
}