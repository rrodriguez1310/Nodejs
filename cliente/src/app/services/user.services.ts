import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/operator';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import {GLOBAL } from './global';


@Injectable()
export class UserServices{
    public url: string;
    public identity;
    public token;

constructor(private _http: HttpClient){
        this.url=GLOBAL.url;
}

signup(user_to_login, gethash = null):Observable<any>{
    if(gethash != null){
        user_to_login.gethash = gethash;
    }
    let json = JSON.stringify(user_to_login);
    let params = json;

    let headers = new HttpHeaders({'Content-Type':'application/json'});
    //return {headers: headers};
    return this._http.post(this.url+'login', params, {headers: headers});
                
}
    getIdentity(){
        let identity = localStorage.getItem('identity');

        if(identity != undefined){
            this.identity = identity;
        }else{
            this.identity = null;
        }
 
        return this.identity;
    }

    getToken(){
        let token = localStorage.getItem('token');

        if(token != undefined){
            this.token = token;
        }else{
            this.token = null;
        }

        return this.token;
    }
user_register(user_to_register):Observable<any>{

    let params = JSON.stringify(user_to_register);
  

    let headers = new HttpHeaders({'Content-Type':'application/json'});
    //return {headers: headers};
    return this._http.post(this.url+'register', params, {headers: headers});


}

} 