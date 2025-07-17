import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-action',
  standalone: false,
  templateUrl: './button-action.html',
  styleUrl: './button-action.less'
})
export class ButtonAction {
  @Input() label!: string;
  @Input() type!: 'button' | 'submit' | 'reset';
  @Input() disabled: boolean = false;
  @Input() class: string = '';

  @Output() action = new EventEmitter<void>();
}