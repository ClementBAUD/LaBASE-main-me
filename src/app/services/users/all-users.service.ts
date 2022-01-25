import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Data } from 'src/app/models/data';
import { environment } from 'src/environments/environment';
import { Users } from './../../models/Users';

@Injectable({
  providedIn: 'root'
})
export class AllUsersService {

  private api = environment.api;
  usersall:Users[];
  usersall$= new Subject<Users[]>();

  users:Users[];
  users$= new Subject<Users[]>()

  userscompte:Users[];
  userscompte$= new Subject<Users[]>()

  userscompteUp:Users[];
  userscompteUp$= new Subject<Users[]>()

  usersdelete:Users[];
  usersdelete$= new Subject<Users[]>()

  userscreate:Users[];
  userscreate$= new Subject<Users[]>()

  listeusersMag:Users[];
  listeusersMag$= new Subject<Users[]>()

  listeusersMagParticulier:Users[];
  listeusersMagParticulier$= new Subject<Users[]>()


  constructor(private http:HttpClient,private router:Router) { }

  emitUsers() {
    this.usersall$.next(this.usersall)
  }

  emitUser() {
    this.users$.next(this.users)
  }

  emitCompteUserUp() {
    this.userscompteUp$.next(this.userscompteUp)
  }

  emitCompteUser() {
    this.userscompte$.next(this.userscompte)
  }

  emitDeleteUser() {
    this.usersdelete$.next(this.usersdelete)
  }

  emitlisteusersMag() {
    this.listeusersMag$.next(this.listeusersMag)
  }

  emitlisteusersMagParticulier() {
    this.listeusersMagParticulier$.next(this.listeusersMagParticulier)
  }

