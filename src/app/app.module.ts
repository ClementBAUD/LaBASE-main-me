import { NgModule, LOCALE_ID  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {DataTablesModule} from 'angular-datatables';
import {NgxPrintModule} from 'ngx-print';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ChartsModule } from 'ng2-charts';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/Auth/login/login.component';
import { RegisterComponent } from './components/Auth/register/register.component';
import { ChangerMotPasseComponent } from './components/Auth/changer-mot-passe/changer-mot-passe.component';
import { MotPasseValiderComponent } from './components/Auth/mot-passe-valider/mot-passe-valider.component';
import { WaitingPageComponent } from './components/AutePage/waiting-page/waiting-page.component';
import { HeaderPageComponent } from './components/Partiales/header-page/header-page.component';
import { HeaderComponent } from './components/Partiales/header/header.component';
import { FooterComponent } from './components/Partiales/footer/footer.component';
import { NotFoundComponent } from './components/Partiales/not-found/not-found.component';
import { WaintingHeaderComponent } from './components/Partiales/wainting-header/wainting-header.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HomePageComponent } from './components/home/home-page/home-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/Admin/home/home.component';
import { HeaderAdminComponent } from './components/Admin/Partiales/header-admin/header-admin.component';
import { FooterAdminComponent } from './components/Admin/Partiales/footer-admin/footer-admin.component';
import { MenuAdminComponent } from './components/Admin/Partiales/menu-admin/menu-admin.component';
import { ResearchPluComponent } from './components/Admin/Provisioning/research-plu/research-plu.component';
import { MiseADispoComponent } from './components/Admin/Provisioning/mise-adispo/mise-adispo.component';
import { LogoutModalComponent } from './components/Admin/Partiales/logout-modal/logout-modal.component';
import { ListMiseADispoComponent } from './components/Admin/Provisioning/list-mise-adispo/list-mise-adispo.component';
import { ListAllmiseADispoComponent } from './components/Admin/Provisioning/list-allmise-adispo/list-allmise-adispo.component';
import { CommandeJourComponent } from './components/Admin/Provisioning/Commandes/commande-jour/commande-jour.component';
import { CommandePasserComponent } from './components/Admin/Provisioning/Commandes/commande-passer/commande-passer.component';
import { CommandeNoRecupereComponent } from './components/Admin/Provisioning/Commandes/commande-no-recupere/commande-no-recupere.component';
import { DetailCommandeMagasinComponent } from './components/Admin/Provisioning/Commandes/detail-commande-magasin/detail-commande-magasin.component';
import { PrintDetailCommandeComponent } from './components/Admin/Provisioning/Commandes/print-detail-commande/print-detail-commande.component';
import { ListeEtudiantsComponent } from './components/Admin/Provisioning/Magasin/liste-etudiants/liste-etudiants.component';
import { AddEtudiantComponent } from './components/Admin/generale/Etudiants/add-etudiant/add-etudiant.component';
import { ListeAllEtudiantsComponent } from './components/Admin/generale/Etudiants/liste-all-etudiants/liste-all-etudiants.component';
import { DetailEtudiantsComponent } from './components/Admin/generale/Etudiants/detail-etudiants/detail-etudiants.component';
import { AddMagasinComponent } from './components/Admin/generale/Magasin/add-magasin/add-magasin.component';
import { ListeMagasinComponent } from './components/Admin/generale/Magasin/liste-magasin/liste-magasin.component';
import { DetailMagasinComponent } from './components/Admin/generale/Magasin/detail-magasin/detail-magasin.component';

