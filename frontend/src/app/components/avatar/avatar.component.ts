import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss'
})
export class AvatarComponent {

  url = "https://ui-avatars.com/api/?name=";

  @Input("name")
  name: string = "";

  ngOnInit() {
    this.url += this.name;
  }

}
