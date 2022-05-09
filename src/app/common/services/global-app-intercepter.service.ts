import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Injectable()
export class GlobalAppIntercepter implements HttpInterceptor {
    constructor(private authService: AuthService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authToken;
        const commonHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
        };
        if (req.url.indexOf('login') !== -1) {
            const clonedReq = req.clone({
                url:  req.url,
                setHeaders: commonHeaders
            });
            return next.handle(clonedReq);
        } else if (req.url.indexOf('token/refresh') !== -1) {
            const refreshToken = localStorage.getItem('refresh_token');
            const clonedReq = req.clone({
                url:  req.url,
                setHeaders: {
                    Authorization: `Bearer ${refreshToken}`,
                    ...commonHeaders
                }
            });
            return next.handle(clonedReq);
        } else {
            return this.authService.getAccessToken().asObservable().pipe(
                switchMap(token => {
                    authToken = token;
                    const refreshToken = localStorage.getItem('refresh_token');
                    const clonedReq = req.clone({
                        url:  req.url,
                        setHeaders: {
                            Authorization: req.url.indexOf('token/refresh') === -1 ? `Bearer ${authToken}` : `Bearer ${refreshToken}`,
                            ...commonHeaders
                        }
                    });
                    return next.handle(clonedReq);
                })
            )
        }
    }    
}