import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PATH_CONSTANTS } from 'src/app/core/constants/PathConstants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onAboutUsClick(): any {
    this.router.navigate([PATH_CONSTANTS.ABOUT_US]);
  }

}
