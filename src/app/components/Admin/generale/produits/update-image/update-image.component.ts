import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Produits } from 'src/app/models/produits';
import { Famille } from 'src/app/models/famille';
import { Subscription } from 'rxjs';
import { ProduitsService } from 'src/app/services/products/produits.service';

@Component({
  selector: 'app-update-image',
  templateUrl: './update-image.component.html',
  styleUrls: ['./update-image.component.css']
})
export class UpdateImageComponent implements OnInit {

  ProductForm;
  errorMessage: string;
  succesMessage:string;
  submitted = false;
  formData = new FormData();

  produit : Produits[];
  produitSub:Subscription;

  Produitdetail : Famille[];
  ProduitdetailSub:Subscription;

  Loading:boolean;

  constructor(private fromBuilder: FormBuilder,private routes: ActivatedRoute,private router:Router,private produitsService:ProduitsService) {
    this.ProductForm = this.fromBuilder.group({
      files: ['', [Validators.required]],


      })
  }

      get files() {
        return this.ProductForm.get('files');
      }



  ngOnInit(): void {
    const plu = +this.routes.snapshot.params["id"];

    this.ProduitdetailSub= this.produitsService.produit$.subscribe(
      (res:Produits[])=>{
        this.Produitdetail=res["rows"][0]
          console.log(this.Produitdetail)
          this.Loading=true;
      },
      (err)=>{
        this.Loading=false;
        this.ProductForm.reset()
        console.log(err)
      }
    );

    this.produitsService.getProduitId(plu.toString());
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.ProduitdetailSub.unsubscribe();
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
      const id = +this.routes.snapshot.params["id"];

      this.formData.append("id", id.toString());


      this.produitsService.updateProduitImage(this.formData)
      .then((data)=>{
        console.log(data)
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
