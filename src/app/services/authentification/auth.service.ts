import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { resolve } from '@angular/compiler-cli/src/ngtsc/file_system';
import { Injectable } from '@angular/core';
import { rejects } from 'assert';
import { BehaviorSubject } from 'rxjs';
import { promise } from 'selenium-webdriver';
import { environment } from 'src/environments/environment';
import { Users } from './../../models/users';
import { Magasin } from './../../models/magasin';
import { Subject } from 'rxjs';
import { WebNotificationServiceService } from '../web-notification-service.service';
import { SwPush } from '@angular/service-worker';
import { AbonnementUser } from './../../models/abonnement-user';
import { exit } from 'process';
import { NavigationExtras, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;
  private api = environment.api;
  token: string;
  tokenpassword: string;
  statut_compte: string;
  profil:string
  userID: string;
  isLogin = false;
  isAuth = false;
  roleAs: string;



  // observable qui verifier sur l'utilisateur est connecter ou pas
  isAuth$ = new BehaviorSubject<Boolean>(false);
  uploadedFiles: Array < File > ;

  magasins:Magasin[];
  magasins$= new Subject<Magasin[]>()

  users:Users[];
  users$= new Subject<Users[]>()

  constructor(private http: HttpClient,private swPush: SwPush,private router:Router) {
      this.iniAuth()
  }

  iniAuth(){
    if (typeof localStorage !== "undefined") {
      const data = JSON.parse(localStorage.getItem('auth'))


      if (data) {
        if (data.token && data.data) {
            this.token= data.token,
            this.user = data.datauser,
            this.isAuth$.next(true)

        }
      }
    }
  }

  emitUsers() {
    this.users$.next(this.users)
  }

  emitMagasin() {
    this.magasins$.next(this.magasins)
  }


  connexion(email: string, password: string) {
    //partial
    localStorage.setItem('partial',null)
    return new Promise((resolve, reject) => {
      this.http.post(this.api + 'users/login', { email: email, password: password }).subscribe(
        (data) => {
          if (data["statut"] == true) {
            this.token = data["token"],
            this.user = data["data"]

              if (typeof localStorage !== 'undefined') {
                localStorage.setItem('UsersMagasinListe',JSON.stringify(data["data"]))
                localStorage.setItem('auth',JSON.stringify(data))
                localStorage.setItem('STATE', 'true');
                this.isLogin = true;

                this.roleAs =  data["data"]['profile']+'-'+data["data"]['satutcompte']
                localStorage.setItem('Profile',this.roleAs   )

                this.isAuth$.next(true)

              }


            this.isAuth$.next(true)

              this.getContraintes().then((datas) => {
                localStorage.setItem('contrainte', JSON.stringify(datas));
                resolve(this.user)
              }).catch((err) => {
                reject(err)
              })

          }
          else {
            reject(data['message'])
          }

        }, (err) => {

          reject(err.error.message)
        }
      )
    })

  }

  inscription(newUser,newuser) {


    return new Promise((resolve, reject) => {
      this.http.post(this.api + 'users/register', newUser).subscribe(
        (dataUsers: { statut: boolean, users: Users, message: string }) => {
          //authentification
          if (dataUsers.statut == true) {
             this.connexion(newuser.email, newuser.password)
              .then((data) => {
                //this.subscribeToNotification()
                resolve(data)
              })
              .catch((err) => {
                reject(err)
              })
          }
          else {
            reject(dataUsers.message)
          }
        }, (err) => {

          reject(err.error.message)
        }
      )
    })
  }

  register(newUser) {


    return new Promise((resolve, reject) => {
      this.http.post(this.api + 'users/inscription', newUser).subscribe(
        (dataUsers) => {
          //authentification
          if (dataUsers['statut'] == true) {
            resolve(dataUsers['userData'])
          }
          else {
            reject(dataUsers['message'])
          }
        }, (err) => {

          reject(err.error.message)
        }
      )
    })
  }

  selectMagasin(email,magasinId) {

    let datas ={
      email:email,
      magasinId:magasinId
    }
    return new Promise((resolve, reject) => {
      this.http.post(this.api + 'users/selectMagasin', datas).subscribe(
        (data) => {
          console.log(data['data'])
          //authentification
          resolve(data)
        }, (err) => {

          reject(err.error.message)
        }
      )
    })
  }


  logout() {

    this.isAuth$.next(false);
    this.token=null;
    this.isLogin = false;
    this.roleAs = '';
    this.user=null;
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
      localStorage.setItem('STATE', 'false');

    }
  }

  logoutUser() {

    this.isAuth$.next(false);
    this.token=null;
    this.isLogin = false;
    this.roleAs = '';
    this.user=null;

    if (typeof localStorage !== 'undefined') {

     localStorage.clear();
     localStorage.setItem('STATE', 'false');



    }
  }

  getProfile() {
    this.roleAs = localStorage.getItem('Profile');
    return this.roleAs;
  }

  isLoggedIn() {
    const loggedIn = localStorage.getItem('STATE');
    if (loggedIn == 'true')
      this.isLogin = true;
    else
      this.isLogin = false;
    return this.isLogin;
  }


  getMagasin(id:string){
    const data = JSON.parse(localStorage.getItem('auth'))

    const yourHeader: HttpHeaders = new HttpHeaders({
      'Content-Type:':'Content-Type',
      Authorization: `${data.token}`
    })

   let headers = new HttpHeaders()
   headers=headers.append('Access-Control-Allow-Origin', '*')
   if (!headers.has('content-type')) {
     headers=headers.append('content-type','application/json')
   }
    headers=headers.append('Authorization',`${data.token}`)



      const params = new HttpParams()
            .set('iduser', id)

    return new Promise((resolve, reject) => {
      this.http.get(this.api + 'magasin/magasin-users',{headers:headers,params:params}).subscribe(
        (dataUsers) => {
             resolve(dataUsers['resultat'])
        }), (err) => {

          if (err['error']['message']=="veuillez vous connecter à nouveau.") {
            this.logoutUser()
            const navigationExtras: NavigationExtras = {state: {data: err['error']['message']}};
            this.router.navigate(['/'], navigationExtras);
          } else {
            reject(err.error.message)
          }
        }
      })
    }

    getContraintes(){

      return new Promise((resolve, reject) => {
        this.http.get(this.api + 'parametre/liste').subscribe(
          (dataUsers) => {

            resolve(dataUsers['data'])
          }), (err) => {
            if (err['error']['message']=="veuillez vous connecter à nouveau.") {
              this.logoutUser()
              const navigationExtras: NavigationExtras = {state: {data: err['error']['message']}};
              this.router.navigate(['/'], navigationExtras);
            } else {
              reject(err.error.message)
            }
          }
        })
      }



  getMagasinUser(id:string,token:string){


     /*  const yourHeader: HttpHeaders = new HttpHeaders({
       Authorization: `${token}`})

       const params = new HttpParams()
             .set('iduser', id)

     return new Promise((resolve, reject) => {
       this.http.get(this.api + 'magasin/users',{params:params}).subscribe(
         (dataUsers) => {

           resolve(dataUsers['resultat'])
         }), (err) => {
           reject(err)
         }
       }) */
     }

  changepassword(email){
      return new Promise((resolve, reject) => {
        this.http.put(this.api + 'users/resetPassword', {email: email }).subscribe(
          (data) => {
            if (data["statut"] == true) {
              this.token = data["token"],
              this.user = data["data"],
              resolve(data);
            }
            else {
              reject(data['message'])
            }

          }, (err) => {

            reject(err.error.message)
          }
        )
      })
    }

  confirmpassword(password,token,id){
      return new Promise((resolve, reject) => {
        this.http.put(this.api + 'users/updatePassword', {password: password,token:token,id:id }).subscribe(
          (data) => {
            if (data["statut"] == true) {
             //  const resulta = data["message"],
              resolve(data["message"]);
            }
            else {
              reject(data['message'])
            }

          }, (err) => {

            reject(err.error.message)
          }
        )
      })
    }

    online(id:string,valeur:string){

    const datas = JSON.parse(localStorage.getItem('auth'))
    const yourHeader: HttpHeaders = new HttpHeaders({
     Authorization: `${datas.token}`})

      let obj = new String(valeur);
      if (obj=="1") {
        valeur="0" ;
      }
      if (obj=="0") {
        valeur="1" ;
      }

     let  data={
      id: id,
      ouvert: valeur,
      }


      return new Promise((resolve, reject) => {
        this.http.put(this.api + 'magasin/magasin-online',data,{headers:yourHeader}).subscribe(
          (data) => {

            localStorage.setItem('statut', JSON.stringify(data["data"]["Ouvert"]));
            resolve(true);
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


    changeMagasin(UserId,idMag){

      const datas = JSON.parse(localStorage.getItem('auth'))
      const yourHeader: HttpHeaders = new HttpHeaders({
       Authorization: `${datas.token}`})

      return new Promise((resolve, reject) => {
        this.http.post(this.api + 'users/changeMagasin', {UserId: UserId,idMag:idMag },{headers:yourHeader}).subscribe(
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


    // upadate certificat
    upadateCertificat(datauser) {
      const datas = JSON.parse(localStorage.getItem('auth'))
    const yourHeader: HttpHeaders = new HttpHeaders({
     Authorization: `${datas.token}`})

      return new Promise((resolve, reject) => {
        this.http.put(this.api + 'users/certificat', datauser,{headers:yourHeader}).subscribe(
          (data) => {
            //authentification
            if (data["statut"] == true) {
              resolve(data);
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
    //update profil

}
