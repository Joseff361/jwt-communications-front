import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ClaimService } from '../../services/claim.service';
import { ServicesService } from '../../services/services.service';
import { SwalService } from '../../services/swal.service';
import { Client } from '../../shared/client';
import { User } from '../../shared/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  client: Client; //Cliente encontrado
  user: User; //Encontrar a cliente por user
  services: any[] = []; //Para agregar los campos de estado y fecha
  claim: any;
  
  //Campos de reclamo
  textArea: string = '';
  type: string = '';

  constructor(
    private userService: UserService,
    private claimService: ClaimService,
    private servicesService: ServicesService,
    private swal: SwalService
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userService.getClientByUser(this.user._id)
      .subscribe(client => {
        this.client = client[0];
        this.listServices(this.client.service);
      }, err => console.log(err));
  }

  listServices(services: any[]): void{
    let i: number = 0;
    services.forEach(sv =>{
      this.servicesService.getService(sv.serviceId)
        .subscribe(service => {
          this.services[i] = service;
          //Se agregan dos campos nuevos 
          this.services[i].registrationDate = sv.registrationDate;
          this.services[i].state = sv.state;
          this.services[i]._id = sv._id;
          i++;
        })
    })
    console.log(this.services)
  }

  deleteService(event: any, idService: string){
    console.log(idService);
    let svd = {
      id: this.client._id,     
      idservice: idService
    }
    this.servicesService.deleteService(svd)
      .subscribe(data => {
        this.swal.warning('Transaction completed successfully', 'Service removed')
        setTimeout(() => {
          window.location.reload(false);
        }, 1500);
      }, err => console.log(err));
  }
  
  deleteClaim(event, idClaim: string){
    let cld = {
      id: this.client._id,     
      idclaim: idClaim
    }
    console.log(cld);
    this.claimService.removeClaim(cld)
      .subscribe(data => {
        this.swal.warning('Transaction completed successfully', 'Claim removed')
        setTimeout(() => {
          window.location.reload(false);
        }, 1500);
      }, err => console.log(err));
  }


  addType(event: any,  type: string){
    this.type = type; //Para mostrar el tipo en el modal
  }

  addClaim(){    
    let addc = {
      id: this.client._id,
      type: this.type,
      description: this.textArea
    }
    console.log(addc)
    this.claimService.addClaim(addc)
      .subscribe(data =>{
        this.swal.success('Claim completed successfully')
        setTimeout(() => {
          window.location.reload(false);
        }, 1500);
      }, err => console.log(err));
  }



}
