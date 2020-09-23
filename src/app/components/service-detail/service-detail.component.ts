import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router'; //access to the routers parameters
import { ServicesService } from '../../services/services.service';
import { UserService } from '../../services/user.service';
import { Service }  from '../../shared/services';
import { User } from 'src/app/shared/user';
import { Client } from 'src/app/shared/client';
import { Router } from '@angular/router';


@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit {

  service: Service;
  user: User;
  client: Client;
  order: any;

  constructor(
    private servicesService: ServicesService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.servicesService.getService(id)
      .subscribe(service => {
        this.service = service;
        // console.log(this.service)
      }, err => console.log(err));

    this.solicitarServicio();
    
  }

  async solicitarServicio(){
    this.user = await JSON.parse(localStorage.getItem('user'));

    this.userService.getClientByUser(this.user._id)
      .subscribe(client => {
        this.client = client[0];
        // console.log(this.client);
      }, err => console.log(err));
  }

  regresar(): void {
    this.router.navigate(['/lista']);
  }

  confirmarPedido(): void{
    this.order = {
      serviceId: this.service._id,
      state: "pendiente",
      clientId: this.client._id
    };
    console.log(this.order);
    this.servicesService.addService(this.order).subscribe(data => {
        if(data.errors){
          console.log('Errores transaccionales');
        }else{
          // console.log(data)
          this.router.navigate(['/lista']);
        }
      }, err => console.log(err));
  }

}
