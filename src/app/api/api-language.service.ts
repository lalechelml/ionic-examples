import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, retry } from 'rxjs/operators';
import { ServiceObject } from '../service-object/service-object';

@Injectable({
	providedIn: 'root',
})
export class ApiLanguageService {
	constructor(private httpClient: HttpClient) {}

	insert(formData: FormData) {
		return this.httpClient
			.post(
				`http://localhost/apprest20212/public/language/insert`,
				formData
			)
			.pipe(
				retry(3),
				catchError((error) => null),
				map((response) => response as ServiceObject)
			);
	}

	getAll() {
		return this.httpClient
			.get(`http://localhost/apprest20212/public/language/getll`)
			.pipe(
				retry(3),
				catchError((error) => null),
				map((response) => response as ServiceObject)
			);
	}

	delete(primaryKey: string) {
		return this.httpClient
			.get(
				`http://localhost/apprest20212/public/language/delete/${primaryKey}`
			)
			.pipe(
				retry(3),
				catchError((error) => null),
				map((response) => response as ServiceObject)
			);
	}

	edit(formData: FormData) {
		return this.httpClient
			.post(
				`http://localhost/apprest20212/public/language/update`,
				formData
			)
			.pipe(
				retry(3),
				catchError((error) => null),
				map((response) => response as ServiceObject)
			);
	}
}
