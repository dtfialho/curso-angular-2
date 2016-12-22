import { Component } from '@angular/core';
import { FotoService } from '../foto/foto.service';
import { FotoComponent } from '../foto/foto.component';
import { PainelComponent } from '../painel/painel.component';

@Component({
	moduleId: module.id,
	selector: 'listagem',
	templateUrl: './listagem.component.html'
})

export class ListagemComponent {
	fotos: FotoComponent[] = [];
	service: FotoService;
	mensagem: string = '';

	constructor(service: FotoService) {
		this.service = service;
		service.lista().subscribe(res => this.fotos = res, erro => console.error(erro));
	}

	remove(foto: FotoComponent, painel: PainelComponent): void {
		this.service.remove(foto).subscribe(() => {
			painel.fadeOut(() => {
				let novasFotos = this.fotos.slice(0);
				let indice = novasFotos.indexOf(foto);
				novasFotos.splice(indice, 1);
				this.fotos = novasFotos;
				this.mensagem = 'Foto removida com sucesso';
			})
		}, erro => {
			console.error(erro));
			this.mensagem = 'Não foi possível remover a foto';
		}
	}
}