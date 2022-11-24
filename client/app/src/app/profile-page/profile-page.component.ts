import { IUser } from '../interfaces/User';
import { Component, OnInit , HostListener} from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { IListing } from '../interfaces/Listing';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  user: IUser | null = null;
  displayWelcome: boolean = false;
  filteredListings: IListing[] | null = null;
  innerWidth: any;
  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {

    this.innerWidth = window.innerWidth;
    if(this.innerWidth <= 1195) {
      this.displayWelcome= true;
    }
    
    this.profileService.loadProfile().subscribe({
      next: (user) => {
        this.user = user;
        this.filteredListings = user.listings;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event : any) {
    if(event.target.innerWidth <= 1195) {
      this.displayWelcome = true;
    } else {
      this.displayWelcome = false;
    }
    this.innerWidth = window.innerWidth;
  }

  handleFormSubmit(value: { searchInput: string; sortType: string }) {
    this.filteredListings =
      this.user!.listings
        ?.filter(
          (x) =>
            x.item.toLowerCase().includes(value.searchInput.toLowerCase()) ||
            x.brand.toLowerCase().includes(value.searchInput.toLowerCase())
        )
        .sort((a, b): any => {
          if (value.sortType === 'priceAscending') {
            return a.price - b.price;
          } else if (value.sortType === 'priceDescending') {
            return b.price - a.price;
          } else if (value.sortType === 'a-z') {
            return a.item.localeCompare(b.item);
          } else if (value.sortType === 'z-a') {
            return b.item.localeCompare(a.item);
          }
          return;
        }) || null;
  }

}
