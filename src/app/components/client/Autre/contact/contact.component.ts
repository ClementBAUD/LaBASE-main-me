import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authentification/auth.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  isUser;
  isMag:boolean;
  isAdmin:boolean;
  warnmessage:string;
  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit(): void {
   // this.auth.isAuth$
   let data= JSON.parse(localStorage.getItem('auth'))
   let mag= JSON.parse(localStorage.getItem('magasin'))
   this.isUser=data["data"]

  }

}
