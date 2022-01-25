import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Commandes } from 'src/app/models/commandes';
import { Subscription } from 'rxjs';
import { Produits } from 'src/app/models/produits';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute,Router } from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { CommandesService } from 'src/app/services/commande/commandes.service';
import { Users } from 'src/app/models/users';
import { StatutCommmande } from 'src/app/models/statut-commmande';
import { AutreService } from 'src/app/services/other/autre.service';
import { WebNotificationServiceService } from 'src/app/services/web-notification-service.service';
import { ToastrService } from 'ngx-toastr';
import { MagasinService } from 'src/app/services/magasins/magasin.service';

@Component({
  selector: 'app-historique-commande',
  templateUrl: './historique-commande.component.html',
  styleUrls: ['./historique-commande.component.css']
})
export class HistoriqueCommandeComponent implements OnInit {
  currentRate = 8;

  Loading:boolean;
  errorMessage

  constructor(private router:Router, private toastr: ToastrService,private fromBuilder: FormBuilder,private magasinService :MagasinService) {

     }


  ngOnInit(): void {

  }

  submiit(){
    let data= JSON.parse(localStorage.getItem('auth'))

    this.magasinService.getcount(data['data']['id'])
    .then(
      (datas)=>{
        console.log(datas)
         if (datas['data']?.length==0) {
          this.errorMessage="vous n'avez pas passé de commande aujourd'hui";
          localStorage.setItem('avct_item', null);
          this.toastr.error(
            'aucune commande disponible',
            "vous n'avez pas passé de commande aujourd'hui"
          );
          localStorage.setItem('avct_item', null);

        return this.errorMessage;
         } else {
              this.router.navigate(['/detail-commande',datas['data'][0]['id_commande']])
         }
        }).catch((err)=>{
      //  console.log(err)
      console.log(err)
        this.errorMessage=err;
      })
  }

}
