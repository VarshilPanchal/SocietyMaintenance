import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PATH_CONSTANTS } from 'src/app/core/constants/PathConstants';
import { LocalStorageService } from 'src/app/core/services/localstorage-service/localstorage.service';
// import { ConfirmDialogueService } from 'src/app/shared/services/confirm-dialogue.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  navbarOpen = false;
  loggedInUser: any = null;
  roleName: any;
  usernameLabel: string;
  url;

  loginLink;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.url = this.router.url;

    if (this.url === '/auth/login') {
      this.loginLink = false;
    }
    // else if (this.url.indexOf(('/signup/'.split('/')[1])) > -1) {
    //   this.loginLink = true;
    //   this.signupLink = false;
    // }

    this.loggedInUser = this.localStorageService.getLoginUserObject();
    if (this.loggedInUser.id === 'Admin') {
      this.roleName = 'ADMIN';
    } else {
      this.roleName = 'USER';
    }
    this.usernameLabel = this.loggedInUser.user_name;
  }

  setNavbarOpen(): any {
    this.navbarOpen = !this.navbarOpen;
  }

  onDashboardClick(): any {
    if (this.roleName == 'ADMIN') {
      this.router.navigate([PATH_CONSTANTS.ADMIN_DASHBOARD]);
    } else {
      this.router.navigate([PATH_CONSTANTS.USER_DASHBOARD]);

    }
  }

  onReceiveMaintainenceClick(): any {
    this.router.navigate([PATH_CONSTANTS.RECEIVE_MAINATAINENCE])
  }

  onChangePasswordClick(): any {
    this.router.navigate([PATH_CONSTANTS.CHANGE_PASSWORD])
  }

  onExpenseAndIncomeCLick(): any {
    if (this.roleName == 'ADMIN') {
      this.router.navigate([PATH_CONSTANTS.EXPENSE_AND_INCOME])
    } else {
      this.router.navigate([PATH_CONSTANTS.USER_EXPENSE_AND_INCOME]);

    }
  }

  onAboutUsClick(): any {
    this.router.navigate([PATH_CONSTANTS.ABOUT_US])
  }

  onLogoutClick(): any {

    // let options = null;
    // options = {
    //   title: "Warning",
    //   message: "Are you sure you want to logout?",
    //   cancelText: "No",
    //   confirmText: "Yes"

    // };
    // this.confirmDialogService.open(options);
    // this.confirmDialogService.confirmed().subscribe(confirmed => {
    //   if (confirmed) {
    //     this.logout();
    //   }
    // });
    this.logout();
  }

  logout(): any {
    this.localStorageService.logout();
    this.router.navigate([PATH_CONSTANTS.LOGIN]);
  }

  onPaymentSummaryClick(): any {
    this.router.navigate([PATH_CONSTANTS.PAY_SUMMARY])
  }

  toggleNavbar(collapseID) {
    document.getElementById(collapseID).classList.toggle("hidden");
    document.getElementById(collapseID).classList.toggle("flex");
  }

}
