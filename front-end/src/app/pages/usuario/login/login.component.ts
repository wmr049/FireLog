import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormControlName, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';

import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import { CustomValidators, CustomFormsModule } from 'ng2-validation';
import { GenericValidator } from 'app/utils/forms.generic.validator';
import { Usuario } from 'app/pages/usuario/models/usuario';
import { UsuarioService } from 'app/services/usuario.service';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class Login implements OnInit, AfterViewInit {
  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  loginForm: FormGroup;
  usuario: Usuario;
  displayMessage: { [key: string]: string } = {};
  validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;


  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router,
    public toastr: ToastsManager,
    vcr: ViewContainerRef) {

    this.toastr.setRootViewContainerRef(vcr);

    this.validationMessages = {
      email: {
        required: 'Informe o e-mail',
        email: 'Email invalido',
      },
      password: {
        required: 'Informe a senha  ',
        minlength: 'A senha deve possuir no mínimo 6 caracteres',
      },
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
    this.usuario = new Usuario();
  }


  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

    Observable.merge(...controlBlurs).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.loginForm);
    });
  }


  ngOnInit(): void {
    this.loginForm = this.fb.group({

      email: ['', [Validators.required, CustomValidators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  login() {
    if (this.loginForm.dirty && this.loginForm.valid) {
      const p = Object.assign({}, this.usuario, this.loginForm.value);

      this.usuarioService.login(p)
        .subscribe(
        result => { this.onLoginComplete(result); },
        error => { this.onLoginError(error); },
        );
    }
  }


  onLoginError(error: any): void {
    this.errors = JSON.parse(error._body).errors;
    this.toastr.error('Ocorreu um erro ao logar o usuario', 'Ops :(');
  }

  onLoginComplete(response: any): void {
    this.loginForm.reset();
    this.errors = [];

    localStorage.setItem('eio.token', response.token);
    localStorage.setItem('eio.user', JSON.stringify(response.user));

    this.toastr.success('Usuario logado com sucesso', 'Bem Vindo !!', { dismiss: 'controlled' })
      .then((toast: Toast) => {
        setTimeout(() => {
          this.toastr.dismissToast(toast);
          this.router.navigate(['/pages/main']);
        }, 3500);
      });
  }

}
