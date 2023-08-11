import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  //success alert
  success = (message: string) => {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: message,
      toast: true,
      timer: 3000,
      showConfirmButton: false,
    })
  }

  //error alert
  error = (message: string) => {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: message,
      toast: true,
      timer: 3000,
      showConfirmButton: false,
    })
  }
}
