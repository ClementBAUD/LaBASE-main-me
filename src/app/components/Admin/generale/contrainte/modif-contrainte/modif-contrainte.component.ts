import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { AutreService } from 'src/app/services/other/autre.service';
import { ActivatedRoute, NavigationExtras, Router  } from '@angular/router';


@Component({
  selector: 'app-modif-contrainte',
  templateUrl: './modif-contrainte.component.html',
  styleUrls: ['./modif-contrainte.component.css']
})
export class ModifContrainteComponent implements OnInit {

  addConst;
  errorMessage: string;
  submitted = false;
  formData = new FormData();
  paramsList : [];
  paramsListSub:Subscription;

  Loading:boolean;


  constructor(private fromBuilder: FormBuilder,private router:Router,private autreService:AutreService,private routes: ActivatedRoute,) {

    this.addConst = this.fromBuilder.group({
      nom: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
    })

   }

   get nom() {
    return this.addConst.get('nom');
  }
  get nombre() {
    return this.addConst.get('nombre');
  }


  ngOnInit(): void {
    const id = this.routes.snapshot.params["id"];

    this.paramsListSub= this.autreService.paramsListe$.subscribe(
      (mag:any)=>{
          this.paramsList =mag[0]
          this.addConst.patchValue({
            nom: this.paramsList["nom"],
            nombre: this.paramsList["nombre"],

            });
          this.Loading=true;
      },
      (err)=>{
        this.Loading=false;
        console.log(err)
      }
    );

    this.autreService.getContraintebyId(id);
  }

  onSubmit(){
    this.submitted = true;
    if (this.addConst.invalid) {
      return;
    }
    const nom = this.addConst.get('nom').value;
    const nombre = this.addConst.get('nombre').value;
    const id = this.routes.snapshot.params["id"];


    this.autreService.ModifContrainte(id,nom,nombre)
      .then((datas:any)=>{
        this.router.navigate(['/liste-contrainte'])
      })
      .catch((err)=>{
        this.formData = new FormData();

        this.errorMessage=err;
      })

  }


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.paramsListSub.unsubscribe();
  }

}
