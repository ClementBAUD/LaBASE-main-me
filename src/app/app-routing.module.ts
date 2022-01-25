import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/Auth/login/login.component';
import { RegisterComponent } from './components/Auth/register/register.component';
import { ChangerMotPasseComponent } from './components/Auth/changer-mot-passe/changer-mot-passe.component';
import { MotPasseValiderComponent } from './components/Auth/mot-passe-valider/mot-passe-valider.component';
import { WaitingPageComponent } from './components/AutePage/waiting-page/waiting-page.component';
import { HomePageComponent } from './components/home/home-page/home-page.component';
import { HomeComponent } from './components/Admin/home/home.component';
import { ResearchPluComponent } from './components/Admin/Provisioning/research-plu/research-plu.component';
import { MiseADispoComponent } from './components/Admin/Provisioning/mise-adispo/mise-adispo.component';
import { ListMiseADispoComponent } from './components/Admin/Provisioning/list-mise-adispo/list-mise-adispo.component';
import { ListAllmiseADispoComponent } from './components/Admin/Provisioning/list-allmise-adispo/list-allmise-adispo.component';
import { NotFoundComponent } from './components/Partiales/not-found/not-found.component';
import { CommandeJourComponent } from './components/Admin/Provisioning/Commandes/commande-jour/commande-jour.component';
import { DetailCommandeMagasinComponent } from './components/Admin/Provisioning/Commandes/detail-commande-magasin/detail-commande-magasin.component';
import { ListeEtudiantsComponent } from './components/Admin/Provisioning/Magasin/liste-etudiants/liste-etudiants.component';
import { ListeAllEtudiantsComponent } from './components/Admin/generale/Etudiants/liste-all-etudiants/liste-all-etudiants.component';

import { AddMagasinComponent } from './components/Admin/generale/Magasin/add-magasin/add-magasin.component';
import { ListeMagasinComponent } from './components/Admin/generale/Magasin/liste-magasin/liste-magasin.component';
import { DetailMagasinComponent } from './components/Admin/generale/Magasin/detail-magasin/detail-magasin.component';
import { AddEtudiantComponent } from './components/Admin/generale/Etudiants/add-etudiant/add-etudiant.component';
import { DetailEtudiantsComponent } from './components/Admin/generale/Etudiants/detail-etudiants/detail-etudiants.component';

import { AddProduitsComponent } from './components/Admin/generale/produits/add-produits/add-produits.component';
import { ListProduitsComponent } from './components/Admin/generale/produits/list-produits/list-produits.component';

import { PanierComponent } from './components/client/panier/panier.component';
import{AuthGuard} from './services/authentification/auth.guard';

import { UpdateImageComponent } from './components/Admin/generale/produits/update-image/update-image.component';
import { ModifProduitComponent } from './components/Admin/generale/produits/modif-produit/modif-produit.component';
import { UpdateMagasinComponent } from './components/Admin/generale/Magasin/update-magasin/update-magasin.component';

import { ProfileUsersComponent } from './components/Admin/generale/profile-users/profile-users.component';
import { ListeUserComponent } from './components/Admin/generale/Magasin/liste-user/liste-user.component';

import { ModifProduitMiseADispoComponent } from './components/Admin/Provisioning/modif-produit-mise-adispo/modif-produit-mise-adispo.component';

import { CommandePasserComponent } from './components/Admin/Provisioning/Commandes/commande-passer/commande-passer.component';
import { CommandeNoRecupereComponent } from './components/Admin/Provisioning/Commandes/commande-no-recupere/commande-no-recupere.component';


import { ChangeMagComponent } from './components/Admin/generale/Etudiants/change-mag/change-mag.component';

import { AddContrainteComponent } from './components/Admin/generale/contrainte/add-contrainte/add-contrainte.component';
import { ModifContrainteComponent } from './components/Admin/generale/contrainte/modif-contrainte/modif-contrainte.component';
import { ListeContrainteComponent } from './components/Admin/generale/contrainte/liste-contrainte/liste-contrainte.component';

import { AboutComponent } from './components/Client/Autre/about/about.component';
import { ContactComponent } from './components/Client/Autre/contact/contact.component';
import { ConditionComponent } from './components/Client/Autre/condition/condition.component';
import { TermsComponent } from './components/Client/Autre/terms/terms.component';
import { MyprofileComponent } from './components/Client/Autre/myprofile/myprofile.component';
import { MyprofileModificationComponent } from './components/Client/Autre/myprofile-modification/myprofile-modification.component';
import { InfoMagasinComponent } from './components/AutrePage/info-magasin/info-magasin.component';
import { ListeproduitsComponent } from './components/client/Produits/listeproduits/listeproduits.component';
import { ListeProduitCategorieComponent } from './components/client/Produits/liste-produit-categorie/liste-produit-categorie.component';
import { DetailProduitComponent } from './components/client/Produits/detail-produit/detail-produit.component';

