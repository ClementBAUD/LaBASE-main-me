import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { SwPush } from '@angular/service-worker';
import { exit } from 'process';
import { Subscription } from 'rxjs';
import { Magasin } from 'src/app/models/magasin';
import { Users } from 'src/app/models/users';
import { AuthService } from 'src/app/services/authentification/auth.service';
import { MagasinService } from 'src/app/services/magasins/magasin.service';
import { ConfirmedValidator } from './../../../confirmed.validator';
import { WebNotificationServiceService } from 'src/app/services/web-notification-service.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  RegisterForm;
  errorMessage: string;
  submitted = false;
  users:Users;
  formData = new FormData();

  magasins : Magasin[];
  magasinSub:Subscription;
  showVar: boolean = true;


  Loading:boolean;
  public resultat:boolean = false;

  isEnabled = this.swPush.isEnabled;
  isGranted = Notification.permission === 'granted';
  isShow = true;
  liste;

  private readonly publicKey ='BEqXGfa0rJ9CIUXszFD3TrcRiBhdlWGI13_Uo-QXnKCZQc4pDStignN8xW5_EkiDmspPpH4daMmj1cVoywwbFn8';


  constructor(private fromBuilder: FormBuilder,private router:Router,private auth:AuthService,
              private magasinservice:MagasinService, private route: ActivatedRoute,
              private swPush: SwPush, private webNotification: WebNotificationServiceService) {

              this.RegisterForm = this.fromBuilder.group({
                email: ['', [Validators.required, Validators.email]],
                password: ['', [Validators.required, Validators.minLength(6)]],
                confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
                prenom: ['', [Validators.required]],
                nom: ['', [Validators.required]],
                tel: ['', [Validators.required, Validators.minLength(5)]],
                files: ['', [Validators.required]],
                acceptTerms: [false, Validators.requiredTrue],


                },
                {
                  validator: ConfirmedValidator('password', 'confirmPassword')
                })

                this.pushSubscription()

   }


  ngOnInit(): void {}


  toggleDisplay() {
    this.isShow = !this.isShow;

  }


  toggleChild(){
    this.showVar = !this.showVar;
}
      get prenom() {
        return this.RegisterForm.get('prenom');
      }


      get files() {
        return this.RegisterForm.get('files');
      }
      get tel() {
        return this.RegisterForm.get('tel');
      }
      get nom() {
        return this.RegisterForm.get('nom');
      }
      get email() {
        return this.RegisterForm.get('email');
      }
      get password() {
        return this.RegisterForm.get('password');
      }
      get confirmPassword() {
        return this.RegisterForm.get('confirmPassword');
      }
      get acceptTerms() {
        return this.RegisterForm.get('acceptTerms');
      }


      handleImage(files: FileList) {
        this.formData.delete('files');
        this.formData.append('files', files[0]);
      }

      changeWebsite(e) {
        console.log(e.target.value);
      }


  onSubmit(){
    this.submitted = true;
    if (this.RegisterForm.invalid) {
      return;
    }
    const email = this.RegisterForm.get('email').value;
    const password = this.RegisterForm.get('password').value;
    const prenom = this.RegisterForm.get('prenom').value;
    const nom = this.RegisterForm.get('nom').value;
    const files = this.RegisterForm.get('files').value;
    const tel = this.RegisterForm.get('tel').value;
  //  const Idmagasin = this.RegisterForm.get('magasin').value;

  //  let MagID = Idmagasin.toString()
    let newuser = {
      "email": email,
      "password": password,
    }

    this.formData.append("nom", nom);
    this.formData.append("prenom", prenom);
    this.formData.append("email", email);
    this.formData.append("password", password);
    this.formData.append("tel", tel);
   // this.formData.append("idMagasin", MagID.toString());

    this.auth.inscription(this.formData, newuser)
      .then((data) => {
        // console.log(data)
    /*    let resultat = "votre compte a bien été créé."
        let navigationExtras: NavigationExtras = {
          queryParams: { 'notif': resultat },
          fragment: 'anchor'
        };
      ///  this.webNotification.subscribeToNotification(data["id"],MagID)*/
        this.router.navigate(['/waiting-Page'])

      })
      .catch((err) => {
        this.formData = new FormData();

        this.errorMessage = err;
      })

  }

  pushSubscription() {
    if (!this.swPush.isEnabled) {
      console.log('Notification is not enabled');
      return;
    }

    this.swPush
      .requestSubscription({
        serverPublicKey: this.publicKey,
      })
      .then((sub) => {
        // Make a post call to serve
      })
      .catch((err) => console.log(err));
  }
}
