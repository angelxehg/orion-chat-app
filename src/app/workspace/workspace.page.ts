import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-workspace',
  templateUrl: 'workspace.page.html',
  styleUrls: ['workspace.page.scss']
})
export class WorkspacePage implements OnInit {

  friendsData: any;

  constructor(
    public apiService: ApiService
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
    this.apiService.getList().subscribe(response => {
      console.log(response);
      this.friendsData = response;
    })
  }


  delete(item) {
    //Delete item in Friend data
    this.apiService.deleteItem(item.id).subscribe(Response => {
      //Update list after delete is successful
      this.getAllFriends();
    });
  }

}
