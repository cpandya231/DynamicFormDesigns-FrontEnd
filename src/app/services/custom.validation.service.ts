import { Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class CustomValidationService {

    patternValidator(): ValidatorFn {
        return (control: AbstractControl): any => {
            console.log(`Inside validator ${control.value}`);
            if (!control.value) {
                return null;
            }
            const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
            const valid = regex.test(control.value);
            console.log(`Password valid ${valid}`);
            return valid ? null : { invalidPassword: true };
        };
    }
}


