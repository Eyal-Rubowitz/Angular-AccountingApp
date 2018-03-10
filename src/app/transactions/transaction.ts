import { Participant } from '../participant/participant';
import { TransactionType } from './transaction-type.enum';


export class Transaction{
    public id: string;
    constructor(public itemName?: string,
                public itemType?: TransactionType,
                public paymentDescription?: string,
                public amount?: number,
                public whosPaying?: string,
                public whosReciving?: string,
                public date?: Date,
                public executeStatus?: boolean,
                public billPicture?: string,
                ){}
}