import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommandeClientService } from 'src/app/services/commande-client.service';
import { MagasinService } from 'src/app/services/magasins/magasin.service';
import { ProduitMiseDispoService } from 'src/app/services/produitDispo/produit-mise-dispo.service';

@Component({
  selector: 'app-commande-passe',
  templateUrl: './commande-passe.component.html',
  styleUrls: ['./commande-passe.component.css']
})
export class CommandePasseComponent implements OnInit {
  errorMessage
  Loading:boolean;
  listecommande;

  constructor(private router:Router,private produitMiseDispoService:ProduitMiseDispoService,
    private toastr: ToastrService,private magasinService :MagasinService,private commandeClientService :CommandeClientService) {

   }


  ngOnInit(): void {

    let data= JSON.parse(localStorage.getItem('auth'))

    this.commandeClientService.getcommandepaste(data['data']['id'])
    .then(
      (datas)=>{
        console.log(datas)
        if (datas['data']?.length>0) {
          this.listecommande=datas['data']
          this.Loading=true
        } else {
          this.listecommande=[]
          this.Loading=true
        }

        }).catch((err)=>{
      //  console.log(err)
      this.Loading=false
        this.errorMessage=err;
      })
  }

}
