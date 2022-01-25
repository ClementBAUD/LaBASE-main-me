import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ConfirmedValidator } from './../../../confirmed.validator';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/authentification/auth.service';

@Component({
  selector: 'app-mot-passe-valider',
  templateUrl: './mot-passe-valider.component.html',
  styleUrls: ['./mot-passe-valider.component.css'],
})
export class MotPasseValiderComponent implements OnInit {
  ForgotValidationForm;
  errorMessage: string;
  submitted = false;
  time: number = 900;

  constructor(
    private fromBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {
    this.ForgotValidationForm = this.fromBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      {
        validator: ConfirmedValidator('password', 'confirmPassword'),
      }
    );
  }

  ngOnInit(): void {
    setInterval(() => {
      if (this.time > 0) this.time--;
    }, 1000);

    //intialisation du formulaire
  }

  get password() {
    return this.ForgotValidationForm.get('password');
  }
  get confirmPassword() {
    return this.ForgotValidationForm.get('confirmPassword');
  }

  onSubmit() {
    this.submitted = true;
    if (this.ForgotValidationForm.invalid) {
      return;
    }
    const password = this.ForgotValidationForm.get('password').value;
    this.route.queryParams.subscribe((params) => {
    const words = params.notif.split('-')


       this.auth
        .confirmpassword(password, words[1],words[0])
        .then((data) => {
          const navigationExtras: NavigationExtras = { state: { data: data } };
          this.router.navigate(['/'], navigationExtras);
        })
        .catch((err) => {
          this.ForgotValidationForm.reset()
          this.ForgotValidationForm = new FormData();

          this.errorMessage = err;
        });
    });
  }
}
