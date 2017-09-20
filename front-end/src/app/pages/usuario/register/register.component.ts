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
  selector: 'register',
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class Register implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  errors: any[] = [];
  inscricaoForm: FormGroup;
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
      name: {
        required: 'O Nome é requerido.',
        minlength: 'O Nome precisa ter no mínimo 2 caracteres',
        maxlength: 'O Nome precisa ter no máximo 150 caracteres',
      },
      cpf: {
        required: 'Informe o CPF',
        rangeLength: 'CPF deve conter 11 caracteres',
      },
      email: {
        required: 'Informe o e-mail',
        email: 'Email invalido',
      },
      password: {
        required: 'Informe a senha',
        minlength: 'A senha deve possuir no mínimo 6 caracteres',
      },
      confirmPassword: {
        required: 'Informe a senha novamente',
        minlength: 'A senha deve possuir no mínimo 6 caracteres',
        equalTo: 'As senhas não conferem',
      },
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
    this.usuario = new Usuario();
  }

  ngOnInit() {

    const password = new FormControl('', [Validators.required, Validators.minLength(6)]);
    const confirmPassword = new FormControl('', [Validators.required,
      Validators.minLength(6),
      CustomValidators.equalTo(password)]);

    this.inscricaoForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)]],
      cpf: ['', [Validators.required, CustomValidators.rangeLength([11, 11])]],
      email: ['', [Validators.required, CustomValidators.email]],
      password,
      confirmPassword,
    });
  }

  ngAfterViewInit(): void {
    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

    Observable.merge(...controlBlurs).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.inscricaoForm);
    });
  }

  adicionarUsuario() {
    if (this.inscricaoForm.dirty && this.inscricaoForm.valid) {
      // add o cara no banco
      const o = Object.assign({}, this.usuario, this.inscricaoForm.value);

      this.usuarioService.registrarUsuario(o)
        .subscribe(
        result => { this.onSaveComplete(result); },
        error => { this.onSaveError(error); },
        );
    }
  }

  onSaveError(error: any): void {
    this.errors = JSON.parse(error._body).errors;
    this.toastr.error('Ocorreu um erro ao registrar o usuario', 'Ops :(');
  }

  onSaveComplete(response: any): void {
    this.inscricaoForm.reset();
    this.errors = [];

    localStorage.setItem('eio.token', response.token);
    localStorage.setItem('eio.user', JSON.stringify(response.user));

    this.toastr.success('Usuario registrado com sucesso', 'Bem Vindo !!', { dismiss: 'controlled' })
      .then((toast: Toast) => {
        setTimeout(() => {
          this.toastr.dismissToast(toast);
          this.router.navigate(['/pages/main']);
        }, 3500);
      });
  }

}
