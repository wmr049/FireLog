import { Component, OnInit, ViewChildren, ElementRef, AfterViewInit, ViewContainerRef } from '@angular/core';
import { UsuarioService } from 'app/pages/usuario/services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

import { Subscription } from 'rxjs/Subscription';
import { Usuario } from 'app/pages/usuario/models/usuario';
import { FormGroup, FormControlName, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { GenericValidator } from 'app/utils/forms.generic.validator';
import { ToastsManager, Toast } from 'ng2-toastr';

@Component({
  selector: 'nga-profile',
  styleUrls: ['./profile.scss'],
  templateUrl: './profile.html',
})
export class ProfileComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  private sub: Subscription;
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;
  private modalVisible: boolean;

  displayMessage: { [key: string]: string } = {};
  usuario: Usuario;
  usuarioForm: FormGroup;
  errors: any[] = [];
  emailParametersUser: any[];

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastsManager,
    private sanitizer: DomSanitizer,
    vcr: ViewContainerRef) {

    this.toastr.setRootViewContainerRef(vcr);

    this.validationMessages = {
      name: {
        required: 'O Nome é requerido.',
        minlength: 'O Nome precisa ter no mínimo 2 caracteres',
        maxlength: 'O Nome precisa ter no máximo 150 caracteres',
      },
      email: {
        required: 'O e-mail é requerido.',
      },
      cpf: {
        required: 'O CPF é requerido.',
        minlength: 'O CPF precisa ter no mínimo 11 caracteres',
        maxlength: 'O CPF precisa ter no máximo 11 caracteres',
      },
    };

    this.genericValidator = new GenericValidator(this.validationMessages);

    this.emailParametersUser = usuarioService.emailParametersUser;
  }


  ngOnInit() {

    this.usuarioForm = this.fb.group({
      name: ['', [Validators.required,
      Validators.minLength(2),
      Validators.maxLength(150)]],
      email: ['', Validators.required],
      cpf: ['', [Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11)]],
    });

    this.obterUsuario();
  }

  editarUsuario() {

    if (this.usuarioForm.dirty && this.usuarioForm.valid) {
      const profileUser = Object.assign({}, this.usuario, this.usuarioForm.value);

      const user = {
        'id': '59d5ec60a900b03c94dfe027',
        'name': 'Milton Oliveira Reis',
        'email': 'milton.oliveira.reis@gmail.com',
        'password': 'reis2000',
        'confirmPassword': 'reis2000',
        'cpf': '30877030871',
        'roles': 'admin',
      };

      this.usuarioService.atualizarUsuario(user)
        .subscribe(
        result => { this.onSaveComplete(); },
        error => {
          this.errors = JSON.parse(error._body).errors;
        });
    }
  }

  obterUsuario() {

    this.usuario = this.usuarioService.obterUsuario();

    this.usuarioForm.patchValue({
      name: this.usuario.name,
      email: this.usuario.email,
      cpf: this.usuario.cpf,
    });
  }

  onSaveComplete(): void {
    this.errors = [];

    this.toastr.success('Usuario atualizado com sucesso!', 'Oba :D', { dismiss: 'controlled' })
      .then((toast: Toast) => {
        setTimeout(() => {
          this.toastr.dismissToast(toast);
          this.router.navigate(['/pages/main']);
        }, 2500);
      });
  }
}

