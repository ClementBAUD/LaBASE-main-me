import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Data } from 'src/app/models/data';
import { environment } from 'src/environments/environment';
import { Statutcompts } from './../../models/statutcompts';
import { Produits } from 'src/app/models/produits';
import { Famille } from 'src/app/models/famille';


@Injectable({
    providedIn: 'root'
})
export class ProduitMiseDispoService {
    private api = environment.api;

    produits: Produits[];
    produits$ = new Subject<Produits[]>()

    produitM;
    produitM$ = new Subject()

    produitAlls: Produits[];
    produitAlls$ = new Subject<Produits[]>()

    produit: Produits[];
    produit$ = new Subject<Produits[]>()

    categorieproduit: Famille[];
    categorieproduit$ = new Subject<Famille[]>()

    produitcategorie: Produits[];
    produitcategorie$ = new Subject<Produits[]>()

    constructor(private http: HttpClient, private router: Router) { }

    emitProduitCategorie() {
        this.produitcategorie$.next(this.produitcategorie)
    }

    emitProduits() {
        this.produits$.next(this.produits)
    }
    emitProduitM() {
        this.produitM$.next(this.produitM)
    }

    emitproduitAlls() {
        this.produitAlls$.next(this.produitAlls)
    }

    emitProduit() {
        this.produit$.next(this.produit)
    }

    emitCategorieproduit() {
        this.categorieproduit$.next(this.categorieproduit)
    }

    // creation magasin
    creationProduit(data) {
        const datas = JSON.parse(localStorage.getItem('auth'))

        const yourHeader: HttpHeaders = new HttpHeaders({
            Authorization: `${datas.token}`
        })

        return new Promise((resolve, reject) => {
            this.http.post(this.api + 'Produit_dispo/creation', data, { headers: yourHeader }).subscribe(
                (data) => {
                    if (data["statut"] == true) {
                        resolve(data)
                    }
                    else {

                        reject(data['message'])
                    }

                }, (err) => {

                    if (typeof err.error["error"]) {

                        let message = err.error["message"]
                        const navigationExtras: NavigationExtras = { state: { data: message } };
                        this.router.navigate(['/'], navigationExtras);

                    } else {
                        reject(err.error.message)
                    }
                }
            )
        })

    }

    getProduitDispo(idmagasin) {
        const datas = JSON.parse(localStorage.getItem('auth'))

        const yourHeader: HttpHeaders = new HttpHeaders({
            Authorization: `${datas.token}`
        })

        const params = new HttpParams()
            .set('idmagasin', idmagasin)

        this.http.get(this.api + 'Produit_dispo/day', { headers: yourHeader, params: params }).subscribe(
            (datas) => {

                if (datas["statut"] == true) {
                    this.produits = datas["data"]
                    this.emitProduits();
                } else {

                    this.produits = datas["resul"].resultat
                    console.log(datas)
                }
            }, (err) => {

                if (typeof err.error["error"]) {

                    let message = err.error["message"]
                    const navigationExtras: NavigationExtras = { state: { data: message } };
                    this.router.navigate(['/'], navigationExtras);

                } else {
                    let message = "Une erreur inconnue a été déclenchée, veuillez vous reconnecter."
                    const navigationExtras: NavigationExtras = { state: { data: message } };
                    this.router.navigate(['/'], navigationExtras);
                }
            }
        )
    }

    getProduitDispoM(idmagasin) {
        const datas = JSON.parse(localStorage.getItem('auth'))

        const yourHeader: HttpHeaders = new HttpHeaders({
            Authorization: `${datas.token}`
        })

        const params = new HttpParams()
            .set('idmagasin', idmagasin)

        this.http.get(this.api + 'Produit_dispo/day', { headers: yourHeader, params: params }).subscribe(
            (datas) => {

                if (datas["statut"] == true) {
                    this.produitM = datas
                    this.emitProduitM();
                } else {

                    this.produitM = datas["data"].resultat
                    console.log(datas)
                }
            }, (err) => {

                if (typeof err.error["error"]) {

                    let message = err.error["message"]
                    const navigationExtras: NavigationExtras = { state: { data: message } };
                    this.router.navigate(['/'], navigationExtras);

                } else {
                    let message = "Une erreur inconnue a été déclenchée, veuillez vous reconnecter."
                    const navigationExtras: NavigationExtras = { state: { data: message } };
                    this.router.navigate(['/'], navigationExtras);
                }
            }
        )
    }

