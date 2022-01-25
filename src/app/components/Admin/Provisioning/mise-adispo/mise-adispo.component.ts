import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Produits } from 'src/app/models/produits';
import { Famille } from 'src/app/models/famille';
import { Subscription } from 'rxjs';
import { ProduitsService } from 'src/app/services/products/produits.service';
import { ProduitMiseDispoService } from 'src/app/services/produitDispo/produit-mise-dispo.service';
@Component({
  selector: 'app-mise-adispo',
  templateUrl: './mise-adispo.component.html',
  styleUrls: ['./mise-adispo.component.css']
})
export class MiseADispoComponent implements OnInit {

  ProductForm;
  errorMessage: string;
  succesMessage:string;
  submitted = false;
  formData = new FormData();

  produit : Produits[];
  produitSub:Subscription;

  Produitdetail : Famille[];
  ProduitdetailSub:Subscription;

  famille : Famille[];
  familleSub:Subscription;

  Loading:boolean;


    constructor(private fromBuilder: FormBuilder,private routes: ActivatedRoute,private router:Router,private produitsService:ProduitsService ,private produitMiseDispoService:ProduitMiseDispoService ) {
    this.ProductForm = this.fromBuilder.group({
      titre: ['', [Validators.required]],
      plu: ['', [Validators.required]],
      quantite: ['', [Validators.required]],
      description: ['', [Validators.required]],
      })
   }

   get plu() {
    return this.ProductForm.get('plu');
  }

  get titre() {
    return this.ProductForm.get('titre');
  }
  get quantite() {
    return this.ProductForm.get('quantite');
  }
  get description() {
    return this.ProductForm.get('description');
  }




  ngOnInit(): void {
    const plu = +this.routes.snapshot.params["id"];
    this.ProduitdetailSub= this.produitsService.produit$.subscribe(
      (res:Produits[])=>{
        this.Produitdetail=res["rows"][0]
          this.ProductForm.patchValue({
            //titre: this.Produitdetail["titre_commercial"],
            titre: this.Produitdetail["titre"],
            plu: this.Produitdetail["plu"],
            description: " ",
            });
          this.Loading=true;
      },
      (err)=>{
        this.Loading=false;
        this.ProductForm.reset()
      }
    );


    this.produitsService.getProduitId(plu.toString());
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.ProduitdetailSub.unsubscribe();
  }

  onSubmit(){
    this.submitted = true;
    if (this.ProductForm.invalid) {

      return;
     }
      const id = this.routes.snapshot.params["id"];


        const  description = this.ProductForm.get('description').value;


      const quantite = this.ProductForm.get('quantite').value;
      const titre = this.ProductForm.get('titre').value;
      const data = JSON.parse(localStorage.getItem('mag'))
      const infoUser = JSON.parse(localStorage.getItem('auth'))
      let infoUtilisateur =data[0].id

      this.formData.append("description", description);
      this.formData.append("quantiteInit", quantite);
      this.formData.append("ProduitId", id.toString());
      this.formData.append("libelle", titre);
     this.formData.append("MagasinId", infoUtilisateur.toString());
      this.formData.append("userId", description);


      this.produitMiseDispoService.creationProduit(this.formData)
      .then((data)=>{
        this.succesMessage=data["message"]
        let message =this.succesMessage
        const navigationExtras: NavigationExtras = {state: {data: message}};

        this.router.navigate(['/liste-produit-disponible'],navigationExtras)
      })
      .catch((err)=>{
        this.formData = new FormData();

        this.errorMessage=err;
      })

  }

}
