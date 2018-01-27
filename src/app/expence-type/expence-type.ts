import {Participant} from '../participant/participant';

export class ExpenceType{
    constructor( public categry: string,
                 public subCategory: string,
                 public executener: Participant,
                 public isExecute: boolean,
                 public expenseEstimate: number){}
}
