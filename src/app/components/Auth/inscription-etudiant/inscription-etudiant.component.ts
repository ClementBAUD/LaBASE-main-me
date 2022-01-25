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
import { LazyLoadService } from 'ngx-owl-carousel-o/lib/services/lazyload.service';

@Component({
  selector: 'app-inscription-etudiant',
  templateUrl: './inscription-etudiant.component.html',
  styleUrls: ['./inscription-etudiant.component.css']
})
export class InscriptionEtudiantComponent implements OnInit {
  LoginForm;
  errorMessage: string;
  submitted = false;
  formData = new FormData();
  warnmessage:string;

  constructor(private fromBuilder: FormBuilder,private router:Router,private auth:AuthService) {
    this.LoginForm = this.fromBuilder.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
          prenom: ['', [Validators.required]],
          nom: ['', [Validators.required]],
          tel: ['', [Validators.required, Validators.minLength(5)]],
          files: ['', [Validators.required]],
          acceptTerms: [false, Validators.requiredTrue],
      })

      const navigation = this.router.getCurrentNavigation();
      if (navigation.extras.state) {
        const state = navigation.extras.state as {data: string};
        this.warnmessage = state.data;
      }

    //

   }

  ngOnInit(): void {
    //intialisation du formulaire
  }



  get prenom() {
    return this.LoginForm.get('prenom');
  }


  get files() {
    return this.LoginForm.get('files');
  }
  get tel() {
    return this.LoginForm.get('tel');
  }
  get nom() {
    return this.LoginForm.get('nom');
  }
  get email() {
    return this.LoginForm.get('email');
  }
  get password() {
    return this.LoginForm.get('password');
  }
  get confirmPassword() {
    return this.LoginForm.get('confirmPassword');
  }
  get acceptTerms() {
    return this.LoginForm.get('acceptTerms');
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
    if (this.LoginForm.invalid) {
      return;
    }

    const email = this.LoginForm.get('email').value;
    const password = this.LoginForm.get('password').value;
    const prenom = this.LoginForm.get('prenom').value;
    const nom = this.LoginForm.get('nom').value;
    const files = this.LoginForm.get('files').value;
    const tel = this.LoginForm.get('tel').value;
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

    this.auth.register(this.formData).then((data) => {
      // console.log(data)
  /*    let resultat = "votre compte a bien été créé."
      let navigationExtras: NavigationExtras = {
        queryParams: { 'notif': resultat },
        fragment: 'anchor'
      };
    ///  this.webNotification.subscribeToNotification(data["id"],MagID)*/
    localStorage.setItem('UsersMagasinListe',JSON.stringify(data))
    let etudiant={
      "text": password
    }
    localStorage.setItem('partial',JSON.stringify(etudiant))
    this.router.navigate(['/select-magasins'])

    })
    .catch((err) => {
      this.LoginForm.reset()
      this.formData = new FormData();
      this.errorMessage = err;
    })


  }
}
