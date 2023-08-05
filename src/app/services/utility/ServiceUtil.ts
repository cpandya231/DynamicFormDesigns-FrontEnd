import { HttpHeaders } from '@angular/common/http';

export class ServiceUtil {
  public static ENV = 'ec2-13-233-144-148.ap-south-1.compute.amazonaws.com';
  public static API_ENDPOINT = `http://${ServiceUtil.ENV}:8080`;
  public static HTTPOPTIONS = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };
}
