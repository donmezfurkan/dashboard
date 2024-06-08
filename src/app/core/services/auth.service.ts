import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data.service';
import { LoginResult } from '../model/LoginResult';
import { map } from 'rxjs';
import { CurrentUser } from '../model/currentUser';



@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public userLoggedIn: boolean = false;
    public currentUser: CurrentUser;
    private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || ('false'));

    constructor(
        private router: Router,
        private dataService: DataService,
    ) {
        this.userLoggedIn = true
    }
    isUserLoggedIn() {
        const token = localStorage.getItem('token');
        if (token) {
            this.userLoggedIn = true;
        } else {
            this.userLoggedIn = false;
        }
        return this.userLoggedIn;
    }
    authLogin(params: any) {
        return this.dataService.userLogin(params).pipe(
            map((result: any) => {
                const loginResult: LoginResult = {
                    isLoggedIn: true,
                    status: 0,
                };
                if (result.status === 200) {
                    this.userLoggedIn = true;
                    loginResult.status = result.status;
                    localStorage.setItem('token', result.token)
                } else {
                    loginResult.isLoggedIn = false;
                    loginResult.status = result.status;
                }
                return loginResult;
            })
        )
    }

    logout() {
        this.userLoggedIn = false;
        localStorage.removeItem('token');
        localStorage.removeItem("kullanıcı adı")
        this.router.navigate(['/login']);
    }
}
