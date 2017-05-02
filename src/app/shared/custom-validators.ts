import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {

  static passwordPolicy(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      // ^
      // (?=.*[A-Z].*)    Ensure string has at least one uppercase letter
      // (?=.*[a-z].*)    Ensure string has at least one lowercase letter
      // (?=.*[0-9].*)    Ensure string has at least one digit
      // (?=.*[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/].*)   Ensure string has at least one symbol character
      // .{8,}            Ensure string is of at least length 8
      // $
      // const policyRe = /^(?=.*[A-Z].*)(?=.*[a-z].*)(?=.*[0-9].*)(?=.*[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/].*).{8,}$/;

      const uppercaseRe = /^.*[A-Z].*$/;
      const lowercaseRe = /^.*[a-z].*$/;
      const digitRe = /^.*[0-9].*$/;
      // const symbolRe = /^.*[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/].*$/;
      const lengthRe = /^.{8,}$/;

      const uppercase = uppercaseRe.test(control.value);
      const lowercase = lowercaseRe.test(control.value);
      const digit = digitRe.test(control.value);
      const symbol = true; // symbolRe.test(control.value);
      const length = lengthRe.test(control.value);

      const pass = uppercase && lowercase && digit && symbol && length;
      if (pass) {
        console.log('passed');
        return null;
      }

      return {
        'passwordPolicy': {
          uppercase: !uppercase,
          lowercase: !lowercase,
          digit: !digit,
          symbol: !symbol,
          length: !length
        }
      };
    };
  }
}
