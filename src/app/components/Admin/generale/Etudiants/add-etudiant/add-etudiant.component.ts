import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Users } from 'src/app/models/users';
import { AllUsersService } from 'src/app/services/users/all-users.service';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { ConfirmedValidator } from './../../../../../confirmed.validator';

@Component({
  selector: 'app-add-etudiant',
  templateUrl: './add-etudiant.component.html',
  styleUrls: ['./add-etudiant.component.css']
})
export class AddEtudiantComponent implements OnInit {
  page = 1;
  pageSize = 10;
  collectionSize: number;
  currentRate = 8;

  userlisteMag : Users[];
  userlisteMagSub:Subscription;

  Loading:boolean;

  succesMessage:string;


  title = 'Liste des Etudiants';
  dtOptions: any = {};

  RegisterForm;
  errorMessage: string;
  submitted = false;
  users:Users;
  formData = new FormData();


  constructor(private fromBuilder: FormBuilder,private http: HttpClient,private allusersService:AllUsersService) {
    this.RegisterForm = this.fromBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      nom: ['', [Validators.required]],

      },
      {
        validator: ConfirmedValidator('password', 'confirmPassword')
      })
  }


  ngOnInit(): void {

    this.userlisteMagSub= this.allusersService.listeusersMag$.subscribe(
      (userAl:Users[])=>{
          this.userlisteMag =userAl
          this.Loading=true;
      },
      (err)=>{
        this.Loading=false;
       // console.log(err)
      }
    );


    this.allusersService.listeusermagasin();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      dom: 'Bfrtip',
        buttons: [
            'csv', 'excel', 'print'
        ]
    };
  }

  get nom() {
    return this.RegisterForm.get('nom');
  }
  get email() {
    return this.RegisterForm.get('email');
  }
  get password() {
    return this.RegisterForm.get('password');
  }
  get confirmPassword() {
    return this.RegisterForm.get('confirmPassword');
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.userlisteMagSub.unsubscribe();
  }

  onSubmit(){
    this.submitted = true;
    if (this.RegisterForm.invalid) {
      return;
  }
      const email = this.RegisterForm.get('email').value;
      const password = this.RegisterForm.get('password').value;
      const nom = this.RegisterForm.get('nom').value;



      this.formData.append("nom", nom);
      this.formData.append("email", email);
      this.formData.append("password", password);



      this.allusersService.creationuser(this.formData)
      .then((data)=>{
        this.succesMessage=data["message"]

        //window.location.reload();
        ///this.router.navigate(['/home'])
      })
      .catch((err)=>{
        this.formData = new FormData();

        this.errorMessage=err;
      })

  }


}
