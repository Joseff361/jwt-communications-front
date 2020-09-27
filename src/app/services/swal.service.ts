import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  success(msg: string): void{
    Swal.fire({
      title: 'Success!',
      text: msg,
      icon: 'success',
      confirmButtonText: 'Continue'
    })
  }

  error(msg: string): void{
    Swal.fire({
      title: 'Error!',
      text: msg,
      icon: 'error',
      confirmButtonText: 'Continue'
    })
  }

  info(msg: string, tittle:string): void{
    Swal.fire({
      title: tittle,
      text: msg,
      icon: 'info',
      confirmButtonText: 'Continue'
    })
  }

  warning(msg: string, tittle:string): void{
    Swal.fire({
      title: tittle,
      text: msg,
      icon: 'warning',
      confirmButtonText: 'Continue'
    })
  }

}