import { AddProduitsComponent } from './components/Admin/generale/produits/add-produits/add-produits.component';
import { ListProduitsComponent } from './components/Admin/generale/produits/list-produits/list-produits.component';
import { PanierComponent } from './components/client/panier/panier.component';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { UpdateImageComponent } from './components/Admin/generale/produits/update-image/update-image.component';
import { ModifProduitComponent } from './components/Admin/generale/produits/modif-produit/modif-produit.component';
import { UpdateMagasinComponent } from './components/Admin/generale/Magasin/update-magasin/update-magasin.component';
import { ProfileUsersComponent } from './components/Admin/generale/profile-users/profile-users.component';
import { ListeUserComponent } from './components/Admin/generale/Magasin/liste-user/liste-user.component';
import { ModifProduitMiseADispoComponent } from './components/Admin/Provisioning/modif-produit-mise-adispo/modif-produit-mise-adispo.component';
import { AddNotificationComponent } from './components/Admin/generale/Notification/add-notification/add-notification.component';
import { ListeNotificationComponent } from './components/Admin/generale/Notification/liste-notification/liste-notification.component';
import { MagasinInfoComponent } from './components/Admin/generale/magasin-info/magasin-info.component';
import { ModifNotificationComponent } from './components/Admin/generale/Notification/modif-notification/modif-notification.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ChangeMagComponent } from './components/Admin/generale/Etudiants/change-mag/change-mag.component';
import { AddContrainteComponent } from './components/Admin/generale/contrainte/add-contrainte/add-contrainte.component';
import { ModifContrainteComponent } from './components/Admin/generale/contrainte/modif-contrainte/modif-contrainte.component';
import { ListeContrainteComponent } from './components/Admin/generale/contrainte/liste-contrainte/liste-contrainte.component';
import { AboutComponent } from './components/Client/Autre/about/about.component';
import { ContactComponent } from './components/Client/Autre/contact/contact.component';
import { ConditionComponent } from './components/Client/Autre/condition/condition.component';
import { TermsComponent } from './components/Client/Autre/terms/terms.component';
import { MyprofileComponent } from './components/Client/Autre/myprofile/myprofile.component';
import { LogoutComponent } from './components/Partiales/logout/logout.component';
import { MyprofileModificationComponent } from './components/Client/Autre/myprofile-modification/myprofile-modification.component';
import { InfoMagasinComponent } from './components/AutrePage/info-magasin/info-magasin.component';
import { ListeproduitsComponent } from './components/client/Produits/listeproduits/listeproduits.component';
import { ListeProduitCategorieComponent } from './components/client/Produits/liste-produit-categorie/liste-produit-categorie.component';
import { DetailProduitComponent } from './components/client/Produits/detail-produit/detail-produit.component';
import { CommandePasseComponent } from './components/client/Commandes/commande-passe/commande-passe.component';
import { CommandeNonRecupereComponent } from './components/client/Commandes/commande-non-recupere/commande-non-recupere.component';
import { CommandeEncoursComponent } from './components/client/Commandes/commande-encours/commande-encours.component';
import { DetailCommandeComponent } from './components/client/Commandes/detail-commande/detail-commande.component';
import { RecapCommandeComponent } from './components/client/Commandes/recap-commande/recap-commande.component';
import { ToastComponent } from './components/toast/toast.component';
import { HistoriqueCommandeComponent } from './components/client/commandes/historique-commande/historique-commande.component';
import { CategorieProduitComponent } from './components/client/Produits/categorie-produit/categorie-produit.component';
import { FonctionnementComponent } from './components/client/Autre/fonctionnement/fonctionnement.component';
import { HomeMagasinComponent } from './components/Admin/home-magasin/home-magasin.component';
import { InscriptionComponent } from './components/Auth/inscription/inscription.component';
import { ListeMagasinsComponent } from './components/Auth/liste-magasins/liste-magasins.component';
import { InscriptionEtudiantComponent } from './components/Auth/inscription-etudiant/inscription-etudiant.component';
import { ListeMessageComponent } from './components/Admin/generale/Messsage/liste-message/liste-message.component';
import { AddMessageComponent } from './components/Admin/generale/Messsage/add-message/add-message.component';
import { ModifMessageComponent } from './components/Admin/generale/Messsage/modif-message/modif-message.component';


import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AsyncPipe } from '../../node_modules/@angular/common';
import { FaqComponent } from './components/client/Autre/faq/faq.component';
import { MiniFooterComponent } from './components/Partiales/mini-footer/mini-footer.component';


registerLocaleData(localeFr, 'fr');


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ChangerMotPasseComponent,
    MotPasseValiderComponent,
    WaitingPageComponent,
    HeaderPageComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    WaintingHeaderComponent,
    HomePageComponent,
    HomeComponent,
    HeaderAdminComponent,
    FooterAdminComponent,
    MenuAdminComponent,
    ResearchPluComponent,
    MiseADispoComponent,
    LogoutModalComponent,
    ListMiseADispoComponent,
    ListAllmiseADispoComponent,
    CommandeJourComponent,
    CommandePasserComponent,
    CommandeNoRecupereComponent,
    DetailCommandeMagasinComponent,
    PrintDetailCommandeComponent,
    ListeEtudiantsComponent,
    AddEtudiantComponent,
    ListeAllEtudiantsComponent,
    DetailEtudiantsComponent,
    AddMagasinComponent,
    ListeMagasinComponent,
    DetailMagasinComponent,
    AddProduitsComponent,
    ListProduitsComponent,
    PanierComponent,
    UpdateImageComponent,
    ModifProduitComponent,
    UpdateMagasinComponent,
    ProfileUsersComponent,
    ListeUserComponent,
    ModifProduitMiseADispoComponent,
    AddNotificationComponent,
    ListeNotificationComponent,
    MagasinInfoComponent,
    ModifNotificationComponent,
    ChangeMagComponent,
    AddContrainteComponent,
    ModifContrainteComponent,
    ListeContrainteComponent,
    AboutComponent,
    ContactComponent,
    ConditionComponent,
    TermsComponent,
    MyprofileComponent,
    LogoutComponent,
    MyprofileModificationComponent,
    InfoMagasinComponent,
    ListeproduitsComponent,
    ListeProduitCategorieComponent,
    DetailProduitComponent,
    CommandePasseComponent,
    CommandeNonRecupereComponent,
    CommandeEncoursComponent,
    DetailCommandeComponent,
    RecapCommandeComponent,
    ToastComponent,
    HistoriqueCommandeComponent,
    CategorieProduitComponent,
    FonctionnementComponent,
    HomeMagasinComponent,
    InscriptionComponent,
    ListeMagasinsComponent,
    InscriptionEtudiantComponent,
    ListeMessageComponent,
    AddMessageComponent,
    ModifMessageComponent,
    FaqComponent,
    MiniFooterComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    CarouselModule,
    NgbPaginationModule,
     NgbAlertModule,
     DataTablesModule,
     NgxPrintModule,
     ChartsModule,
    NgbModule,
    AngularFireMessagingModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebase),
    ToastrModule.forRoot({
      timeOut: 2000,
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      // registrationStrategy: 'registerWhenStable:30000'
    })


  ],
  providers: [AsyncPipe,
    //{provide: HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
    {provide: LOCALE_ID, useValue: "fr-CA" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
