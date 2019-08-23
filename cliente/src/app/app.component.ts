import { Component, OnInit} from '@angular/core';
import {User} from './models/user';
import { UserServices } from './services/user.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //styleUrls: ['./app.component.css']
  providers:[UserServices]
})
export class AppComponent implements OnInit{
 public  title = 'MUSIFY';
 public  user:User;
 public  identity;
 public  token;


constructor(
  private _userServices:UserServices
){
  this.user=new User('','','','','','ROLE_USE','');
}

public onSubmit(){
console.log(this.user);
}

ngOnInit(){
   this._userServices.signup();
}

}
