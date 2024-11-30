import {Component, ViewEncapsulation} from '@angular/core';
import {ButtonComponent} from "../dashboard/shared/button/button.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {

}
