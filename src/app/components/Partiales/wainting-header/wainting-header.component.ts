import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Magasin } from 'src/app/models/magasin';
import { AuthService } from 'src/app/services/authentification/auth.service';
import { MagasinService } from 'src/app/services/magasins/magasin.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wainting-header',
  templateUrl: './wainting-header.component.html',
  styleUrls: ['./wainting-header.component.css']
})
export class WaintingHeaderComponent implements OnInit {
  isUser;
  isMag:boolean;
  isAdmin:boolean;
  warnmessage:string;
  infoMag:string;
  userMag : Magasin[];
  userMagSub:Subscription;
  errorMessage: string;
  Loading:boolean;

  constructor(private auth:AuthService,private router:Router,private magasinService :MagasinService) {
    this.loadScript()
  }

  ngOnInit(): void {
   // this.auth.isAuth$
   let data= JSON.parse(localStorage.getItem('auth'))
   let mag= JSON.parse(localStorage.getItem('magasin'))
   this.isUser=data["data"]
   const navigation = this.router.getCurrentNavigation();



    this.magasinService.getMagasinsById(data["data"]["idmagasin"]);
    this.magasinService.getMagasinsById(data["data"]["idmagasin"]).then((data:[]) => {
      if (data==null) {
        this.Loading=false
        this.userMag=[]
      }
      this.userMag=data
      this.Loading=true

    })
    .catch((err) => {
      this.errorMessage = err;
    })


  }

  ngOnDestroy(): void {

 //   this.userMagSub.unsubscribe();
  }

  loadScript() {

    // This array contains all the files/CDNs
    const dynamicScripts = [
      "assets/Frontend/js/jquery-3.3.1.min.js",
      "assets/Frontend/vendor/bootstrap/js/bootstrap.bundle.min.js",
      "assets/Frontend/vendor/OwlCarousel/owl.carousel.js",
      "assets/Frontend/vendor/semantic/semantic.min.js",
      "assets/Frontend/js/jquery.countdown.min.js",
      "assets/Frontend/js/custom.js",
      "assets/Frontend/js/offset_overlay.js",
      "assets/Frontend/js/night-mode.js",



    ];
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = true;
      document.getElementsByTagName('head')[0].appendChild(node);
    }

  }

}
