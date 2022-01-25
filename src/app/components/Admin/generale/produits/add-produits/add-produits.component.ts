import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import { Produits } from 'src/app/models/produits';
import { Famille } from 'src/app/models/famille';
import { Subscription } from 'rxjs';
import { ProduitsService } from 'src/app/services/products/produits.service';


@Component({
  selector: 'app-add-produits',
  templateUrl: './add-produits.component.html',
  styleUrls: ['./add-produits.component.css']
})
export class AddProduitsComponent implements OnInit {
  ProductForm;
  errorMessage: string;
  succesMessage:string;
  submitted = false;
  formData = new FormData();

  produit : Produits[];
  produitSub:Subscription;

  famille : Famille[];
  familleSub:Subscription;

  Loading:boolean;

  constructor(private fromBuilder: FormBuilder,private router:Router,private produitsService:ProduitsService) {
    this.ProductForm = this.fromBuilder.group({
      files: ['', [Validators.required]],
      plu: ['', [Validators.required]],
      titre: ['', [Validators.required]],
      titrecommercial: ['', [Validators.required]],
      valeurNutritionnelle: ['', [Validators.required]],
      ingredient: ['', [Validators.required]],
      allergene: ['', [Validators.required]],
      FamilleId: ['', [Validators.required]],
      })
  }

      get files() {
        return this.ProductForm.get('files');
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
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
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
      const plu = this.ProductForm.get('plu').value;
      const allergene = this.ProductForm.get('allergene').value;
      const ingredient = this.ProductForm.get('ingredient').value;
      const titrecommercial = this.ProductForm.get('titrecommercial').value;
      const valeurNutritionnelle = this.ProductForm.get('valeurNutritionnelle').value;
      const FamilleId = this.ProductForm.get('FamilleId').value;
      const titre = this.ProductForm.get('titre').value;

      let MagID =FamilleId.toString()



      this.formData.append("titre", titre);
      this.formData.append("plu", plu);
      this.formData.append("titrecommercial", titrecommercial);
      this.formData.append("ingredient", ingredient);
      this.formData.append("valeurNutritionnelle", valeurNutritionnelle);
      this.formData.append("allergene", allergene);
      this.formData.append("FamilleId", MagID.toString());



      this.produitsService.creationProduist(this.formData)
      .then((data)=>{
        this.succesMessage=data["message"]


        this.router.navigate(['/all-produits'])
      })
      .catch((err)=>{
        this.formData = new FormData();

        this.errorMessage=err;
      })

  }

}