  // liste de tous les magasins
  getAllUsers(){
    const data = JSON.parse(localStorage.getItem('auth'))

     const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${data.token}`})

      this.http.get(this.api+'users/alluser',{headers:yourHeader}).subscribe(
        (datas)=>{
            if (datas["statut"] == true) {
              this.usersall=datas["data"]
              this.emitUsers();
            }else{
              console.log(datas)

            }
        },(err)=>{

          if (typeof err.error["error"]) {

            let message =err.error["message"]
            const navigationExtras: NavigationExtras = {state: {data: message}};
            this.router.navigate(['/'], navigationExtras);

          }else{
            let message ="Une erreur inconnue a été déclenchée, veuillez vous reconnecter."
            const navigationExtras: NavigationExtras = {state: {data: message}};
            this.router.navigate(['/'], navigationExtras);
          }
        }
      )
  }

  getbyId(idUser:string){

    const data = JSON.parse(localStorage.getItem('auth'))

     const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${data.token}`})

      const params = new HttpParams()
            .set('id', idUser)

      this.http.get(this.api+'users/detail',{headers:yourHeader,params:params}).subscribe(
        (datas)=>{
            if (datas["statut"] == true) {
              this.users=datas["data"]
              this.emitUser();
            }else{
              console.log(datas["message"])
            }
        },(err)=>{

          if (typeof err.error["error"]) {

            let message =err.error["message"]
            const navigationExtras: NavigationExtras = {state: {data: message}};
            this.router.navigate(['/'], navigationExtras);

          }else{
            let message ="Une erreur inconnue a été déclenchée, veuillez vous reconnecter."
            const navigationExtras: NavigationExtras = {state: {data: message}};
            this.router.navigate(['/'], navigationExtras);
          }
        }
      )

  }

  // update statut compte
  updateStatutCompte(data) {
    const datas = JSON.parse(localStorage.getItem('auth'))

    const yourHeader: HttpHeaders = new HttpHeaders({
     Authorization: `${datas.token}`})

    return new Promise((resolve, reject) => {
      this.http.put(this.api + 'users/updateStatutComptes', data,{headers:yourHeader}).subscribe(
        (data) => {
          console.log(data)
          if (data["statut"] == true) {

            this.userscompteUp=data["message"]

            resolve(this.userscompteUp);
          }
          else {
            reject(data['message'])
          }
          console.log(data) 
        }, (err) => {
          if (typeof err.error["error"]) {

            let message =err.error["message"]
            const navigationExtras: NavigationExtras = {state: {data: message}};
            this.router.navigate(['/'], navigationExtras);

          }else{
            reject(err.error.message)
          }
        }
      )
    })

  }

  //delete user
  deleteuser(data) {
    const datas = JSON.parse(localStorage.getItem('auth'))

    const yourHeader: HttpHeaders = new HttpHeaders({
     Authorization: `${datas.token}`})

    return new Promise((resolve, reject) => {
      this.http.put(this.api + 'users/deleteUser', data,{headers:yourHeader}).subscribe(
        (data) => {
          if (data["statut"] == true) {

            this.usersdelete=data["message"]

            resolve(this.usersdelete);
          }
          else {
            reject(data['message'])
          }

        }, (err) => {

          if (typeof err.error["error"]) {

            let message =err.error["message"]
            const navigationExtras: NavigationExtras = {state: {data: message}};
            this.router.navigate(['/'], navigationExtras);

          }else{
            reject(err.error.message)
          }
        }
      )
    })

  }

  // creation utilisateur

  creationuser(data) {
    const datas = JSON.parse(localStorage.getItem('auth'))

    const yourHeader: HttpHeaders = new HttpHeaders({
     Authorization: `${datas.token}`})

    return new Promise((resolve, reject) => {
      this.http.post(this.api + 'users/registerUser', data,{headers:yourHeader}).subscribe(
        (data) => {
          console.log(data)
          if (data["statut"] == true) {
            resolve(data)
            console.log(data)
          }
          else {

            reject(data['message'])
          }
          console.log(data)
        }, (err) => {

          if (typeof err.error["error"]) {

            let message =err.error["message"]
            const navigationExtras: NavigationExtras = {state: {data: message}};
            this.router.navigate(['/'], navigationExtras);

          }else{
            reject(err.error.message)
          }
        }
      )
    })

  }

  // liste utilisateur profile magasin
  listeusermagasin(){
    const data = JSON.parse(localStorage.getItem('auth'))

     const yourHeader: HttpHeaders = new HttpHeaders({
      Authorization: `${data.token}`})

      this.http.get(this.api+'users/listeUserProfileMagasinAll',{headers:yourHeader}).subscribe(
        (datas)=>{
            if (datas["statut"] == true) {
              this.listeusersMag=datas["data"]

              this.emitlisteusersMag();
            }else{
              console.log(datas)

            }
        },(err)=>{

          if (typeof err.error["error"]) {

            let message =err.error["message"]
            const navigationExtras: NavigationExtras = {state: {data: message}};
            this.router.navigate(['/'], navigationExtras);

          }else{
            let message ="Une erreur inconnue a été déclenchée, veuillez vous reconnecter."
            const navigationExtras: NavigationExtras = {state: {data: message}};
            this.router.navigate(['/'], navigationExtras);
          }
        }
      )
  }


  listeusersMagPart(idMag){
    const data = JSON.parse(localStorage.getItem('auth'))

    const yourHeader: HttpHeaders = new HttpHeaders({
     Authorization: `${data.token}`})

     const params = new HttpParams()
           .set('idmagasin', idMag)

     this.http.get(this.api+'magasin/users',{headers:yourHeader,params:params}).subscribe(
       (datas)=>{
           if (datas["statut"] == true) {

             this.listeusersMagParticulier=datas["resultat"]

             this.emitlisteusersMagParticulier();
           }else{
             console.log(datas["message"])
           }
       },(err)=>{

         if (typeof err.error["error"]) {

           let message =err.error["message"]
           const navigationExtras: NavigationExtras = {state: {data: message}};
           this.router.navigate(['/'], navigationExtras);

         }else{
           let message ="Une erreur inconnue a été déclenchée, veuillez vous reconnecter."
           const navigationExtras: NavigationExtras = {state: {data: message}};
           this.router.navigate(['/'], navigationExtras);
         }
       }
     )
  }


  updateUser(data){
    const datas = JSON.parse(localStorage.getItem('auth'))

    const yourHeader: HttpHeaders = new HttpHeaders({
     Authorization: `${datas.token}`})

    return new Promise((resolve, reject) => {
      this.http.put(this.api + 'users/updateusers', data,{headers:yourHeader}).subscribe(
        (data) => {
          if (data["statut"] == true) {

            resolve(data["message"]);
          }
          else {
            reject(data['message'])
          }

        }, (err) => {

          if (typeof err.error["error"]) {

            let message =err.error["message"]
            const navigationExtras: NavigationExtras = {state: {data: message}};
            this.router.navigate(['/'], navigationExtras);

          }else{
            reject(err.error.message)
          }
        }
      )
    })
  }
}
