import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { DataService } from 'src/app/core/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  sicil: any = '';
  password: any = '';
  error: any;
  res: any;

  isLoading: boolean = false;

  constructor(
    private dataService: DataService,
    private router: Router, 
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn()) {
      this.router.navigate(['/']);
    } else {

    }
  }

  login(){
    if (this.password === '' || this.password === undefined || this.sicil === '' || this.sicil === undefined) {
      // || this.captchaResponse === '' || this.captchaResponse === undefined
      this.error = 'Lütfen bilgilerinizi eksiksiz ve tam giriniz.';
      setTimeout(() => {
        this.error = ""
      }, 3000);
      return;
    }
    else{
      const params = {
        "userName": this.sicil,
        "password": this.password
      }
      this.isLoading = true;
      this.authService.authLogin(params).subscribe(res=> {
        this.res = res
        //this.res = JSON.parse(this.res._body)
        if (this.res.status == 200) {
          this.isLoading = false;
          if (res.isLoggedIn == true) {
            localStorage.setItem('kullanıcı adı', this.sicil);
            this.router.navigate(['/home']);
          }
        } else {
          this.error = this.res.userMessage;
          setTimeout(() => {
            this.error = ""
          }, 3000);
          return;
        }
      },err => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Hata!',
          text: err.error.error,
          confirmButtonText: 'Sayfaya Dön',
          backdrop: "rgba(0, 0, 0, 0.8)",
        })
      })
    }
  }

}
