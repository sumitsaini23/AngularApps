import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { error } from '@angular/compiler/src/util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
	returnUrl: string;
	error: {};
	loginError: string;
	constructor(private auth: AuthService, private router: Router) { }

	ngOnInit(): void {
	}

	login(formdata){
		let data = formdata.value;
		this.auth.login(data).subscribe((res) => {
		if (this.auth.isLoggedIn) {
			const redirect = this.auth.redirectUrl ? this.auth.redirectUrl : '/my/orders';
			this.router.navigate([redirect]);
		} else {
			this.loginError = 'Username or password is incorrect.';
		}
		},
		error => this.error = error);
	}


  
}
