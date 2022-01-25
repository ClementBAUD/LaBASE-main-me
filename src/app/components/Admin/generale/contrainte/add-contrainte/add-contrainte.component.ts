import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Router } from '@angular/router';
import { AutreService } from 'src/app/services/other/autre.service';

@Component({
  selector: 'app-add-contrainte',
  templateUrl: './add-contrainte.component.html',
  styleUrls: ['./add-contrainte.component.css']
})
export class AddContrainteComponent implements OnInit {
  addConst;
  errorMessage: string;
  submitted = false;
  formData = new FormData();


  Loading:boolean;

  constructor(private fromBuilder: FormBuilder,private router:Router,private autreService:AutreService) {

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
  }
  onSubmit(){
    this.submitted = true;
    if (this.addConst.invalid) {
      return;
    }
    const nom = this.addConst.get('nom').value;
    const nombre = this.addConst.get('nombre').value;


    this.autreService .addContrainte(nom,nombre)
      .then((datas:any)=>{
        this.router.navigate(['/liste-contrainte'])
      })
      .catch((err)=>{
        this.formData = new FormData();

        this.errorMessage=err;
      })

  }

}
