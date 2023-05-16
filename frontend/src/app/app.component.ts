
import { Component, OnInit, Renderer2 } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    // Enable mobile menu toggle
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
  
    this.renderer.listen(navbarToggler, 'click', () => {
      this.renderer.addClass(navbarCollapse, 'show');
    });
  }
}

