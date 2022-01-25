import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { NavigationExtras, Router } from '@angular/router';
import { Users } from 'src/app/models/users';
import { AuthService } from 'src/app/services/authentification/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoginForm;
  errorMessage: string;
  submitted = false;
  formData = new FormData();
  warnmessage:string;

  constructor(private fromBuilder: FormBuilder,private router:Router,private auth:AuthService) {
    this.LoginForm = this.fromBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
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


  get email() {
    return this.LoginForm.get('email');
  }
  get password() {
    return this.LoginForm.get('password');
  }
  onSubmit(){
    this.submitted = true;
    if (this.LoginForm.invalid) {
      return;
    }
    this.auth.logoutUser();
    const email = this.LoginForm.get('email').value;
    const password = this.LoginForm.get('password').value;

      this.auth.connexion(email, password)
      .then((data)=>{
        //console.info(data)
        if (data['profile']=="Etudiant") {
          if (data['idmagasin'] == 0){
            let etudiant={
              "text": password
            }
            localStorage.setItem('partial',JSON.stringify(etudiant))
            this.router.navigate(['/select-magasins'])
          }
          else{

            if (data['satutcompte']=="attente") {
              // page d'attente
              this.router.navigate(['/waiting-Page'])
            }
            else if (data['satutcompte']=="valider") {
              // page d'Accueil
              this.router.navigate(['/home'])
            }
            else if (data['satutcompte']=="renouvellement") {
              // page d'attent avec message de renouvellement
              this.router.navigate(['/renewing-Page'])
            }
            else{
              let message ="Veuillez vous connecter svp."
              this.router.navigate(['/',message])
            }
          }
            
          }
        if (data['profile']=="Magasin") {
            console.info(data)
          this.router.navigate(['/home-magasin']).then(() => {
            window.location.reload();
         });
        }
        if (data['profile']=="Admin") {
          this.router.navigate(['/home-admin']).then(() => {
            window.location.reload();
          });
        }
        ///this.router.navigate(['/home'])
      })
      .catch((err)=>{
        console.log(err)
        this.formData = new FormData();
        this.LoginForm.reset()
     //   this.formData = new FormData();

        this.errorMessage=err;
      })

  }
}
