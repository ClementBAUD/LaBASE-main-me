import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Produits } from 'src/app/models/produits';
import { CartservicesService } from 'src/app/services/cart/cartservices.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MagasinService } from 'src/app/services/magasins/magasin.service';
import { ProduitMiseDispoService } from 'src/app/services/produitDispo/produit-mise-dispo.service';
import { CommandeClientService } from 'src/app/services/commande-client.service';

@Component({
    selector: 'app-panier',
    templateUrl: './panier.component.html',
    styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

    listeProduit: Produits[];
    lignesPanier: Produits[];

    errorMessage: string;
    errorMessageA: string;
    Loading: boolean;
    LoadingM: boolean;
    ValiderForm;
    userMag;
    dates;
    userMagSub: Subscription;
    MagSub: Subscription;
    submitted = false;
    plage;
    panier;
    listeProduits: Produits[];
    listeP: [];
    result;
    idma;
    listeProduitSub: Subscription;
    heurday
    // errorMessage

    form = new FormGroup({
        horaire: new FormControl('', Validators.required)
    });



    constructor(private router: Router, public cartservicesService: CartservicesService, private produitMiseDispoService: ProduitMiseDispoService,
        private toastr: ToastrService, private fromBuilder: FormBuilder, private magasinService: MagasinService, private commandeClientService: CommandeClientService) {

    }

    get f() {
        return this.form.controls;
    }
    ngOnInit(): void {

        let data = JSON.parse(localStorage.getItem('auth'))
        // this.listeProduit=this.cartservicesService.getLocalCartProducts();
        const timeElapsed = Date.now();
        let now = new Date()

        let heure = now.getHours()
        if (heure == 23) {
            localStorage.setItem('avct_item', null);
        }
        const today = new Date(timeElapsed);
        this.dates = today.toDateString()
        this.magasinService.getMagasinsById(data["data"]["idmagasin"]).then((mag) => {
            if (mag == null) {
                this.userMag = []
            }
            this.heurday = today.getHours()
            //  console.log(this.heurday)
            this.userMag = mag

            this.listeProduit = this.cartservicesService.getCartProducts()
            this.panier = this.cartservicesService.getLocalCartProducts()
            this.LoadingM = true;

        })
            .catch((err) => {
                this.errorMessage = err;
                this.LoadingM = false;
            })

        //
    }
    onSubmit() {

    }

    Commander() {
        this.submitted = true;
        if (this.form.invalid) {
            return;
        }
        let horaire = this.form.value['horaire'];
        let data = JSON.parse(localStorage.getItem('auth'))
        let contraintes = JSON.parse(localStorage.getItem('contrainte'));
        let qt;
        // recuper si l'utilisateur a une commnde aujourd
        contraintes.forEach(function (element, index) {
            if (element.nom == 'limite_commande') {
                qt = element.nombre;
            }
        });


        this.magasinService.getcount(data['data']['id'])
            .then(
                (datas) => {
                    if (datas['data']?.length == 0) {
                        let nbProd: number = 0;
                        this.lignesPanier = [];

                        // Pour chaque ligne du panier, on cumule les quantités dans un autre tableau
                        this.listeProduit.forEach(eltSource => {
                            let bTrouve: boolean = false;
                            nbProd = (this.lignesPanier == undefined ? 0 : this.lignesPanier.length);
                            
                            // S'il y a au moins une ligne, on peut parcourir le tableau cible
                            if (nbProd != 0) {
                                this.lignesPanier.forEach(eltCible => {
                                    // Est-ce que les PLU correspondent ? Si oui, on incrémente la quantité
                                    if (eltSource.id_prodDispo == eltCible.id_prodDispo) {
                                        eltCible.Quantite += 1;
                                        bTrouve = true;
                                    }
                                });
                            }

                            // Si on a pas trouve de correspondance, on insère une nouvelle ligne dans le tableau cible
                            if (!bTrouve) {
                                eltSource.Quantite = 1;
                                this.lignesPanier.push(eltSource);
                            }
                        });
                        this.getverification(this.lignesPanier, horaire, data['data']['id'], data['data']['idmagasin'])
                        // this.getverification(this.listeProduit, horaire, data['data']['id'], data['data']['idmagasin'])

                    } else {
                        this.errorMessage = "vous avez atteint le nombre de commande maximum par jour";
                        localStorage.setItem('avct_item', null);
                        this.toastr.error(
                            'commande non prise en compte ',
                            "vous avez atteint le nombre de commandes maximum par jour"
                        );
                        localStorage.setItem('avct_item', null);
                        return this.errorMessage;
                    }
                }).catch((err) => {
                    this.errorMessage = err;
                })
    }

    removeCartProduct(product: Produits) {
        this.cartservicesService.removeLocalCartProduct(product);
        // Recalling
        this.listeProduit = this.cartservicesService.getCartProducts()
    }

    getCartProduct() {
        //  this.listeProduit = this.cartservicesService.getCartProducts();

    }

    slotConfig(debut, fin) {
        let a = {
            "configSlotHours": "01",
            "configSlotMinutes": "30",
            "configSlotPreparation": "30",
            "timeArr": [
                { "startTime": debut, "endTime": fin }
            ]
        }
        return a
    }

    createSlots(f) {

        // Getting values from slotConfig using destructuring
        const { configSlotHours, configSlotMinutes, configSlotPreparation, timeArr } = f;


        let defaultDate = new Date().toISOString().substring(0, 10)
        let slotsArray = []
        let _timeArrStartTime;
        let _timeArrEndTime;
        let _tempSlotStartTime;
        let _endSlot;
        let _startSlot;

        // Loop over timeArr
        for (var i = 0; i < timeArr.length; i++) {

            // Creating time stamp using time from timeArr and default date
            _timeArrStartTime = (new Date(defaultDate + " " + timeArr[i].startTime)).getTime();
            _timeArrEndTime = (new Date(defaultDate + " " + timeArr[i].endTime)).getTime();
            _tempSlotStartTime = _timeArrStartTime;

            // Loop around till _tempSlotStartTime is less end time from timeArr
            while ((new Date(_tempSlotStartTime)).getTime() < (new Date(_timeArrEndTime)).getTime()) {

                _endSlot = new Date(_tempSlotStartTime);
                _startSlot = new Date(_tempSlotStartTime);

                //Adding minutes and hours from config to create slot and overiding the value of _tempSlotStartTime
                _tempSlotStartTime = _endSlot.setHours(parseInt(_endSlot.getHours()) + parseInt(configSlotHours));
                _tempSlotStartTime = _endSlot.setMinutes(parseInt(_endSlot.getMinutes()) + parseInt(configSlotMinutes));

                // Check _tempSlotStartTime is less than end time after adding minutes and hours, if true push into slotsArr
                if (((new Date(_tempSlotStartTime)).getTime() <= (new Date(_timeArrEndTime)).getTime())) {

                    // DateTime object is converted to time with the help of javascript functions
                    // If you want 24 hour format you can pass hour12 false
                    slotsArray.push({
                        "timeSlotStart": new Date(_startSlot).toLocaleTimeString('fr-FR', {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: false
                        }),
                        "timeSlotEnd": _endSlot.toLocaleTimeString('fr-FR', {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: false
                        })
                    });


                }

                //preparation time is added in last to maintain the break period
                _tempSlotStartTime = _endSlot.setMinutes(_endSlot.getMinutes() + parseInt(configSlotPreparation));
            }
        }

        let arry = []
        slotsArray.forEach(function (element, index) {

            arry.push(element.timeSlotStart);
            arry.push(element.timeSlotEnd);
        });

        return arry;
    }

    getverification(tab, heureRecuperation, userId, idmagasin) {

        //getByIdMagasins
        this.magasinService.getByIdMagasins(idmagasin)
            .then((data) => {
                if (data['data']['Ouvert'] == 1) {
                    this.VerifierProduits(tab)
                        .then(message => {
                            // creation commande
                            this.commandeClientService.creationcommande(heureRecuperation, userId)
                                .then((data) => {
                                    this.commandeClientService.creationTablignecommande(tab, data['Data']['id'])
                                    .then((dat) => {
                                        this.form.reset()
                                        localStorage.setItem('avct_item', null);
                                        return this.router.navigate(['recapitulatif-commande/', data['Data']['id']])
                                    }).catch((err) => {
                                        this.errorMessage = err;
                                        //CheckLigne = false;
                                    })
                                }).catch((err) => {
                                    this.errorMessage = err;
                                })
                        })
                        .catch(err => {
                            console.log("Voici une erreur de VerifierProduits")
                            console.log(err);
                        })
                } else {
                    this.errorMessage = "La BASE a fermé au moment de la validation de votre commande. Votre commande n'a pas pu être prise en compte.";
                    localStorage.setItem('avct_item', null);
                    this.toastr.error(
                        'La BASE a fermé',
                        "C'est fini pour aujourd'hui"
                    );
                    return this.errorMessage;
                }
            })
            .catch((err) => {
                console.log("Gros Bordel");
                console.log(err);
                this.errorMessage = err;
            })
    }

    VerifierProduits(tab) {
        return new Promise((resolve, reject) => {
            tab.forEach(element => {
                this.produitMiseDispoService.getByIDProduitDispo(element.id_prodDispo) 
                    .then(data => {
                        this.listeProduitSub = this.produitMiseDispoService.produit$.subscribe(
                            (res: Produits[]) => {
                                res.forEach(ele => {
                                    if ((ele['quantiteActuel'] > 0 ) == false) {
                                        //console.log(ele['quantiteActuel']);
                                        this.errorMessage = "le produit " + ele['libelle'] + " n'est plus disponible veuillez changer de produit";
                                        this.removeCartProduct(ele)
                                        this.form.reset();
                                        reject(this.errorMessage);
                                    }
                                }
                                )
                                this.result = "true";
                                this.Loading = true;
                                resolve("ok");
                            },
                            (err) => {
                                this.Loading = false;
                                reject(err);
                            }
                        )
                    })
                    .catch(err => {
                        this.errorMessage = "le produit " + element['libelle'] + " est en erreur";
                        this.removeCartProduct(element);
                        this.form.reset();
                        reject(this.errorMessage);
                    })
            })
        })
    }

    ngOnDestroy(): void {

        //   this.userMagSub.unsubscribe();
        // this.MagSub.unsubscribe();
    }
}
