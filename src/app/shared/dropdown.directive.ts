import { Directive, ElementRef, OnInit, HostListener, HostBinding } from "@angular/core";

@Directive({
	selector: '[app-dropdown]'
})
export class DropdownDirective implements OnInit {
	constructor(
		private elementRef: ElementRef
	) {}

	@HostBinding('class') className: String = '';

	@HostListener('document:click', ['$event']) click(event: Event) {
		const clickInside = this.elementRef.nativeElement.contains(event.target)
		this.className = !this.className && clickInside ? 'open' : ''
	}

	ngOnInit () {

	}
}
