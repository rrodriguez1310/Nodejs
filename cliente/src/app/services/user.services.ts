import {Injectable} from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import 'rxjs/operator';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import {GLOBAL } from './global';

@Injectable()
export class UserServices{
    public url: string;

constructor(private _http: HttpClientModule){
        this.url=GLOBAL.url;
}

signup(){
    return 'hola mundo desde el servicio  ';
}

};