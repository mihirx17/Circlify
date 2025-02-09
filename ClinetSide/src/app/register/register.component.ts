import { Component, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-register',
  imports: [

    FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  constructor(private api: ApiService,private router: Router) { }
  registerData = {
    username: '',
    email: '',
    password: '',
    birthdate: '',
    phone: '',
  };
  ngOnInit(): void {
    
  }
  onSubmit() {
  this.api.registerUser(this.registerData).subscribe(res=>{
    console.log(res);
    
    
  });
}
}
