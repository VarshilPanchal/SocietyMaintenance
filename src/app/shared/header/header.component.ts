import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PATH_CONSTANTS } from 'src/app/core/constants/PathConstants';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  navbarOpen = false;

  constructor(private router: Router) { }

  ngOnInit(): void { }

  setNavbarOpen() {
    this.navbarOpen = !this.navbarOpen;
  }
  onDashboardClick() {
    this.router.navigate([PATH_CONSTANTS.ADMIN_DASHBOARD])
  }
  onReceiveMaintainenceClick() {
    this.router.navigate([PATH_CONSTANTS.RECEIVE_MAINATAINENCE])
  }
  onChangePasswordClick() {
    this.router.navigate([PATH_CONSTANTS.CHANGE_PASSWORD])
  }
  onExpenseAndIncomeCLick() {
    this.router.navigate([PATH_CONSTANTS.EXPENSE_AND_INCOME])
  }
  onAboutUsClick() {
    this.router.navigate([PATH_CONSTANTS.ABOUT_US])
  }
  onLogoutClick() {
    console.log("logout")
  }

}
