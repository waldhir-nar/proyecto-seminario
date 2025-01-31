import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: false,
})
export class MenuPage implements OnInit {

  constructor(
    private menu: MenuController,
    private navCtrl: NavController,
    private storage: Storage
  ) { }

  ngOnInit() {
  }
  closeMenu(){
    this.menu.close();
  }
  log_out(){
    this.storage.remove("isUserLoggedIn");
    this.navCtrl.navigateRoot("/login");
  }
  goToAccount() {
    this.navCtrl.navigateForward('/menu/account');
  }
  goToHome() {
    this.navCtrl.navigateRoot('/menu/home');
  }
  goToSearchUser() {
    this.navCtrl.navigateRoot('/menu/search-users');
  }
}
