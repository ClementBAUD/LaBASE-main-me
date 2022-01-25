import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Data } from 'src/app/models/data';
import { environment } from 'src/environments/environment';
import { AuthService } from '../authentification/auth.service';
import { Magasin } from './../../models/magasin';

@Injectable({
  providedIn: 'root'
})
export class MagasinService {
  private api = environment.api;

  magasins:Magasin[];
  magasins$= new Subject<Magasin[]>()

  magasin:Magasin[];
  magasin$= new Subject<Magasin[]>()

  magasinsCreation:Magasin[];
  magasinsCreation$= new Subject<Magasin[]>()


  constructor(private http:HttpClient,private router :Router,private auth:AuthService) { }

  emitMagasin() {
    this.magasins$.next(this.magasins)
  }

  emitMagasins() {
    this.magasin$.next(this.magasin)
  }

  // liste de tous les magasins
  getMagasins(){


   let abo={
      magasin:'magasin'
    }
      this.http.post(this.api+'magasin/listmagasin',abo).subscribe(
        (datas)=>{

            if (datas["statut"] == true) {
                this.magasins=datas["data"]['rows']
                this.emitMagasin();
            }else{
              console.log(datas["message"])
            }
        },(err)=>{
          console.log(err)
        }
      )
  }

  getMagasinsAllTest(mag){
    let abo={
      magasin:mag
    }
    return new Promise((resolve, reject) => {
      this.http.post(this.api + 'magasin/listmagasin',abo).subscribe(
        (data) => {
          if (data["statut"] == true) {
            resolve(data)
          }
          else {

            reject(data['message'])
          }

        }, (err) => {
          if (err['error']['message']=="veuillez vous connecter à nouveau.") {
            this.auth.logoutUser()
            const navigationExtras: NavigationExtras = {state: {data: err['error']['message']}};
            this.router.navigate(['/'], navigationExtras);
          } else {
            reject(err.error.message)
          }

        }
      )
    })
}

  getMagasinsById(id:string){

     const data = JSON.parse(localStorage.getItem('auth'))

      const yourHeader: HttpHeaders = new HttpHeaders({
       Authorization: `${data.token}`})

       const params = new HttpParams()
             .set('id', id)
             return new Promise((resolve, reject) => {
              this.http.get(this.api + 'magasin/detail',{headers:yourHeader,params:params}).subscribe(
                (data) => {
                  if (data["statut"] == true) {
                    resolve(data["data"])
                  }
                  else {

                    reject(data['message'])
                  }

                }, (err) => {
                  if (err['error']['message']=="veuillez vous connecter à nouveau.") {
                    this.auth.logoutUser()
                    const navigationExtras: NavigationExtras = {state: {data: err['error']['message']}};
                    this.router.navigate(['/'], navigationExtras);
                  } else {
                    reject(err.error.message)
                  }

                }
              )
            })


}

getByIdMagasins(id:string){

  const data = JSON.parse(localStorage.getItem('auth'))

   const yourHeader: HttpHeaders = new HttpHeaders({
    Authorization: `${data.token}`})

    const params = new HttpParams()
          .set('id', id)

          return new Promise((resolve, reject) => {
            this.http.get(this.api + 'magasin/detail',{headers:yourHeader,params:params}).subscribe(
              (data) => {
                if (data["statut"] == true) {
                  resolve(data)
                }
                else {

                  reject(data['message'])
                }

              }, (err) => {
                if (err['error']['message']=="veuillez vous connecter à nouveau.") {
                  this.auth.logoutUser()
                  const navigationExtras: NavigationExtras = {state: {data: err['error']['message']}};
                  this.router.navigate(['/'], navigationExtras);
                } else {
                  reject(err.error.message)
                }

              }
            )
          })


}

getcount(id:string){

  const data = JSON.parse(localStorage.getItem('auth'))
  const yourHeader: HttpHeaders = new HttpHeaders({
                  Authorization: `${data.token}`})

    const params = new HttpParams()
          .set('idUser', id)

          return new Promise((resolve, reject) => {
            this.http.get(this.api + 'listcommande/nombre_commande_user',{headers:yourHeader,params:params}).subscribe(
              (data) => {
                if (data["statut"] == true) {
                  console.log(data)
                  resolve(data)
                }
                else {

                  reject(data['message'])
                }

              }, (err) => {

                if (err['error']['message']=="veuillez vous connecter à nouveau.") {
                  this.auth.logoutUser()
                  const navigationExtras: NavigationExtras = {state: {data: err['error']['message']}};
                  this.router.navigate(['/'], navigationExtras);
                } else {
                  reject(err.error.message)
                }
              }
            )
          })


}
// creation magasin
creationMag(data) {
  const datas = JSON.parse(localStorage.getItem('auth'))

  const yourHeader: HttpHeaders = new HttpHeaders({
   Authorization: `${datas.token}`})

  return new Promise((resolve, reject) => {
    this.http.post(this.api + 'magasin/creation', data,{headers:yourHeader}).subscribe(
      (data) => {
        if (data["statut"] == true) {
          resolve(data)
        }
        else {

          reject(data['message'])
        }

      }, (err) => {

        if (err['error']['message']=="veuillez vous connecter à nouveau.") {
          this.auth.logoutUser()
          const navigationExtras: NavigationExtras = {state: {data: err['error']['message']}};
          this.router.navigate(['/'], navigationExtras);
        } else {
          reject(err.error.message)
        }

      }
    )
  })

}

UpdateMag(data) {
  const datas = JSON.parse(localStorage.getItem('auth'))

  const yourHeader: HttpHeaders = new HttpHeaders({
   Authorization: `${datas.token}`})

  return new Promise((resolve, reject) => {
    this.http.put(this.api + 'magasin/update', data,{headers:yourHeader}).subscribe(
      (data) => {
        if (data["statut"] == true) {
          resolve(data)
        }
        else {

          reject(data['message'])
        }

      }, (err) => {

        if (err['error']['message']=="veuillez vous connecter à nouveau.") {
          this.auth.logoutUser()
          const navigationExtras: NavigationExtras = {state: {data: err['error']['message']}};
          this.router.navigate(['/'], navigationExtras);
        } else {
          reject(err.error.message)
        }
      }
    )
  })

}



}
