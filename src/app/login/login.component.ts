import { Component, OnInit } from '@angular/core';
import { ApiAuthService} from '../services/apiauth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  public loginForm = this.fb.group(
    {
      user: ['',Validators.required],
      password: ['',Validators.required]

    }
  );
  /*
  public loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  */

  constructor(public _apiAuthService:ApiAuthService, private router: Router, private fb: FormBuilder) {
    
  /*  const usuario= this._apiAuthService.usuarioData;

    if (usuario){
      this.router.navigate([' /']);
    }*/

   }
 
  ngOnInit() {
  }

  login(){
    this._apiAuthService.login(this.loginForm.value).subscribe(res => {
      if (res.isValid){
        this.router.navigate(['/']);
      }
    })
  }

}
