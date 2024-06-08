import { Injectable, Injector } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { tap } from "rxjs/operators";

import { of } from 'rxjs';
import { throwError } from 'rxjs';
import { CurrentUser } from '../model/currentUser';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    public token: string;
    public userLoggedIn = false;
    public currentUser: CurrentUser;
    browser: any;
    public loadingScreen = false;
    constructor(private inject: Injector, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let authService = this.inject.get(AuthService);
        const storageToken: any = localStorage.getItem('token');

        let token = '';
        if (storageToken) {
            token = storageToken;

        }

        if (req.url.includes('login')) {
            var normalReq = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
            // var normalReq1 = normalReq.clone({ headers: normalReq.headers.set('clientversion', '1') });
            // var normalReq2 = normalReq1.clone({ headers: normalReq1.headers.set('osversion', this.browser) });
            // var normalReq3 = normalReq2.clone({ headers: normalReq2.headers.set('Content-Type', 'application/json') });

            return next.handle(normalReq).pipe(
                tap(
                    (event: any) => {
                        
                        if (event instanceof HttpResponse) {
                            debugger
                            if (event.body.status === 200) {
                                const newToken = event.body.token;

                                if (newToken == undefined) {
                                    return;
                                } else {
                                    localStorage.setItem('token', JSON.stringify(newToken));

                                }
                            }
                        }
                    }
                )
            )

        } else {
            if (token) {
                const started = Date.now();
                const authReq = req.clone({ headers: req.headers.set('token',token) });
                var normalReq = authReq.clone({ headers: authReq.headers.set('Content-Type', 'application/json') });





                return next
                    .handle(normalReq)
                    .pipe(
                        tap(
                            (event: any) => {
                                if (event instanceof HttpResponse) {
                                    const elapsed = Date.now() - started;

                                }
                            },
                            (error: any) => this.handleAuthError
                        )
                    )
                // .catch(this.handleAuthError);


            } else {


                authService.logout();

                return next.handle(req)
                    .pipe(
                        tap(
                            (event: any) => {

                            },
                            (error: any) => this.handleAuthError
                        )
                    )
                // .catch(this.handleAuthError);
            }
        }


    }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {

        if (err.status === 401 || err.status === 403) {



            this.currentUser = null!;
            this.userLoggedIn = false;
            localStorage.removeItem("token")
            localStorage.removeItem("MS-currentUser")

            window.location.pathname = '/login'
            // navigate to login page
            //let authService = this.inject.get(AuthService);
            //authService.logout();
            return of(err.message);
            // return Observable.of(err.message);
            // return Observable.throw(err);


        }
        if (err.status === 400) {

            //return Observable.of(err.message);
            // swal(
            //     'Dikkat',
            //     'Hata Oluştu',
            //     'warning'
            // );
            setTimeout(() => {
                window.location.reload()
            }, 1000);
        }
        return throwError(err);
    }

}

