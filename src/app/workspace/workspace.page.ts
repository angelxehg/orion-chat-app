import { Component, OnInit } from '@angular/core';
import { FriendService } from '../services/friend.service';

@Component({
  selector: 'app-workspace',
  templateUrl: 'workspace.page.html',
  styleUrls: ['workspace.page.scss']
})
export class WorkspacePage implements OnInit {

  friendsData: any;

  constructor(
    public friendService: FriendService
  ) {
    this.friendsData = [];
  }

  ngOnInit() {
    // this.getAllFriends();
  }

  ionViewWillEnter() {
    // Used ionViewWillEnter as ngOnInit is not 
    // called due to view persistence in Ionic
    this.getAllFriends();
  }

  getAllFriends() {
    //Get saved list of friends
    this.friendService.getList().subscribe(response => {
      console.log(response);
      this.friendsData = response;
    })
  }


  delete(item) {
    //Delete item in Friend data
    this.friendService.deleteItem(item.id).subscribe(Response => {
      //Update list after delete is successful
      this.getAllFriends();
    });
  }

}