    getByIDProduitDispo(id) {
        const datas = JSON.parse(localStorage.getItem('auth'))

        const yourHeader: HttpHeaders = new HttpHeaders({
            Authorization: `${datas.token}`
        })

        const params = new HttpParams()
            .set('id', id)

        return new Promise((resolve, reject) => {
            this.http.get(this.api + 'Produit_dispo/detail', { headers: yourHeader, params: params }).subscribe(
                (datas) => {
                    console.log("Retour de l'api de disponibilité de produit");
                    console.log(datas);
                    if (datas["statut"] == true) {
                        this.produit = datas["data"];
                        this.emitProduit();
                        resolve(datas);
                    } else {
                        console.log(datas["message"]);
                        reject(datas["message"]);
                    }
                }, (err) => {
                    console.log("est-ce qu'on passe ici ?");
                    if (typeof err.error["error"]) {
                        let message = err.error["message"]
                        const navigationExtras: NavigationExtras = { state: { data: message } };
                        this.router.navigate(['/'], navigationExtras);

                    } else {
                        let message = "Une erreur inconnue a été déclenchée, veuillez vous reconnecter."
                        const navigationExtras: NavigationExtras = { state: { data: message } };
                        this.router.navigate(['/'], navigationExtras);
                    }
                }
            )
        })
    }

    // update produit
    updateProduitDispo(data) {

        const datas = JSON.parse(localStorage.getItem('auth'))

        const yourHeader: HttpHeaders = new HttpHeaders({
            Authorization: `${datas.token}`
        })

        return new Promise((resolve, reject) => {
            this.http.post(this.api + 'Produit_dispo/update', data, { headers: yourHeader }).subscribe(
                (data) => {
                    if (data["statut"] == true) {
                        resolve(data)
                    }
                    else {

                        reject(data['message'])
                    }

                }, (err) => {

                    if (typeof err.error["error"]) {

                        let message = err.error["message"]
                        const navigationExtras: NavigationExtras = { state: { data: message } };
                        this.router.navigate(['/'], navigationExtras);

                    } else {
                        reject(err.error.message)
                    }
                }
            )
        })


    }

    // delete produits

    deleteProduit(data) {
        const datas = JSON.parse(localStorage.getItem('auth'))

        const yourHeader: HttpHeaders = new HttpHeaders({
            Authorization: `${datas.token}`
        })

        return new Promise((resolve, reject) => {
            this.http.post(this.api + 'Produit_dispo/delete', data, { headers: yourHeader }).subscribe(
                (data) => {
                    if (data["statut"] == true) {
                        resolve(data)
                    }
                    else {

                        reject(data['message'])
                    }

                }, (err) => {

                    if (typeof err.error["error"]) {

                        let message = err.error["message"]
                        const navigationExtras: NavigationExtras = { state: { data: message } };
                        this.router.navigate(['/'], navigationExtras);

                    } else {
                        reject(err.error.message)
                    }

                }
            )
        })
    }

