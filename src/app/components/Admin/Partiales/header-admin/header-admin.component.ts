import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentification/auth.service';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent implements OnInit {

  isUser;
  isMag:boolean;
  isAdmin:boolean;
  Loading: boolean;
  constructor(private auth:AuthService) {
  //  this.loadScript()
  }

  ngOnInit(): void {
   // this.auth.isAuth$
   let data= JSON.parse(localStorage.getItem('auth'))
   this.isUser=data["data"]
   if (this.isUser.profile=="Admin") {
    this.isAdmin=true
    this.Loading = true;
   }
   if (this.isUser.profile=="Magasin") {
    this.isMag=true
    this.Loading = true;
   }
  }

  loadScript() {

    // This array contains all the files/CDNs
    const dynamicScripts = [
      "assets/Frontend/js/jquery-3.3.1.min.js",
      "assets/Frontend/vendor/bootstrap/js/bootstrap.bundle.min.js",


      "assets/Admin/vendor/bootstrap/js/bootstrap.bundle.min.js",
      "assets/Admin/vendor/jquery-easing/jquery.easing.min.js",
      "assets/Admin/js/sb-admin-2.min.js",
      "assets/Admin/vendor/datatables/jquery.dataTables.min.js",
      "assets/Admin/vendor/datatables/dataTables.bootstrap4.min.js",
      "assets/other/buttons.bootstrap4.min.js",


      "assets/other/buttons.html5.min.js",
      "assets/other/buttons.print.min.js",
     "assets/other/buttons.colVis.min.js"



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
