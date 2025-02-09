import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from './api.service';
import { UserDetails } from './user-details';
import {ToastrService} from 'ngx-toastr'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ToastrModule } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule,FormsModule,ToastrModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 isLoggedIn = false;

  constructor(private api: ApiService,private ToastrService:ToastrService,private router: Router) { }
  login_values = {
    email: '',
    password: ''
  };
  ngOnInit() {
    
  }
  

  title = 'ClinetSide';
  user = {
    email: '',
    password: ''
  };

  onSubmit() {
    console.log('Email:', this.user.email);
    console.log('Password:', this.user.password);

    // Call API service to send POST request to backend
    this.api.login(this.user).subscribe(
      response => {
        console.log(response.message);
        if(response.message == "User not found"){
          this.ToastrService.error("User not found");
        }
        else if(response.message == "Incorrect password"){
          this.ToastrService.error("Invalid password");
        }
        else{
          
        this.ToastrService.success(response.message);
        this.isLoggedIn = true;  // Set to true when login is successful
          // Redirect to the home component
          this.router.navigate(['/home']);
        // Handle successful login (e.g., save token, redirect, etc.)
         // Redirect to another page after login
      }
    },
      error => {
      this.ToastrService.error(error.message);
        // Handle error (e.g., show error message)
      }
    );
  }
  goToRegister(): void {
    // Navigate to the register page
    this.isLoggedIn = true;
    this.router.navigate(['/register']);
  }
}
