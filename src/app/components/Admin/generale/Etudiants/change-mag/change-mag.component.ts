import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Magasin } from 'src/app/models/magasin';
import { Statutcompts } from 'src/app/models/statutcompts';
import { Users } from 'src/app/models/users';
import { AuthService } from 'src/app/services/authentification/auth.service';
import { MagasinService } from 'src/app/services/magasins/magasin.service';
import { AutreService } from 'src/app/services/other/autre.service';
import { AllUsersService } from 'src/app/services/users/all-users.service';
import { WebNotificationServiceService } from 'src/app/services/web-notification-service.service';
@Component({
  selector: 'app-change-mag',
  templateUrl: './change-mag.component.html',
  styleUrls: ['./change-mag.component.css']
})
export class ChangeMagComponent implements OnInit {



  users : Users[];
  userSUb:Subscription;



  Loading:boolean;

  errorMessage: string;
  succesMessage:string;
  succesMessageNot:string;

  magasins : Magasin[];
  magasinSub:Subscription;

  submitted = false;
  formData = new FormData();
  changeStatutForm;

  UserId="";

  constructor(private fromBuilder: FormBuilder,private route: ActivatedRoute,private http: HttpClient,
    private allusersService:AllUsersService ,private autreService:AutreService,private auth:AuthService,
    private webNotification:WebNotificationServiceService,private magasinservice:MagasinService) {
    this.changeStatutForm = this.fromBuilder.group({
      magasinId: ['', [Validators.required]],
      })
   }

  ngOnInit(): void {
    window.scrollTo(0,0);
    const id = +this.route.snapshot.params["id"];

      this.userSUb= this.allusersService.users$.subscribe(
        (userAl:Users[])=>{
            this.users =userAl

            this.UserId=this.users[0]['userId']
            this.Loading=true;
        },
        (err)=>{
          this.Loading=false;
          console.log(err)
        }
      );


      // liste des statuts comptes
       //recuperation des magasins
    this.magasinSub= this.magasinservice.magasins$.subscribe(
      (mag:Magasin[])=>{
          this.magasins =mag
          this.Loading=true;
          console.log(this.magasins);
      },
      (err)=>{
        this.Loading=false;
        console.log(err)
      }
    );

    this.magasinservice.getMagasins();


      this.allusersService.getbyId(id.toString());


  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.userSUb.unsubscribe();
    this.magasinSub.unsubscribe();
  }

  get magasinId() {
    return this.changeStatutForm.get('magasinId');
  }

  onSubmit(iduser:string){
    this.submitted = true;
    if (this.changeStatutForm.invalid) {
      return;
    }

    const magasinId = this.changeStatutForm.get('magasinId').value;
    const dataall = JSON.parse(localStorage.getItem('auth'));
    let info="Votre demande de changement de magasin doit être validée."


    let data={
      idUser:dataall['data'].id,
      id:iduser,
      magasinId:magasinId.id
    }

    const  ti="Information concernant votre compte";
        this.auth.changeMagasin(iduser,magasinId.id)
      .then((datas:any)=>{
        this.succesMessage=datas
        this.onSubmitnotif(iduser,ti,info)
        this.StatutSubscription(iduser,magasinId.nom);
        window.location.reload();


      })
      .catch((err)=>{
        this.formData = new FormData();

        this.errorMessage=err;
      })

  }

  onSubmitnotif(userId,titre,info) {

    this.webNotification.sendNotificationUser(userId,titre,info)
    .then((datas) => {
      console.log(datas["message"])
     // this.succesMessageNot=datas["message"];

    })
    .catch((err) => {

      this.errorMessage = err;
    });


  }

  StatutSubscription(userId,titre) {

    this.webNotification.updateStatutSubscription(userId,titre)
    .then((datas) => {
      console.log(datas["message"])
     // this.succesMessageNot=datas["message"];
    })
    .catch((err) => {

      this.errorMessage = err;
    });


  }


}
