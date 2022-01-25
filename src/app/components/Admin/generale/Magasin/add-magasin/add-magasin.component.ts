import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Users } from 'src/app/models/users';
import { AllUsersService } from 'src/app/services/users/all-users.service';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { ConfirmedValidator } from './../../../../../confirmed.validator';
import { Router } from '@angular/router';
import { MagasinService } from 'src/app/services/magasins/magasin.service';

@Component({
  selector: 'app-add-magasin',
  templateUrl: './add-magasin.component.html',
  styleUrls: ['./add-magasin.component.css']
})
export class AddMagasinComponent implements OnInit {
  addMagasin;
  errorMessage: string;
  submitted = false;
  formData = new FormData();

  listeUser : Users[];
  listeUserSub:Subscription;

  userlisteMag : Users[];
  userlisteMagSub:Subscription;

  Loading:boolean;

  constructor(private fromBuilder: FormBuilder,private router:Router,private allusersService:AllUsersService,private magasinservice:MagasinService) {

    this.addMagasin = this.fromBuilder.group({

      email: ['', [Validators.required, Validators.email]],
      heureOuverture: ['', [Validators.required]],
      heureFermeture: ['', [Validators.required]],
      adress: ['', [Validators.required]],
      nom: ['', [Validators.required]],
      tel: ['', [Validators.required, Validators.minLength(5)]],
      nomUser: ['', [Validators.required, Validators.minLength(5)]],
      description:['', [Validators.required]],


      })

   }

   get nomUser() {
    return this.addMagasin.get('nomUser');
  }
  get description() {
    return this.addMagasin.get('description');
  }

  get nom() {
    return this.addMagasin.get('nom');
  }
  get email() {
    return this.addMagasin.get('email');
  }
  get heureOuverture() {
    return this.addMagasin.get('heureOuverture');
  }
  get tel() {
    return this.addMagasin.get('tel');
  }
  get adress() {
    return this.addMagasin.get('adress');
  }
  get heureFermeture() {
    return this.addMagasin.get('heureFermeture');
  }

  ngOnInit(): void {

    this.userlisteMagSub= this.allusersService.listeusersMag$.subscribe(
      (userAl:Users[])=>{
          this.userlisteMag =userAl
          this.Loading=true;
      },
      (err)=>{
        this.Loading=false;
       // console.log(err)
      }
    );


    this.allusersService.listeusermagasin();

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.userlisteMagSub.unsubscribe();
  }

  onSubmit(){
    this.submitted = true;
    if (this.addMagasin.invalid) {
      return;
    }

    const email = this.addMagasin.get('email').value;
    const nomUser = this.addMagasin.get('nomUser').value;
    const adress = this.addMagasin.get('adress').value;
    const nom = this.addMagasin.get('nom').value;
    const heureOuverture = this.addMagasin.get('heureOuverture').value;
    const tel = this.addMagasin.get('tel').value;
    const heureFermeture = this.addMagasin.get('heureFermeture').value;
    const description = this.addMagasin.get('description').value;

      this.formData.append("nom", nom);
      this.formData.append("adresse", adress);
      this.formData.append("email", email);
      this.formData.append("heureouverture", heureOuverture);
      this.formData.append("tel", tel);
      this.formData.append("heurefermeture", heureFermeture);
      this.formData.append("id", nomUser);
      this.formData.append("description", description);



    this.magasinservice.creationMag(this.formData)
      .then((datas:any)=>{
        this.router.navigate(['/liste-magasin'])

      })
      .catch((err)=>{
        this.formData = new FormData();

        this.errorMessage=err;
      })


  }


}