import { RecapCommandeComponent } from './components/client/Commandes/recap-commande/recap-commande.component';
import { DetailCommandeComponent } from './components/client/Commandes/detail-commande/detail-commande.component';
import { HistoriqueCommandeComponent } from './components/client/commandes/historique-commande/historique-commande.component';
import { CommandePasseComponent } from './components/client/Commandes/commande-passe/commande-passe.component';
import { CommandeNonRecupereComponent } from './components/client/Commandes/commande-non-recupere/commande-non-recupere.component';
import { CategorieProduitComponent } from './components/client/Produits/categorie-produit/categorie-produit.component';
import { FonctionnementComponent } from './components/client/Autre/fonctionnement/fonctionnement.component';

import { HomeMagasinComponent } from './components/Admin/home-magasin/home-magasin.component';
import { InscriptionComponent } from './components/Auth/inscription/inscription.component';
import { ListeMagasinsComponent } from './components/Auth/liste-magasins/liste-magasins.component';

import { InscriptionEtudiantComponent } from './components/Auth/inscription-etudiant/inscription-etudiant.component';

import { ListeMessageComponent } from './components/Admin/generale/Messsage/liste-message/liste-message.component';
import { AddMessageComponent } from './components/Admin/generale/Messsage/add-message/add-message.component';
import { ModifMessageComponent } from './components/Admin/generale/Messsage/modif-message/modif-message.component';
import { FaqComponent } from './components/client/Autre/faq/faq.component';

