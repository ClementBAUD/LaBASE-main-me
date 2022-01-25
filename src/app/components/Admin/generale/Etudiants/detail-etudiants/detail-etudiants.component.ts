import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Statutcompts } from 'src/app/models/statutcompts';
import { Users } from 'src/app/models/users';
import { AutreService } from 'src/app/services/other/autre.service';
import { AllUsersService } from 'src/app/services/users/all-users.service';
import { WebNotificationServiceService } from 'src/app/services/web-notification-service.service';

@Component({
  selector: 'app-detail-etudiants',
  templateUrl: './detail-etudiants.component.html',
  styleUrls: ['./detail-etudiants.component.css']
})
export class DetailEtudiantsComponent implements OnInit {


  users : Users[];
  userSUb:Subscription;

  statut:Statutcompts[];
  statutSUb:Subscription;

  Loading:boolean;

  errorMessage: string;
  succesMessage:string;
  succesMessageNot:string;
  succesMessageEmail:string;
  succesMessageUpadate:string;

  submitted = false;
  formData = new FormData();
  changeStatutForm;

  UserId="";
  emailUser;

  constructor(private fromBuilder: FormBuilder,private route: ActivatedRoute,private http: HttpClient,
    private allusersService:AllUsersService ,private autreService:AutreService,
    private webNotification:WebNotificationServiceService) {
    this.changeStatutForm = this.fromBuilder.group({
      StatutcomptId: ['', [Validators.required]],
      date: ['', [Validators.required]]
      })
   }

  ngOnInit(): void {
    window.scrollTo(0,0);
    const id = +this.route.snapshot.params["id"];

      this.userSUb= this.allusersService.users$.subscribe(
        (userAl:Users[])=>{
            this.users =userAl

            this.UserId=this.users[0]['userId']
            this.emailUser=this.users[0]['email']
            this.Loading=true;
        },
        (err)=>{
          this.Loading=false;
          console.log(err)
        }
      );


      // liste des statuts comptes
      this.statutSUb = this.autreService.statutcomptes$.subscribe(
        (userAl)=>{
            this.statut =userAl['rows']
            this.Loading=true;
        },
        (err)=>{
          this.Loading=false;
          console.log(err)
        }
      );


      this.allusersService.getbyId(id.toString());
      this.autreService.getStatutCompte();


  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.userSUb.unsubscribe();
    this.statutSUb.unsubscribe();
  }

  get StatutcomptId() {
    return this.changeStatutForm.get('StatutcomptId');
  }
  get date() {
    return this.changeStatutForm.get('date');
  }

  onSubmit(iduser:string){
    this.submitted = true;
    if (this.changeStatutForm.invalid) {
      return;
    }

    const StatutcomptId = this.changeStatutForm.get('StatutcomptId').value;
    const date = this.changeStatutForm.get('date').value;
    const dataall = JSON.parse(localStorage.getItem('auth'));
    let info=""


    if (StatutcomptId.nom=="valider") {
       info="valider";
    }
    if (StatutcomptId.nom=="attente") {
        info="attente";
    }
    if (StatutcomptId.nom=="suspendu") {
        info="suspendu";
    }
    if (StatutcomptId.nom=="renouvellement") {
        info="renouvellement";
    }

    let data={
      idUser:dataall['data'].id,
      id:iduser,
      dateExp:date,
      StatutcomptId:StatutcomptId.id
    }

    let message = info
    let receiverEmail = this.emailUser

    this.allusersService.updateStatutCompte(data)
      .then((datas:any)=>{
        this.succesMessage=datas
        this.onSubmitEmail(message,receiverEmail)

       // this.onSubmitnotif(iduser,ti,info)
       this.StatutSubscription(iduser,StatutcomptId.nom);

      window.location.reload();


      })
      .catch((err)=>{
        this.formData = new FormData();

        this.errorMessage=err;
      })

  }

  onSubmitnotif(userId,titre,info) {

    // this.webNotification.sendNotificationUser(userId,titre,info)
    // .then((datas) => {
    //   console.log(datas["message"])
    //  // this.succesMessageNot=datas["message"];

    // })
    // .catch((err) => {

    //   this.errorMessage = err;
    // });


  }

  onSubmitEmail(message,receiverEmail) {


    this.webNotification.SendEmail(message,receiverEmail)
    .then((datas) => {
     // console.log(datas["message"])
     console.log(datas)
      this.succesMessageNot=datas["message"];

    })
    .catch((err) => {

      this.errorMessage = err;
    });


  }

  StatutSubscription(userId,titre) {

    this.webNotification.updateStatutSubscription(userId,titre)
    .then((datas) => {
     this.succesMessageUpadate=datas["message"];
    })
    .catch((err) => {

      this.errorMessage = err;
    });


  }

}
