import { Component, OnInit } from '@angular/core';
import { Friend } from '../models/friend';
import { FriendService } from '../services/friend.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-friend-update',
  templateUrl: './friend-update.page.html',
  styleUrls: ['./friend-update.page.scss'],
})
export class FriendUpdatePage implements OnInit {

  id: number;
  data: Friend;

  constructor(
    public activatedRoute: ActivatedRoute,
    public friendService: FriendService,
    public router: Router
  ) {
    this.data = new Friend();
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params["id"];
    //get item details using id
    this.friendService.getItem(this.id).subscribe(response => {
      console.log(response);
      this.data = response;
    })
  }

  update() {
    //Update item by taking id and updated data object
    this.friendService.updateItem(this.id, this.data).subscribe(response => {
      this.friendService.loadAll();
      this.router.navigate(['/tabs/workspace']);
    });
  }

}