const routes: Routes = [
  {path:'', component: LoginComponent},
   //
   {path: 'select-magasins', component: ListeMagasinsComponent},

  {path: 'home', component: HomePageComponent, canActivate: [AuthGuard],data: { role: 'Etudiant-valider'}},
  {path:'notification-test', component: RegisterComponent},
  //InscriptionEtudiantComponent
  {path:'inscription-etudiant', component: InscriptionEtudiantComponent},
  {path:'forgot-password', component: ChangerMotPasseComponent},
  {path: 'waiting-Page', component: WaitingPageComponent, canActivate: [AuthGuard],data: { role: 'Etudiant-attente'}},
  {path: 'renewing-Page', component: WaitingPageComponent, canActivate: [AuthGuard],data: { role: 'Etudiant-renouvellement'}},
  {path:'waiting-Page', component: WaitingPageComponent},
  {path:'forgot-password-valider', component: MotPasseValiderComponent},
  {path:'cart', component: PanierComponent,canActivate:[AuthGuard]},

  /**
   * etudiant
   */
   {path:'a-propos', component: AboutComponent,canActivate: [AuthGuard]},
   {path:'contact', component: ContactComponent,canActivate: [AuthGuard]},
   {path:'politique-confidentialite', component: ConditionComponent,canActivate: [AuthGuard]},
   {path:'terme-condition', component: TermsComponent},
   {path: 'mode-fonctionnement', component: FonctionnementComponent},
   {path: 'lance', component: InscriptionComponent},
  //

   {path:'mon-profil', component: MyprofileComponent,canActivate:[AuthGuard]},
   {path:'edit-mon-profil/:id', component: MyprofileModificationComponent,canActivate:[AuthGuard]},
   {path:'information', component: InfoMagasinComponent,canActivate:[AuthGuard]},
   {path: 'liste-produits', component: ListeproduitsComponent, canActivate: [AuthGuard],data: {role: 'Etudiant-valider'}},
   {path: 'categorie-liste-produits/:id', component: ListeProduitCategorieComponent, canActivate: [AuthGuard],data: {role: 'Etudiant-valider'}},
   {path: 'detail-produit/:id', component: DetailProduitComponent, canActivate: [AuthGuard],data: {role: 'Etudiant-valider'}},
   {path: 'commande-passee', component: CommandePasseComponent, canActivate: [AuthGuard],data: {role: 'Etudiant-valider'}},
   {path: 'commande-non-recuperee', component: CommandeNonRecupereComponent, canActivate: [AuthGuard],data: {role: 'Etudiant-valider'}},
   {path: 'categorie-produit', component: CategorieProduitComponent, canActivate: [AuthGuard],data: {role: 'Etudiant-valider'}},
   {path: 'faq', component: FaqComponent, canActivate: [AuthGuard]},

   //FaqComponent


//
   {path: 'recapitulatif-commande/:id', component: RecapCommandeComponent, canActivate: [AuthGuard],data: {role: 'Etudiant-valider'}},
   {path: 'detail-commande/:id', component: DetailCommandeComponent, canActivate: [AuthGuard],data: {role: 'Etudiant-valider'}},
   {path: 'historique-commande', component: HistoriqueCommandeComponent, canActivate: [AuthGuard],data: {role: 'Etudiant-valider'}},


//ListeProduitCategorieComponent



  // magasin et admin
  /**
   * Magasin
   */

  {path: 'home-magasin', component: HomeMagasinComponent, canActivate: [AuthGuard],data: {role: 'Magasin-attente'}},
  {path: 'home-admin', component: HomeComponent, canActivate: [AuthGuard],data: {role: 'Admin-attente'}},
  {path:'rechercher-plu-admin', component: ResearchPluComponent,canActivate:[AuthGuard]},
  {path:'mise-produit-disposition/:id', component: MiseADispoComponent,canActivate: [AuthGuard],data: {role: 'Magasin-attente'}},
  {path:'liste-produit-disponible', component: ListMiseADispoComponent,canActivate:[AuthGuard],data: {role: 'Magasin-attente'}},
  {path:'liste-all-produit-disponible', component: ListAllmiseADispoComponent,canActivate:[AuthGuard]},
  {path:'commande-magasin-jour', component: CommandeJourComponent,canActivate:[AuthGuard]},
  {path:'detail-magasin-commande/:id', component: DetailCommandeMagasinComponent,canActivate:[AuthGuard]},
  //{path:'magasin-etudiant', component:ListeEtudiantsComponent },
  {path:'profile-utilisateur', component:ProfileUsersComponent,canActivate:[AuthGuard] },
  {path: 'liste-etudiant-magasin', component: ListeUserComponent, canActivate: [AuthGuard],data: {role: 'Magasin-attente'}},
  {path:'modif-produit-disponible/:id', component: ModifProduitMiseADispoComponent,canActivate:[AuthGuard],data: {role: 'Magasin-attente'}},
  {path:'magasin-commande-passé', component: CommandePasserComponent,canActivate:[AuthGuard],data: {role: 'Magasin-attente'}},
  {path:'magasin-commande-non-récupérer', component: CommandeNoRecupereComponent,canActivate:[AuthGuard],data: {role: 'Magasin-attente'}},


  /**
   * Admin
   */
   {path:'all-etudiant', component:ListeAllEtudiantsComponent,canActivate:[AuthGuard],data: {role: 'Admin-attente'}},
   {path:'detail-etudiant/:id', component: DetailEtudiantsComponent,canActivate:[AuthGuard],data: {role: 'Admin-attente'}},
   {path:'admin-add-user', component: AddEtudiantComponent,canActivate:[AuthGuard]},


   {path:'add-produits', component: AddProduitsComponent,canActivate:[AuthGuard],data: {role: 'Admin-attente'}},
   {path:'all-produits', component: ListProduitsComponent,canActivate:[AuthGuard],data: {role: 'Admin-attente'}},
   {path:'modif-produits/:id', component: ModifProduitComponent,canActivate:[AuthGuard],data: {role: 'Admin-attente'}},
   {path:'modif-image-produits/:id', component: UpdateImageComponent,canActivate:[AuthGuard],data: {role: 'Admin-attente'}},

   {path:'add-magasin', component: AddMagasinComponent,canActivate:[AuthGuard],data: {role: 'Admin-attente'}},
   {path:'liste-magasin', component: ListeMagasinComponent,canActivate:[AuthGuard],data: {role: 'Admin-attente'}},
   {path:'detail-magasin', component: DetailMagasinComponent,canActivate:[AuthGuard],data: {role: 'Admin-attente'}},

   {path:'modif-magasin/:id', component: UpdateMagasinComponent,canActivate:[AuthGuard],data: {role: 'Admin-attente'}},
  //ChangeMagComponent
  {path:'etudiant-magasin/:id', component: ChangeMagComponent,canActivate:[AuthGuard],data: {role: 'Admin-attente'}},

  {path:'add-contrainte-magasin', component: AddContrainteComponent,canActivate:[AuthGuard],data: {role: 'Admin-attente'}},
  {path:'edit-contrainte-magasin/:id', component: ModifContrainteComponent,canActivate:[AuthGuard],data: {role: 'Admin-attente'}},
  {path:'liste-contrainte', component: ListeContrainteComponent,canActivate:[AuthGuard],data: {role: 'Admin-attente'}},

  {path:'liste-messages', component: ListeMessageComponent,canActivate:[AuthGuard],data: {role: 'Admin-attente'}},
  {path:'edit-message', component: ModifMessageComponent,canActivate:[AuthGuard],data: {role: 'Admin-attente'}},
  {path:'add-message', component: AddMessageComponent,canActivate:[AuthGuard],data: {role: 'Admin-attente'}},




  { path: "**", pathMatch: 'full', component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
