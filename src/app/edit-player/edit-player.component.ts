import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {
  profilePic: string;
  allProfilePictures = ['1', '2', '3', '4', '5', '6', '7', '8'];

  constructor() { }

  ngOnInit(): void {
  }

}
