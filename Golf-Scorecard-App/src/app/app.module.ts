import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule, MatProgressSpinnerModule,
  MatSelectModule, MatTableModule,
  MatToolbarModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormComponent } from './form/form.component';
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { PlayersPipe } from "./players/players.pipe";
import { GameComponent } from './game/game.component';
import { AngularFireModule } from "@angular/fire";
import { environment } from "../environments/environment";
import { AngularFireDatabaseModule } from "@angular/fire/database";


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    PlayersPipe,
    GameComponent
    ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireModule,
    AngularFireDatabaseModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    HttpClientModule,
    MatButtonModule,
    MatTableModule,
    FormsModule,
    MatProgressSpinnerModule,
    RouterModule.forRoot(
      [
        { path: '', component: FormComponent },
        { path: 'game', component: GameComponent }
      ]
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
