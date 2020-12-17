import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";

function check_if_is_integer(value: any){
    // I can have spacespacespace1 - which is 1 and validators pases but
    // spacespacespace doesn't - which is what i wanted.
    // 1space2 doesn't pass - good
    // of course, when saving data you do another parseInt.
 
    return ((parseFloat(value) == parseInt(value)) && !isNaN(value));
 
 }
 
 @Injectable()
 export class ValidatorsService {
 
    public isInteger = (control:FormControl) => {
 
         // here, notice we use the ternary operator to return null when value is the integer we want.
         // you are supposed to return null for the validation to pass.
         return check_if_is_integer(control.value) ? null : {
            notNumeric: true
         }
    }

 
 }