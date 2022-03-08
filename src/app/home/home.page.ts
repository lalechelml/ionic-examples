import { Component } from '@angular/core';

@Component(
{
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss']
})

export class HomePage
{
	headerTitle: string;

	constructor(){}

	ngOnInit()
	{
		this.headerTitle='Página principal';
	}
}