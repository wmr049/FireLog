import { Component, OnInit } from '@angular/core';

import { GlobalState } from '../../../global.state';
import { Router } from '@angular/router';

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
  styleUrls: ['./baPageTop.scss'],
})
export class BaPageTop implements OnInit {

  ngOnInit(): void { }

  isScrolled: boolean = false;
  isMenuCollapsed: boolean = false;
  token;
  user;
  nome: string = '';

  constructor(private _state: GlobalState,
    private router: Router) {

    this.token = localStorage.getItem('eio.token');
    this.user = JSON.parse(localStorage.getItem('eio.user'));

    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });

  }

  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }

  usuarioLogado(): boolean {
    this.token = localStorage.getItem('eio.token');
    this.user = JSON.parse(localStorage.getItem('eio.user'));

    if (this.user) {
      this.nome = this.user.name;
    }
    return this.token !== null;
  }

  logout() {
    localStorage.removeItem('eio.token');
    localStorage.removeItem('eio.user');
    this.router.navigateByUrl('/');
  }
}
