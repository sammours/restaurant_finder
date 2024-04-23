import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';

import { Restaurant } from '../models/restaurant.model';
import { RestaurantService } from '../services/restaurant.service';
import { FavouriteService } from '../services/favourite.service';
import { Favourite } from '../models/favourite.model';
import { SettingsService } from '../services/settings.service';
import { Setting } from '../models/settings.model';

@Component({
  selector: 'app-finder',
  templateUrl: './finder.page.html',
  styleUrls: ['./finder.page.scss'],
})
export class FinderPage implements OnInit {
  public restaurants: Restaurant[];
  public favs: Favourite[];
  public loading: boolean;
  public settings: Setting[];

  constructor(private servivce: RestaurantService, private favService: FavouriteService,
              private ref: ChangeDetectorRef, private settingsService: SettingsService) {
    this.loading = false;
    this.restaurants = new Array<Restaurant>();
    this.favs = new Array<Favourite>();
    this.settings = new Array<Setting>();
  }

  ngOnInit() {
    this.getSettings();
    this.getFavourites();
  }

  ionViewWillEnter() {
    this.getSettings();
    this.getFavourites();
  }

  /**
   * Get all restaurants
   */
  private getAllRestaurants() {
    this.loading = true;
    this.servivce.getAll().subscribe((res: Restaurant[]) => {
      this.restaurants = res;
      this.sortRestaurant();
      this.loading = false;
    });
  }

  /**
   * Get all favourites
   */
  public getFavourites() {
    this.favService.getAll().subscribe((fav: Favourite[]) => {
      this.favs = fav;
      this.ref.markForCheck();
    });
  }

  /**
   * Get all settings and the restaurants when finished
   */
  public getSettings() {
    this.settingsService.getAll().subscribe((settings: Setting[]) => {
      this.settings = settings;
      this.getAllRestaurants();
    });
  }

  /**
   * Sort restaurant according to sort type
   */
  private sortRestaurant() {
    if (this.restaurants && this.restaurants.length > 0 && this.settings && this.settings.length > 0) {
      if (this.settings[1].value === '1') {
        this.restaurants.sort(function(a, b) { return b.rating - a.rating; });
      } else if (this.settings[1].value === '2') {
        this.restaurants.sort(function(a, b) { return a.distance - b.distance; });
      }
    }
  }
}
