import { Directive, ElementRef, OnInit, Renderer2, HostListener, HostBinding } from "@angular/core";

@Directive({
	selector: '[app-dropdown]'
})
export class DropdownDirective implements OnInit {
	constructor(
		private elementRef: ElementRef,
		private renderer: Renderer2
	) {}

	@HostBinding('class') className: String = '';

	@HostListener('click') click() {
		// this.renderer.addClass(this.elementRef.nativeElement, 'open');
		this.className = this.className ? '' : 'open';
	}

	ngOnInit () {

	}
}
