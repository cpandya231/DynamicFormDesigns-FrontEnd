import { HttpHeaders } from "@angular/common/http";

export class ServiceUtil {
    public static ENV = 'localhost';
    public static API_ENDPOINT = `http://${ServiceUtil.ENV}:8080`;
    public static HTTPOPTIONS = {
        headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
        })
    };
}