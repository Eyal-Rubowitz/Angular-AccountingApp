import { Transaction } from "../transactions/transaction";

export class Participant{

    public memberBalance: number;
    
    public memberFee: number
    public isMemberFeePaid: boolean;
    public otherExpenses: Transaction[]; 
    public totalExpenses : number;
    public id : string;

    constructor(public name?: string,
                public phoneNumber?: string,
                public email?: string,
                
            ){
                this.memberFee = this.memberFee || 0 ;
                this.isMemberFeePaid = false;
                this.otherExpenses = [];
                this.totalExpenses = 0;
                
                this.otherExpenses.forEach(transaction => {
                    this.totalExpenses += transaction.amount;
               });
               
               this.memberBalance = (this.totalExpenses - this.memberFee);

                if(this.totalExpenses >= this.memberFee){
                    this.isMemberFeePaid = true;
                }
            }
}