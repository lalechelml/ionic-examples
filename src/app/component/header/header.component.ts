import { Component, Input, OnInit } from '@angular/core';
import { GenericHelperService } from 'src/app/helper/generic-helper.service';

@Component(
{
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit
{
	attrTitle: string;

	@Input()
	set title(param: string)
	{
		this.attrTitle=param;
	}

	constructor(
		public ghs: GenericHelperService
	){}

	ngOnInit(){}
}