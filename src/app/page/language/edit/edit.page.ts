import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { ApiLanguageService } from 'src/app/api/api-language.service';
import { GenericHelperService } from 'src/app/helper/generic-helper.service';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.page.html',
	styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
	@Input() idLanguage: string; 
	@Input() name: string; 

	headerTitle: string;

	frmInsertLanguage: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private ghs: GenericHelperService,
		private loadingController: LoadingController,
		private apiLanguageService: ApiLanguageService,
		private modalController: ModalController

	) {
		this.buildForm();
	}
 
	
	get nameFv() { return this.frmInsertLanguage.get('name'); }

	buildForm() {
		this.frmInsertLanguage = this.formBuilder.group(
			{
				name: [null, [Validators.required]]
			});
	}

	ngOnInit() {
		this.headerTitle = 'Registrar lenguaje'; 
		this.nameFv.setValue(this.name);
	 }

	sendFrmLanguage() {
		if (!this.frmInsertLanguage.valid) {
			this.nameFv.markAsDirty();

			this.ghs.presentToast('Corrija los datos antes de continuar.');

			return;
		}

		this.ghs.confirm(async () => {
			await this.ghs.presentLoading();

			let formData = new FormData(); 

			formData.append('name', this.nameFv.value);
			formData.append('idLanguage', this.idLanguage);
			this.apiLanguageService.edit(formData).subscribe(so => {
				this.loadingController.dismiss();

				if (so.mo.type == 'error' || so.mo.type == 'exception') {
					so.mo.listMessage.forEach(element => {
						this.ghs.presentToast(element);

						return false;
					});

					return;
				}

				this.ghs.presentToast(so.mo.listMessage[0]);

				this.frmInsertLanguage.reset(); 
				this.closeModal();
			});
		});
	}  

	closeModal() {
		this.modalController.dismiss();
	
	  } 
}