    // liste all produits par
    getAllProduits(idmagasin) {

        const data = JSON.parse(localStorage.getItem('auth'))

        const yourHeader: HttpHeaders = new HttpHeaders({
            Authorization: `${data.token}`
        })
        const params = new HttpParams()
            .set('idmagasin', idmagasin)

        this.http.get(this.api + 'Produit_dispo/all_produit/', { headers: yourHeader, params: params }).subscribe(
            (datas) => {

                if (datas["statut"] == true) {
                    this.produitAlls = datas["data"]
                    this.emitproduitAlls();
                } else {
                    console.log(datas["message"])
                }
            }, (err) => {

                if (typeof err.error["error"]) {

                    let message = err.error["message"]
                    const navigationExtras: NavigationExtras = { state: { data: message } };
                    this.router.navigate(['/'], navigationExtras);

                } else {
                    let message = "Une erreur inconnue a été déclenchée, veuillez vous reconnecter."
                    const navigationExtras: NavigationExtras = { state: { data: message } };
                    this.router.navigate(['/'], navigationExtras);
                }
            }
        )
    }

    // categorries produits
    getCategoriesProduit(idmagasin) {
        const data = JSON.parse(localStorage.getItem('auth'))

        const yourHeader: HttpHeaders = new HttpHeaders({
            Authorization: `${data.token}`
        })
        const params = new HttpParams()
            .set('idmagasin', idmagasin)
        this.http.get(this.api + 'Produit_dispo/all-categories/', { headers: yourHeader, params: params }).subscribe(
            (datas) => {

                if (datas["statut"] == true) {
                    this.categorieproduit = datas["data"]
                    this.emitCategorieproduit();
                } else {
                    console.log(datas["message"])
                }
            }, (err) => {

                if (typeof err.error["error"]) {

                    let message = err.error["message"]
                    const navigationExtras: NavigationExtras = { state: { data: message } };
                    this.router.navigate(['/'], navigationExtras);

                } else {
                    let message = "Une erreur inconnue a été déclenchée, veuillez vous reconnecter."
                    const navigationExtras: NavigationExtras = { state: { data: message } };
                    this.router.navigate(['/'], navigationExtras);
                }
            }
        )
    }

    //categories liste produits
    getProduitCategories(idmagasin, idfamille) {
        const data = JSON.parse(localStorage.getItem('auth'))

        const yourHeader: HttpHeaders = new HttpHeaders({
            Authorization: `${data.token}`
        })
        const params = new HttpParams()
            .set('idmagasin', idmagasin)
            .set('idfamille', idfamille)

        this.http.get(this.api + 'Produit_dispo/categories-produits/', { headers: yourHeader, params: params }).subscribe(
            (datas) => {
                if (datas["statut"] == true) {
                    this.produitcategorie = datas["data"]
                    this.emitProduitCategorie();
                } else {
                    console.log(datas["message"])
                }
            }, (err) => {

                if (typeof err.error["error"]) {

                    let message = err.error["message"]
                    const navigationExtras: NavigationExtras = { state: { data: message } };
                    this.router.navigate(['/'], navigationExtras);

                } else {
                    let message = "Une erreur inconnue a été déclenchée, veuillez vous reconnecter."
                    const navigationExtras: NavigationExtras = { state: { data: message } };
                    this.router.navigate(['/'], navigationExtras);
                }
            }
        )
    }

    // Detail d'un produit
    getDetail(idproduit) {
        const data = JSON.parse(localStorage.getItem('auth'))
        const yourHeader: HttpHeaders = new HttpHeaders({
            Authorization: `${data.token}`
        })
        const params = new HttpParams()
            .set('idmagasin', idproduit)

        this.http.get(this.api + 'Produit_dispo/detail-produits/', { headers: yourHeader, params: params }).subscribe(
            (datas) => {
                if (datas["statut"] == true) {
                    this.produitcategorie = datas["data"]
                    this.emitProduitCategorie();
                } else {
                    console.log(datas["message"])
                }
            }, (err) => {

                if (typeof err.error["error"]) {

                    let message = err.error["message"]
                    const navigationExtras: NavigationExtras = { state: { data: message } };
                    this.router.navigate(['/'], navigationExtras);

                } else {
                    let message = "Une erreur inconnue a été déclenchée, veuillez vous reconnecter."
                    const navigationExtras: NavigationExtras = { state: { data: message } };
                    this.router.navigate(['/'], navigationExtras);
                }
            }
        )
    }
}
