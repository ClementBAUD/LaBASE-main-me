import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Produits } from 'src/app/models/produits';
import { Famille } from 'src/app/models/famille';
import { Subscription } from 'rxjs';
import { ProduitsService } from 'src/app/services/products/produits.service';

@Component({
  selector: 'app-modif-produit',
  templateUrl: './modif-produit.component.html',
  styleUrls: ['./modif-produit.component.css']
})
export class ModifProduitComponent implements OnInit {
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
  famillebyId;

  constructor(private fromBuilder: FormBuilder,private routes: ActivatedRoute,private router:Router,private produitsService:ProduitsService) {
    this.ProductForm = this.fromBuilder.group({
      titre: ['', [Validators.required]],
      plu: ['', [Validators.required]],
      titrecommercial: ['', [Validators.required]],
      valeurNutritionnelle: ['', [Validators.required]],
      ingredient: ['', [Validators.required]],
      allergene: ['', [Validators.required]],
      FamilleId: ['', [Validators.required]],
      })
   }


   get plu() {
    return this.ProductForm.get('plu');
  }

  get titre() {
    return this.ProductForm.get('titre');
  }
  get titrecommercial() {
    return this.ProductForm.get('titrecommercial');
  }
  get valeurNutritionnelle() {
    return this.ProductForm.get('valeurNutritionnelle');
  }
  get ingredient() {
    return this.ProductForm.get('ingredient');
  }
  get allergene() {
    return this.ProductForm.get('allergene');
  }
  get FamilleId() {
      return this.ProductForm.get('FamilleId');
  }





  ngOnInit(): void {
    const plu = +this.routes.snapshot.params["id"];

    this.ProduitdetailSub= this.produitsService.produit$.subscribe(
      (res:Produits[])=>{
        this.Produitdetail=res["rows"][0]
      //  this.famillebyId= res["rows"][0]["famille"]["nom"],

          this.ProductForm.patchValue({
            titre: this.Produitdetail["titre"],
            titrecommercial: this.Produitdetail["titre_commercial"],
            valeurNutritionnelle: this.Produitdetail["valeurNutritionnelle"],
            ingredient: this.Produitdetail["ingredient"],
            allergene: this.Produitdetail["allergene"],
            FamilleId: this.Produitdetail["FamilleId"],
            plu: this.Produitdetail["plu"]
            });
          this.Loading=true;
      },
      (err)=>{
        this.Loading=false;
        this.ProductForm.reset()
        console.log(err)
      }
    );
    this.familleSub= this.produitsService.famille$.subscribe(
      (mag:Famille[])=>{
          this.famille =mag
          this.Loading=true;

      },
      (err)=>{
        this.Loading=false;
        console.log(err)
      }
    );

    this.produitsService.getFamilles();

    this.produitsService.getProduitId(plu.toString());

  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.ProduitdetailSub.unsubscribe();
    this.familleSub.unsubscribe();
  }
  handleImage(files: FileList) {
    this.formData.delete('files');
    this.formData.append('files', files[0]);
  }


  onSubmit(){
    this.submitted = true;
    if (this.ProductForm.invalid) {
      return;
     }
      const id = this.routes.snapshot.params["id"];


      const allergene = this.ProductForm.get('allergene').value;
      const ingredient = this.ProductForm.get('ingredient').value;
      const titrecommercial = this.ProductForm.get('titrecommercial').value;
      const valeurNutritionnelle = this.ProductForm.get('valeurNutritionnelle').value;
      const FamilleId = this.ProductForm.get('FamilleId').value;
      const titre = this.ProductForm.get('titre').value;
      const plu = this.ProductForm.get('plu').value;

      let MagID =FamilleId.toString()



      this.formData.append("titre", titre);
      this.formData.append("titrecommercial", titrecommercial);
      this.formData.append("ingredient", ingredient);
      this.formData.append("valeurNutritionnelle", valeurNutritionnelle);
      this.formData.append("allergene", allergene);
      this.formData.append("FamilleId", MagID.toString());
      this.formData.append("id", id.toString());
      this.formData.append("plu", plu);



      this.produitsService.updateProduit(this.formData)
      .then((data)=>{
        this.succesMessage=data["message"]
        let message =this.succesMessage
        const navigationExtras: NavigationExtras = {state: {data: message}};

        this.router.navigate(['/all-produits'],navigationExtras)
      })
      .catch((err)=>{
        this.formData = new FormData();

        this.errorMessage=err;
      })

  }
}
