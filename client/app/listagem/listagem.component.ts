import { Component } from '@angular/core';
import { FotoService } from '../foto/foto.service';
import { FotoComponent } from '../foto/foto.component';

@Component({
	moduleId: module.id,
	selector: 'listagem',
	templateUrl: './listagem.component.html'
})

export class ListagemComponent {
	fotos: FotoComponent[] = [];
	service: FotoService;

	constructor(service: FotoService) {
		this.service = service;
		service.lista().subscribe(res => this.fotos = res, erro => console.error(erro));
	}

	remove(foto: FotoComponent): void {
		this.service.remove(foto).subscribe(() => {
			let novasFotos = this.fotos.slice(0);
			let indice = novasFotos.indexOf(foto);
			novasFotos.splice(indice, 1);
			this.fotos = novasFotos;
		}, erro => console.error(erro));
	}
}