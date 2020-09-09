import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { Service }  from '../../shared/services';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  Services: Service[];
  url:string = 'http://localhost:3000/';

  constructor(
    private servicesService: ServicesService
  ) { }

  ngOnInit(): void {
    this.servicesService.getServices()
      .subscribe(data => {
         this.Services = data;
      }, err => console.log(err))
  }

  

}
