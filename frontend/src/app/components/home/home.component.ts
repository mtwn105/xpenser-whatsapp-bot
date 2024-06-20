import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('textAnimation', [
      state('start', style({
        transform: 'scale(0.5)',
        opacity: 0
      })),
      state('end', style({
        transform: 'scale(1)',
        opacity: 1
      })),
      transition('start => end', [
        animate('1s ease-in-out')
      ])
    ])
  ]
})
export class HomeComponent {

  animationState = 'start';

  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.animationState = 'end';
    }, 1000);
  }

  signUp() {
    this.router.navigate(['/signup']);
  }

}
