import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/auth.service';
@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userLogin = false;
  userData;
  constructor(private titleService: Title, private router: Router, private auth: AuthService) {
  }

  ngOnInit(): void {
    if(localStorage.getItem('currentUser')){
      this.userData = JSON.parse(localStorage.getItem('currentUser'))[0];
    }
  }

  get isLoggedIn() { return this.auth.isLoggedIn(); }
  get isAdminLoggedIn() { return this.auth.isAdminLoggedIn(); }

  setPageTitle(title: string) {
    this.titleService.setTitle(title);
  }

  logout(){
    this.auth.logout();
    this.router.navigateByUrl('/');
  }
}
