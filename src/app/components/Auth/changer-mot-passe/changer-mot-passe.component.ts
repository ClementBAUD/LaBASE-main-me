import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/services/authentification/auth.service';


@Component({
  selector: 'app-changer-mot-passe',
  templateUrl: './changer-mot-passe.component.html',
  styleUrls: ['./changer-mot-passe.component.css']
})
export class ChangerMotPasseComponent implements OnInit {

  passwordForgo: FormGroup;
  errormessage: string;
  submitted = false;



  constructor(private fromBuilder: FormBuilder,private router:Router,private auth:AuthService) {

    this.passwordForgo = this.fromBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      })
   }

  ngOnInit(): void {
    //intialisation du formulaire

  }


  get email() {
    return this.passwordForgo.get('email');
  }

  onSubmit(){
    this.submitted = true;
    if (this.passwordForgo.invalid) {
      return;
    }
    const email = this.passwordForgo.get('email').value;

    this.auth.changepassword(email)
    .then((data)=>{
      let navigationExtras: NavigationExtras = {
        queryParams: { 'notif': data['data']+'-'+data['token'] },
        fragment: 'anchor'
      };

        this.router.navigate(['/forgot-password-valider'],navigationExtras)

      ///this.router.navigate(['/home'])
    })
    .catch((err)=>{
      console.log(err)
      //this.passwordForgo = new FormData();

      this.errormessage=err;
    })

  }

}
