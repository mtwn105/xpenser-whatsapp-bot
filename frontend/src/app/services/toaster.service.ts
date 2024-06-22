import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toastr: ToastrService) { }

  notify(message: string, type: string = 'is-success') {
    if (type == 'is-success') {
      this.toastr.success(message, '')
    } else if (type == 'is-warning') {
      this.toastr.warning(message, '')
    } else if (type == 'is-danger') {
      this.toastr.error(message, '')
    } else {
      this.toastr.info(message, '')
    }
  }

}
