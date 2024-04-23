import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { Setting } from '../models/settings.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  public settings: Setting[];
  constructor(private service: SettingsService, private alertController: AlertController) {
    this.settings = new Array<Setting>();
  }

  ngOnInit() {
    this.getSettings();
  }

  /**
   * Save the settings
   */
  public async save() {
    this.service.update(this.settings).subscribe(async (res: Setting[]) => {
      this.settings = res;

      const alert = await this.alertController.create({
        header: 'Sucess',
        message: 'Done..',
        buttons: ['OK'],
      });
      await alert.present();
    });
  }

  /**
   * Get all settings from server
   */
  private getSettings() {
    this.service.getAll().subscribe((res: Setting[]) => {
      this.settings = res;
    });
  }
}
