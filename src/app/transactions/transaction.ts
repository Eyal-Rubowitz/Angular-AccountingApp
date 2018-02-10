import {Participant} from '../participant/participant';

export class Transaction{
    public id: string;
    constructor(public itemName?: string,
                public paymentDescription?: string,
                public amount?: number,
                public whosPaying?: string,
                public whosReciving?: string,
                public date?: Date,
                public executeStatus?: boolean,
                public billPicture?: string
                ){}
}