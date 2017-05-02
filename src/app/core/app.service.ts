import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { AuthService } from './auth.service';

@Injectable()
export class AppService {

  constructor(private http: Http, private auth: AuthService) {
  }

  // hello(name: string) {
  //   const action = 'hello';
  //   const payload = {
  //     'name': name
  //   };
  //   return this.dispatch(action, payload);
  // }

  private dispatch(action: string, payload?: any): Promise<any> {
    return this.auth.token()
      .then((token: string) => {
        const headers = new Headers({
          'Content-Type': 'application/json',
          'Authorization': token
        });
        const options = new RequestOptions({ headers: headers });
        const url = `${environment.aws.gatewayUrl}/${action}`;
        return this.http.post(url, payload || {}, options)
          .map(this.extractData)
          .catch(this.handleError)
          .toPromise();
      });
  }

  private extractData(res: Response) {
    const body = res.json();
    return body.data || {};
  }

  private handleError(error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
