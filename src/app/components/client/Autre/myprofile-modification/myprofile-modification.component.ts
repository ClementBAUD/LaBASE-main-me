import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import { Users } from 'src/app/models/users';
import { AuthService } from 'src/app/services/authentification/auth.service';
import { Subscription } from 'rxjs';
import { AllUsersService } from 'src/app/services/users/all-users.service';
@Component({
  selector: 'app-myprofile-modification',
  templateUrl: './myprofile-modification.component.html',
  styleUrls: ['./myprofile-modification.component.css']
})
export class MyprofileModificationComponent implements OnInit {

  isUser;
  isMag:boolean;
  isAdmin:boolean;
  warnmessage:string;

  RegisterForm;
  errorMessage: string;
  succesMessage:string;
  submitted = false;
  users : Users[];
  formData = new FormData();


  userSUb:Subscription;



  Loading:boolean;
  constructor(private auth:AuthService,private router:Router,private fromBuilder: FormBuilder,private allusersService:AllUsersService) {
    this.RegisterForm = this.fromBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      prenom: ['', [Validators.required]],
      nom: ['', [Validators.required]],
      tel: ['', [Validators.required, Validators.minLength(5)]],
      })

  }

  get prenom() {
    return this.RegisterForm.get('prenom');
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


  ngOnInit(): void {
   // this.auth.isAuth$
   let data= JSON.parse(localStorage.getItem('auth'))
   let mag= JSON.parse(localStorage.getItem('magasin'))
   this.isUser=data["data"]


   this.userSUb= this.allusersService.users$.subscribe(
    (userAl:Users[])=>{
        this.users =userAl
        this.RegisterForm.patchValue({
          nom: userAl[0]["nomUser"],
          tel:userAl[0]["tel"],
          prenom: userAl[0]["prenom"],
          email: userAl[0]["email"],

          });

        this.Loading=true;

    },
    (err)=>{
      this.Loading=false;
      console.log(err)
    }
  );
  this.allusersService.getbyId( data["data"]['id']);

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.userSUb.unsubscribe();
  }







  onSubmit(){
    this.submitted = true;
    if (this.RegisterForm.invalid) {
      return;
    }
    let data= JSON.parse(localStorage.getItem('auth'))
    const email = this.RegisterForm.get('email').value;
    const prenom = this.RegisterForm.get('prenom').value;
    const nom = this.RegisterForm.get('nom').value;
    const tel = this.RegisterForm.get('tel').value;




  let  datas={
      "idUser":data["data"]['id'],
      "nom": nom,
      "prenom": prenom,
      "email": email,
      "tel": tel
    }

    this.allusersService.updateUser(datas)
      .then((data) => {
        this.succesMessage=data["message"];

       // window.location.reload();
        this.router.navigate(['/mon-profil'])

      })
      .catch((err) => {
        this.formData = new FormData();

        this.errorMessage = err;
      })

  }
}
