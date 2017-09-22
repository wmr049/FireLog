import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Created with ♥ by <b><a href="https://exxatech.com" target="_blank">exxatech</a></b> 2017</span>
    <div class="socials">
      <a href="https://github.com/exxatech" target="_blank" class="ion ion-social-github"></a>
      <a href="https://www.facebook.com/exxatech" target="_blank" class="ion ion-social-facebook"></a>
      <a href="https://twitter.com/exxatech_inc" target="_blank" class="ion ion-social-twitter"></a>
      <a href="https://www.linkedin.com/company/exxatech" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
}
