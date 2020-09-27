import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ServicesService } from '../../services/services.service';
import { ClientClaim } from '../../shared/clientClaim';
import { ClientService } from '../../shared/clientService';
import { ClaimService } from '../../services/claim.service';
import { User } from '../../shared/user';
import { Client } from '../../shared/client';



@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  //Tablas
  clientClaim: ClientClaim[] = [];
  clientService: ClientService[] = [];
 
  //Reclamo
  type: string ='';
  description: string = '';
  textArea: string = '';
  idClient: string = '';
  idClaim: string = '';

  //Servicio
  idService: string = '';
  typeService: string = '';
  descriptionService: string = '';
  idDocument: string= '';

  user: User; //Usuario del localStorage

  constructor(
    private userService: UserService,
    private serviceService: ServicesService,
    private claimService: ClaimService,
  ) { 
  }

  ngOnInit(): void {
    //Capturando al empleado mediante su usaurio
    this.user = JSON.parse(localStorage.getItem('user'));



    //Rellenando las tablas
    this.userService.getClients()
      .subscribe(clients => {
        clients.forEach(client => {
          
          //Claims
          if(client.claim != null){
            client.claim.forEach(claim => {
              let cs: ClientClaim = new ClientClaim();
              cs.id = client._id;
              cs.name = client.name;
              cs.claimId = claim._id;
              cs.description = claim.description;
              cs.claimState = claim.state;
              cs.type = claim.type;
              cs.date = claim.date;
              cs.claimReply = claim.reply;
              this.clientClaim.push(cs);
            });
          }

          //Services
          if(client.service != null){
            client.service.forEach(service => {
              let cc: ClientService = new ClientService();
              cc.id = client._id; //ID del cliente que solicita el servicio
              cc.name = client.name;
              cc.documentId = service._id; //ID del documento "servicio"
              cc.serviceId = service.serviceId
              cc.serviceState = service.state
              cc.employeeName = service.employeeId
              cc.date = service.supportDate
              this.clientService.push(cc);
            });
          }

        })
    }, err => console.log(err));

  }


  addType(event: any, type: string, description: string, idClient: string, idClaim: string){
    //Rellenando el modal
    this.type = type;
    this.description = description;
    this.idClient = idClient;
    this.idClaim = idClaim;
  }  

  replyClaim(){
    let reply = {
      id: this.idClient,
      idclaim : this.idClaim,
      state: 'finalizado',
      reply: this.textArea
    }

    console.log(reply)

    this.claimService.replyClaim(reply)
      .subscribe(data => {
        console.log(data)
        window.location.reload(false);
      }, err => console.log(err));
  }

  addType2(event: any, serviceId: string, documentId: string, clientId: string){
    this.idService = serviceId;
    this.idDocument = documentId;
    this.idClient = clientId;
    console.log(serviceId)
    this.serviceService.getService(this.idService)
      .subscribe(service => {
        this.descriptionService = service.description;
        this.typeService = service.type;
      })
  }

  replyService(){
    let reply = {
      id: this.idClient,
      idservice: this.idDocument,
      state: 'finalizado',
      idemployee: this.user._id
    }

    console.log(reply)

    this.serviceService.replyService(reply)
      .subscribe(reply => {
        window.location.reload(false);
      },err => console.log(err));

  }

  

}



