import { Component, OnInit } from '@angular/core';
import { Friend } from '../models/friend';
import { FriendService } from '../services/friend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friend-create',
  templateUrl: './friend-create.page.html',
  styleUrls: ['./friend-create.page.scss'],
})
export class FriendCreatePage implements OnInit {

  data: Friend;

  constructor(
    public friendService: FriendService,
    public router: Router
  ) {
    this.data = new Friend();
  }

  ngOnInit() {
  }

  submitForm() {
    this.friendService.createItem(this.data).subscribe((response) => {
      this.router.navigate(['/tabs/workspace']);
    });

  }

}
