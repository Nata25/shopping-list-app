import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'restaurant';
  mode: string = 'recipes';

  modeChanged(mode: string) {
    this.mode = mode;
  }
}
