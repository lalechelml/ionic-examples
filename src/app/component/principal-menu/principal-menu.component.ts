import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { MenuModel } from 'src/app/model/menu.model';

@Component(
{
	selector: 'app-principal-menu',
	templateUrl: './principal-menu.component.html',
	styleUrls: ['./principal-menu.component.scss']
})

export class PrincipalMenuComponent implements OnInit
{
	menuOptions: Array<MenuModel>;

	constructor(
		private menuController: MenuController,
		private navController: NavController
	){}

	ngOnInit()
	{
		this.menuOptions=
		[
			new MenuModel('Página principal', 'home'),
			new MenuModel('Operaciones matemáticas', 'page/math'),
			new MenuModel('Ejemplo de mantenimiento', 'page/example'),
			new MenuModel('Registrar lenguaje', 'language/insert'),
			new MenuModel('Listar lenguage', 'language/getall')
		];
	}

	goToPage(routePath: string)
	{
		this.navController.navigateRoot([routePath]);
		this.menuController.enable(false, 'principalMenu');
	}
}