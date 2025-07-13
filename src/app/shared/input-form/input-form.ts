import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-form',
  standalone: false,
  templateUrl: './input-form.html',
  styleUrls: ['./input-form.less'],
})
export class InputForm {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() value: string = '';
  @Input() control: any = null;

  isPasswordVisible: boolean = false;

  get currentType(): string {
    return this.type === 'password' && this.isPasswordVisible
      ? 'text'
      : this.type;
  }

  togglePassword(): void {
    if (this.type === 'password') {
      this.isPasswordVisible = !this.isPasswordVisible;
    }
  }
}
