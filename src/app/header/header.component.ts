import { Component, Output } from "@angular/core";
import { EventEmitter } from "@angular/core";

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'] 
})
export class HeaderComponent {
	collapsed: Boolean = false;
	@Output() modeChanged = new EventEmitter<string>();

	switchMode (mode: string) {
		this.modeChanged.emit(mode);
	}
}