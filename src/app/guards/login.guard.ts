import { CanActivate} from '@angular/router';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
 })

 export class LoginGuard implements CanActivate{
  constructor(private storage: Storage, private navCrtl: NavController ){}
  async canActivate() {
    const isUserLoggedIn = await this.storage.get('isUserLoggedIn');
    if(isUserLoggedIn){
      return true;
    }else{
      this.navCrtl.navigateRoot('/login');
      return false;
    }
      
  }
 }
