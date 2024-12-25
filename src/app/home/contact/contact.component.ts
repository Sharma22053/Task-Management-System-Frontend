import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";


@Component({
  selector: 'contact-root',
  templateUrl: './contact.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: []
})
export class ContactComponent {}