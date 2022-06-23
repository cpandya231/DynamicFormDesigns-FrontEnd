import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchingValidatior: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('PASSWORD');
  const confirmPassword = control.get('CONFIRM_PASSWORD');

  return password?.value === confirmPassword?.value ? null : { notmatched: true };
};
