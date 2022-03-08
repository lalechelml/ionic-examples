import { Component, OnInit } from '@angular/core';
import { AnimalModel } from 'src/app/model/animal.model';
import { GenericHelperService } from '../../helper/generic-helper.service';

@Component(
{
	selector: 'app-example',
	templateUrl: './example.page.html',
	styleUrls: ['./example.page.scss']
})

export class ExamplePage implements OnInit
{
	headerTitle: string;

	dogName: string;
	dogColor: string;
	dogYearOld: string;
	dogBreed: string;

	animalArray: Array<AnimalModel>;

	constructor(
		private ghs: GenericHelperService
	){}

	ngOnInit()
	{
		this.headerTitle='Ejemplo de mantenimiento';

		this.animalArray=[new AnimalModel('Rambo', 'Marrón', 7, 'Dóberman')];
	}

	async insertMascot()
	{
		await this.ghs.confirm(() => {
			this.animalArray.push(new AnimalModel(this.dogName, this.dogColor, parseInt(this.dogYearOld), this.dogBreed));

			this.dogName=null;
			this.dogColor=null;
			this.dogYearOld=null;
			this.dogBreed=null;

			this.ghs.presentToast('Registro realizado correctamente.');
		});
	}

	async deleteMascot(key: number)
	{
		await this.ghs.confirm(() => {
			this.animalArray.splice(key, 1);

			this.ghs.presentToast('Registro eliminado correctamente.');
		});
	}
}