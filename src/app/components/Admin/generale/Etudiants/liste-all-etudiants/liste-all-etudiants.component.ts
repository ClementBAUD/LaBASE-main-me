import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Users } from 'src/app/models/users';
import { Subscription } from 'rxjs';
import { AllUsersService } from 'src/app/services/users/all-users.service';
import { Statutcompts } from 'src/app/models/statutcompts';
import { NavigationExtras } from '@angular/router';




@Component({
  selector: 'app-liste-all-etudiants',
  templateUrl: './liste-all-etudiants.component.html',
  styleUrls: ['./liste-all-etudiants.component.css']
})
export class ListeAllEtudiantsComponent implements OnInit {
  page = 1;
  pageSize = 500;
  collectionSize: number;
  currentRate = 8;

  userliste : Users[];
  userStatut: Users[];
  userlisteSub:Subscription;

  Loading:boolean;


  title = 'Liste des Etudiants';
  dtOptions: any = {};
  router: any;
  api: string;


  constructor(private http: HttpClient,private allusersService:AllUsersService) { }

  ngOnInit(): void {

      this.userlisteSub= this.allusersService.usersall$.subscribe(
        (userAl:Users[])=>{
            this.userliste =userAl
            if (this.userliste.length>0) {
              this.Loading=true;
            }else{

              setTimeout(function(){
                this.Loading=true;
              }, 1000);
            }

            this.Loading=true;
        },
        (err)=>{
          this.Loading=false;
         // console.log(err)
        }
      );

      this.allusersService.getAllUsers();

      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        processing: true,
        dom: 'Bfrtip',
          buttons: [
              'csv', 'excel', 'print'
          ]
      };
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.userlisteSub.unsubscribe();
  }

  deleteuser(){
    console.log("eee")
    //const data = JSON.parse(localStorage.getItem('auth'))
    //this.allusersService.deleteuser(data);  
    const datas = JSON.parse(localStorage.getItem('auth'))
      const yourHeader: HttpHeaders = new HttpHeaders({
       Authorization: `${datas.token}`})

      return new Promise((resolve, reject) => {
        this.http.post(this.api + 'users/deleteUser', {headers:yourHeader}).subscribe( // {idUser: idUser},
          (data) => {
            if (data["statut"] == true) {
              resolve(data["message"]);
            }
            else {
              reject(data['message'])
            }

          }, (err) => {

            if (err['error']['message']=="veuillez vous connecter à nouveau.") {
              this.logoutUser()
              const navigationExtras: NavigationExtras = {state: {data: err['error']['message']}};
              this.router.navigate(['/'], navigationExtras);
            } else {
              reject(err.error.message)
            }
          }
        )
      })









  }
  logoutUser() {
    throw new Error('Method not implemented.');
  }



  /*
changeStatusCompte(idUser,dateExp){

      const datas = JSON.parse(localStorage.getItem('auth'))
      const yourHeader: HttpHeaders = new HttpHeaders({
       Authorization: `${datas.token}`})

      return new Promise((resolve, reject) => {
        this.http.post(this.api + 'users/changeStatutCompte', {idUser: idUser,dateExp:dateExp },{headers:yourHeader}).subscribe(
          (data) => {
            if (data["statut"] == true) {
              resolve(data["message"]);
            }
            else {
              reject(data['message'])
            }

          }, (err) => {

            if (err['error']['message']=="veuillez vous connecter à nouveau.") {
              this.logoutUser()
              const navigationExtras: NavigationExtras = {state: {data: err['error']['message']}};
              this.router.navigate(['/'], navigationExtras);
            } else {
              reject(err.error.message)
            }
          }
        )
      })
    }

  */




}
