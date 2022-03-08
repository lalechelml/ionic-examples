import { Injectable } from '@angular/core';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Injectable(
{
	providedIn: 'root'
})

export class GenericHelperService
{
	constructor(
		private menuController: MenuController,
		private alertController: AlertController,
		private toastController: ToastController,
		private loadingController: LoadingController
	){}

	openPrincipalMenu()
	{
		this.menuController.enable(true, 'principalMenu');
		this.menuController.open('principalMenu');
	}

	async presentToast(message: string)
	{
		const toast=await this.toastController.create(
		{
			message: message,
			duration: 3000
		});

		toast.present();
	}

	async confirm(functionToProcess: Function)
	{
		const alert=await this.alertController.create(
		{
			header: 'Confirmación',
			message: '¿Desea proceder?',
			buttons: [
			{
				text: 'Cancelar',
				role: 'cancel',
				handler: (x) => {}
			},
			{
				text: 'Aceptar',
				handler: () => {
					functionToProcess();
				}
			}]
		});

		alert.present();
	}

	async presentLoading()
	{
		const loading=await this.loadingController.create(
		{
			message: 'Cargando datos...'
		});

		await loading.present();
	}
}