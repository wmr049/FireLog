import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService implements CanActivate {
  token: string;
  user;

  constructor(private router: Router) { }

  canActivate(routeAc: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.token = localStorage.getItem('eio.token');
    this.user = JSON.parse(localStorage.getItem('eio.user'));

    if (!this.token) {
      this.router.navigate(['/usuario/login']);
      return false;
    }

    let claim: any = routeAc.data[0];
    if (claim !== undefined) {
      claim = routeAc.data[0]['claim'];

      if (claim) {
        if (!this.user.claims) {
          this.router.navigate(['/acesso-negado']);
          return false;
        }

        const userClaims = this.user.claims.some(x => x.type === claim.nome && x.value === claim.valor);
        if (!userClaims) {
          this.router.navigate(['/acesso-negado']);
          return false;
        }
      }
    }

    return true;
  }

}
