import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { ApiLanguageService } from 'src/app/api/api-language.service';
import { GenericHelperService } from 'src/app/helper/generic-helper.service';

@Component(
	{
		selector: 'app-insert',
		templateUrl: './insert.page.html',
		styleUrls: ['./insert.page.scss'],
	})

export class InsertPage implements OnInit {
	headerTitle: string;

	frmInsertLanguage: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private ghs: GenericHelperService,
		private loadingController: LoadingController,
		private apiLanguageService: ApiLanguageService
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

			this.apiLanguageService.insert(formData).subscribe(so => {
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
			});
		});
	}
}