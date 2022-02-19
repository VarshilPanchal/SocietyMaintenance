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
  loggedInUser: any;
  roleName: any;

  constructor(private router: Router,
    private localStorageService: LocalStorageService) { }

  ngOnInit(): void { 
    this.loggedInUser = this.localStorageService.getLoginUserName();
    if(this.loggedInUser == 'Admin'){
      this.roleName = 'ADMIN';
    }else{
      this.roleName = 'USER';
    }
  }

  setNavbarOpen() {
    this.navbarOpen = !this.navbarOpen;
  }
  onDashboardClick() {
    if(this.roleName == 'ADMIN'){
      this.router.navigate([PATH_CONSTANTS.ADMIN_DASHBOARD]);
    }else{
      this.router.navigate([PATH_CONSTANTS.USER_DASHBOARD]);
     
    }
  }
  onReceiveMaintainenceClick() {
    this.router.navigate([PATH_CONSTANTS.RECEIVE_MAINATAINENCE])
  }
  onChangePasswordClick() {
    this.router.navigate([PATH_CONSTANTS.CHANGE_PASSWORD])
  }
  onExpenseAndIncomeCLick() {
    if(this.roleName == 'ADMIN'){
      this.router.navigate([PATH_CONSTANTS.EXPENSE_AND_INCOME])
    }else{
      this.router.navigate([PATH_CONSTANTS.USER_EXPENSE_AND_INCOME]);
     
    }
  }
  onAboutUsClick() {
    this.router.navigate([PATH_CONSTANTS.ABOUT_US])
  }
  onLogoutClick() {
   
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
  logout() {
    this.localStorageService.logout();
    this.router.navigate([PATH_CONSTANTS.LOGIN])
  }
  onPaymentSummaryClick() {
    this.router.navigate([PATH_CONSTANTS.PAY_SUMMARY])
  }

}
