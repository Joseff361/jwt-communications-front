import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router'; //access to the routers parameters
import { ServicesService } from '../../services/services.service';
import { Service }  from '../../shared/services';


@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent implements OnInit {

  service: Service;

  constructor(
    private servicesService: ServicesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.servicesService.getService(id)
      .subscribe(service => {
        this.service = service
      }, err => console.log(err));
  }

}
