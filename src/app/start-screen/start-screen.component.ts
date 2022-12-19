import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent {

  constructor(private firestore: AngularFirestore, private router: Router) {}

  newGame() {
    //Start Game
    let game = new Game();
    //JSON zu Collection hinzufügen
    this.firestore.collection('games').add(game.toJson()).then((gameInfo: any) => {
      console.log(gameInfo);
      this.router.navigateByUrl('/game/' +  gameInfo.id);
    });

  }
}
