import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'playersCheck'})


export class PlayersPipe implements PipeTransform {
  transform( newPlayer: Object, players: Object[]): string {
    for(let i = 0; i < players.length; i++) {
      if(players[i]["name"] === newPlayer["name"] && i!= newPlayer["index"] - 1) {
        return newPlayer["name"] + Math.round(Math.random() * 100);
      }
    }
    return newPlayer["name"];
  }
}
