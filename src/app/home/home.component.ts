import { Component } from "@angular/core";
import { RouterLink, RouterOutlet } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css', 
  standalone: true, 
  imports: [RouterOutlet],
  providers: []
})
export class HomeComponent {
    
}
