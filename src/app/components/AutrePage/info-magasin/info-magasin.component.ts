import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SlidesOutputData, OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
import { Magasin } from 'src/app/models/magasin';
import { AuthService } from 'src/app/services/authentification/auth.service';
import { MagasinService } from 'src/app/services/magasins/magasin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-info-magasin',
  templateUrl: './info-magasin.component.html',
  styleUrls: ['./info-magasin.component.css']
})
export class InfoMagasinComponent implements OnInit {
  isUser;
  isMag:boolean;
  warnmessage:string;
  infoMag:string;
  userMag;
  userMagSub:Subscription;
  errorMessage: string;
  Loading:boolean;
  text;
  constructor(private auth:AuthService,private router:Router,private magasinService :MagasinService) {

   }



  ngOnInit(): void {
    let data= JSON.parse(localStorage.getItem('auth'))
   this.isUser=data["data"]

    this.magasinService.getMagasinsById(data["data"]["idmagasin"]).then((data) => {
      if (data==null) {
        this.Loading=false

        this.userMag=[]
      }
      this.userMag=data
      console.log(data)
      this.Loading=true

    })
    .catch((err) => {
      this.errorMessage = err;
    })

  }

}
