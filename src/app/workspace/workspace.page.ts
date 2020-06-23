import { Component, OnInit } from '@angular/core';
import { FriendService } from '../services/friend.service';

@Component({
  selector: 'app-workspace',
  templateUrl: 'workspace.page.html',
  styleUrls: ['workspace.page.scss']
})
export class WorkspacePage implements OnInit {


  constructor(
    public friendService: FriendService) { }

  ngOnInit() {
    // this.friendService.loadAll();
  }

  ionViewWillEnter() {
    // Used ionViewWillEnter as ngOnInit is not 
    // called due to view persistence in Ionic
    this.friendService.loadAll();
  }

  doRefresh(event) {
    console.log('Begin async operation');
    //Get saved list of friends
    this.friendService.loadAllThen(event);

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  delete(item) {
    //Delete item in Friend data
    this.friendService.deleteItem(item.id).subscribe(Response => {
      //Update list after delete is successful
      this.friendService.loadAll();
    });
  }

}
