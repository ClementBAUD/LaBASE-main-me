export class AbonnementUser {
  id: number;
  idmag:number;
  subscription: string;

  constructor(p_id: number, p_sub: string,p_idmag:number) {
      this.id = p_id;
      this.subscription = p_sub;
      this.idmag=p_idmag;
  }
}
