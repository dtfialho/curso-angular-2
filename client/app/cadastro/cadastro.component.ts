import { Component } from '@angular/core';
import { FotoComponent } from '../foto/foto.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FotoService } from '../foto/foto.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	moduleId: module.id,
	selector: 'cadastro',
	templateUrl: './cadastro.component.html'
})

export class CadastroComponent {
	foto: FotoComponent = new FotoComponent();
	meuForm: FormGroup;
	service: FotoService;
	route: ActivatedRoute;

	constructor(service: FotoService, fb: FormBuilder, route: ActivatedRoute) {
		this.service = service;
		this.route = route;

		this.route.params.subscribe(params => {
			let id = params['id'];
			if(id) {
				this.service.buscaPorId(id).subscribe(foto => this.foto = foto);
			}
		});

		this.meuForm = fb.group({
			titulo: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
			url: ['', Validators.required],
			descricao: ['']
		});
	}

	cadastrar(e) {
		e.preventDefault();

		this.service.cadastra(this.foto).subscribe(() => {
			console.log('Foto cadastrada com sucesso');
			this.foto = new FotoComponent();
		}, erro => console.error(erro));
	}
}