import { Component, OnInit} from '@angular/core';
import {User} from './models/user';
import { UserServices } from './services/user.services';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/operator';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers:[UserServices]
})
export class AppComponent implements OnInit{
 public  title = 'MUSIFY Coomponet ';
 public  user:User;
 public  identity;
 public token;
 public errorMessage;
 public loginForm;
 public user_register:User;
 public alertregister;




constructor(
  private _userServices:UserServices
){
  this.user=new User('','','','','','ROLE_USE','');
  this.user_register=new User('','','','','','ROLE_USE','');
}

public onSubmit(){
  console.log(this.user);

  // Conseguir los datos del usuario identificado
  this._userServices.signup(this.user,'' ).subscribe(
    response => {
  
        let identity = response.user;
        this.identity = identity;
        //console.log(this.identity);
        if(!this.identity){
            alert("El usuario no está correctamente identificado");
        }else{
            // Crear elemento en el localstorage para tener al usuario sesión
            localStorage.setItem('identity', JSON.stringify(identity));
            
           
            // Conseguir el token para enviarselo a cada petición http
            this._userServices.signup(this.user, 'true').subscribe(
                response => {
                    let token = response.token;
                    this.token = token;

                    if(this.token.length <= 0){
                        alert("El token no se ha generado correctamente");
                    }else{
                        // Crear elemento en el localstorage para tener token disponible
                       
                       // this.user = new User('','','','','','ROLE_USER','');}
                      localStorage.setItem('token',token);
                       
                       //console.log(identity);
                    }
                },
                error => {
                  
                  var errorMessage = <any>error;

                  if(errorMessage != null){
                    this.errorMessage=error;

                    console.log(error);
                  }
                }
              );
        }  
    },
    error => {
      var errorMessage = <any>error;

      if(errorMessage != null){
        this.errorMessage=error;
      

        //var body = JSON.parse(error._body);
       //this.errorMessage = body.message;
       //let iden="true";

      //  console.log(errorMessage);
      }
    }
  );

}


ngOnInit(){
  this.identity = this._userServices.getIdentity();
  this.token = this._userServices.getToken();

  console.log(this.identity);
  console.log(this.token);
}


logout(){
  localStorage.removeItem('identity');
  localStorage.removeItem('token');
  localStorage.clear();
  this.identity=null;
  this.token=null;
}

onSubmitRegister(){
  console.log(this.user_register);

  this._userServices.user_register(this.user_register).subscribe(
    response=>{
      let user=response.user;
      this.user_register=user
      if(!user){
         this. alertregister='Error al incluir al usuario';
      }else{

        this. alertregister='Excelente '+this.user_register.name+' se registro correctamente.';

        this.user_register=new User('','','','','','ROLE_USE','');
      
      }



    },
    error => {
      var errorMessage = <any>error;

      if(errorMessage != null){
        this.alertregister=error;
      

        //var body = JSON.parse(error._body);
       //this.errorMessage = body.message;
       //let iden="true";

      //  console.log(errorMessage);
      }
    }


  );
}

}
