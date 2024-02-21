import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-logo-container',
  templateUrl: './logo-container.component.html',
  styleUrl: './logo-container.component.css'
})
export class LogoContainerComponent {

  @Input() imageUrl: string = '';
  @Input() altText: string = '';
}
