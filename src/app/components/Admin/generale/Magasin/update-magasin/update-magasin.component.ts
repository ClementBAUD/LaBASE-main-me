import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Users } from 'src/app/models/users';
import { AllUsersService } from 'src/app/services/users/all-users.service';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { ConfirmedValidator } from './../../../../../confirmed.validator';
import { ActivatedRoute, NavigationExtras, Router  } from '@angular/router';
import { MagasinService } from 'src/app/services/magasins/magasin.service';
import { Magasin } from 'src/app/models/magasin';

@Component({
  selector: 'app-update-magasin',
  templateUrl: './update-magasin.component.html',
  styleUrls: ['./update-magasin.component.css']
})
export class UpdateMagasinComponent implements OnInit {
  addMagasin;
  errorMessage: string;
  submitted = false;
  formData = new FormData();

  listeUser : Users[];
  listeUserSub:Subscription;

  userlisteMag : Users[];
  userlisteMagSub:Subscription;

  magasin : Magasin[];
  magasinSub:Subscription;

  Loading:boolean;

  constructor(private fromBuilder: FormBuilder,private router:Router,private routes: ActivatedRoute,private allusersService:AllUsersService,private magasinservice:MagasinService) {

    this.addMagasin = this.fromBuilder.group({

      email: ['', [Validators.required, Validators.email]],
      heureOuverture: ['', [Validators.required]],
      heureFermeture: ['', [Validators.required]],
      adress: ['', [Validators.required]],
      nom: ['', [Validators.required]],
      tel: ['', [Validators.required, Validators.minLength(5)]],
      nomUser: ['', [Validators.required, Validators.minLength(5)]],
      description:['', [Validators.required]],
      nameUser:[''],

      })

   }

  get nomUser() {
    return this.addMagasin.get('nomUser');
  }

  get nameUser() {
    return this.addMagasin.get('nameUser');
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

  get description() {
    return this.addMagasin.get('description');
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

    const id = this.routes.snapshot.params["id"];
    this.magasinservice.getMagasinsById(id).then((mag:Magasin[]) => {

        this.magasin=mag
        this.addMagasin.patchValue({
        nom: this.magasin["nom"],
        tel: this.magasin["tel"],
        adress: this.magasin["adresse"],
        heureOuverture: this.magasin["HeureOuverture"],
        heureFermeture: this.magasin["HeureFermeture"],
        email: this.magasin["email"],
        nomUser: this.magasin["UserId"],
        description: this.magasin["description"],
        ouvert: this.magasin["Ouvert"]
        });
      this.Loading=true;

    })
    .catch((err) => {
      this.errorMessage = err;
      this.Loading=false;
    })


    this.allusersService.listeusermagasin();

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.userlisteMagSub.unsubscribe();
 //   this.magasinSub.unsubscribe();
  }

  onSubmit(){
    this.submitted = true;
    if (this.addMagasin.invalid) {
      return;
    }
    const id = this.routes.snapshot.params["id"];

    const email = this.addMagasin.get('email').value;
    const nomUser = this.addMagasin.get('nomUser').value;
    const adress = this.addMagasin.get('adress').value;
    const nom = this.addMagasin.get('nom').value;
    const heureOuverture = this.addMagasin.get('heureOuverture').value;
    const tel = this.addMagasin.get('tel').value;
    const heureFermeture = this.addMagasin.get('heureFermeture').value;
    const description = this.addMagasin.get('description').value;
    //const nameUser =this.addMagasin.get('nameUser').value;
    //console.log(nameUser)

      this.formData.append("nom", nom);
      this.formData.append("adresse", adress);
      this.formData.append("email", email);
      this.formData.append("heureouverture", heureOuverture);
      this.formData.append("tel", tel);
      this.formData.append("ouvert", "False");
      this.formData.append("heurefermeture", heureFermeture);
      this.formData.append("id", id);
      this.formData.append("idUSer", nomUser);
      this.formData.append("description", description);



    this.magasinservice.UpdateMag(this.formData)
      .then((datas:any)=>{
        this.router.navigate(['/liste-magasin'])

      })
      .catch((err)=>{
        this.formData = new FormData();

        this.errorMessage=err;
      })


  }

}
