import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { DataService } from 'src/app/core/services/data.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  sicil: any = '';
  password: any = '';
  error: any;
  res: any;

  isLoading: boolean = false;

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private router: Router,
    ) { }

  ngOnInit(): void {

  }

  removeDevice() {

    if (this.sicil === undefined || this.sicil === '') {
      Swal.fire({
        title: "Hata",
        text: "Lütfen sicil numarası giriniz.",
        confirmButtonText: "Tamam",
        confirmButtonColor: "#f44336",
      });
    }
    else {
      Swal.fire({
        title: "Emin Misin?",
        text: this.sicil + " numaralı sicil ile eşleştirilmiş cihazı kaldırmak istediğinize emin misiniz?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#f44336",
        cancelButtonColor: "#e5e5e5",
        confirmButtonText: "Kaldır",
        cancelButtonText: "İptal",
      }).then((result) => {
        if (result.isConfirmed) {
          this.isLoading = true;
          // this.dataService.removeDevice({ id: this.sicil }).subscribe((res) => {
          //   this.isLoading = false;
          //   if (res.status == 'OK') {
          //     this.isLoading = false;
          //     Swal.fire({
          //       title: "Başarılı",
          //       text: "Cihaz kaldır işlemi başarılı",
          //       confirmButtonColor: "#f44336",
          //       confirmButtonText: "Tamam",
          //     });

          //   }
          //   else {

          //   }
          // }, (err) => {
          //   this.isLoading = false;
          //   Swal.fire({
          //     title: "Hata",
          //     text: err.error.message,
          //     confirmButtonColor: "#f44336",
          //     confirmButtonText: "Tamam",
          //   });
          // })

        }
      });
    }
  }

  logOut() {
    this.isLoading = true;
    this.authService.logout();
    this.isLoading = true;
  }

}
