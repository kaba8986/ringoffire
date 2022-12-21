import { Component } from '@angular/core';
import { Game } from 'src/models/game';
import { OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { EditPlayerComponent } from '../edit-player/edit-player.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game;
  items: Observable<any[]>;
  gameId: string;
  

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.newGame();
    //ID des aktuellen Spiels abrufen
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];
      console.log(params['id']);
    //Changes in der Collection abonnieren
    this.firestore.collection('games').doc(this.gameId).valueChanges().subscribe((game: any) => {
      console.log(game);
      //Game-Objekt mit Werten aus JSON im firestore belegen
      this.game.currentPlayer = game.currentPlayer;
      this.game.playedCards = game.playedCards;
      this.game.players = game.players;
      this.game.playerImages = game.playerImages;
      this.game.stack = game.stack;
      this.game.pickCardAnimation = game.pickCardAnimation;
      this.game.currentCard = game.currentCard;
      console.log(game.players);
      console.log(game.playerImages);
    });
    })
  }

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if(!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame();
      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardAnimation = false;
        this.saveGame();
      }, 1000);
    }
  }

  editPlayer(playerId: number) {
    const dialogRef = this.dialog.open(EditPlayerComponent);

    dialogRef.afterClosed().subscribe((change: string) => {
      console.log('dialog closed with change ', change)
      this.game.playerImages[playerId] = change;
      this.saveGame();
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if(name && name.length > 0) {
        this.game.players.push(name);
        this.game.playerImages.push('1');
        this.saveGame();
      }
    });
  }

  saveGame() {
    this.firestore.collection('games').doc(this.gameId).update(this.game.toJson());
  }
}
