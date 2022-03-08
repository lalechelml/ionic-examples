import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { ApiLanguageService } from 'src/app/api/api-language.service';
import { GenericHelperService } from 'src/app/helper/generic-helper.service';
import { ApiLanguageModel } from 'src/app/model/api-language.model';
import { EditPage } from '../edit/edit.page'; 
 
@Component(
	{
		selector: 'app-get-all',
		templateUrl: './get-all.page.html',
		styleUrls: ['./get-all.page.scss']
	})

export class GetAllPage implements OnInit {
	headerTitle: string;
	arrayLanguage: Array<ApiLanguageModel>;

	constructor(
		private ghs: GenericHelperService,
		private loadingController: LoadingController,
		private apiLanguageService: ApiLanguageService,
		private modalController: ModalController
	) { }



	async ngOnInit() {
		this.headerTitle = 'Lista de lenguajes';
        this.getData();
		 
	}
   
	 async getData(){  
		await this.ghs.presentLoading();

		this.apiLanguageService.getAll().subscribe(so => {
			this.loadingController.dismiss();

			if (so.mo.type == 'error' || so.mo.type == 'exception') {
				so.mo.listMessage.forEach(element => {
					this.ghs.presentToast(element);

					return false;
				});

				return;
			}

			this.arrayLanguage = so.dto.listTLanguage;
		}); 

	}
	  
	deleteLanguage(idLanguage: string) {
		this.ghs.confirm(async () => {
			await this.ghs.presentLoading();

			this.apiLanguageService.delete(idLanguage).subscribe(so => {
				this.loadingController.dismiss();

				if (so.mo.type == 'error' || so.mo.type == 'exception') {
					so.mo.listMessage.forEach(element => {
						this.ghs.presentToast(element);

						return false;
					});

					return;
				}

				this.ghs.presentToast(so.mo.listMessage[0]);

				this.arrayLanguage.forEach((element, index) => {
					if (element.idLanguage == idLanguage) {
						this.arrayLanguage.splice(index, 1);

						return false;
					}
				});
			});
		});
	}

	async openModal(idLanguage: string, name: string
	) {

		const modal = await this.modalController.create({
			component: EditPage,
			cssClass: 'my-custom-class',
			componentProps: {
				idLanguage,
				name
			}
		}); 
	      
		 await modal.present();  
		 const { data } = await modal.onWillDismiss();
		 this.getData(); 
		  
		 

	} 
	 
	 
}