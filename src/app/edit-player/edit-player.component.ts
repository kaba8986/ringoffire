import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {
  profilePic: string;
  allProfilePictures = ['1', '2', '3', '4', '5', '6', '7', '8'];

  constructor(public dialogRef: MatDialogRef<EditPlayerComponent>) { }


  ngOnInit(): void {
  }

}
