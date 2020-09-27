import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { SwalService } from '../../services/swal.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/user';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  servicesIsHidden: boolean = true;
  loginForm: FormGroup;
  login: User;
  usertoCheck: User;


  hiddenEmployee: boolean = true;
  hiddenClient: boolean = true;
  isLogged: boolean = false;


  @ViewChild('fform') loginFormDirective;
  @ViewChild('closebutton') closebutton;

  formErrors = {
    'username': '',
    'password': ''
  };

  validationMessages = {
    'username': {
      'required' : 'First Name is required.',
      'minlength': 'First Name must be at least 2 characters long.',
      'maxlength': 'FirstName cannot be more than 25 characters long.'
    },
    'password': {
      'required' : 'Last Name is required.',
      'minlength': 'Last Name must be at least 2 characters long.',
      'maxlength': 'Last Name cannot be more than 25 characters long.'
    },
  };

  constructor(
    private userService: UserService,
    private swal: SwalService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
   }

  ngOnInit(): void {

     if(localStorage.getItem('employee') == 'true') this.hiddenEmployee = false;
     if(localStorage.getItem('client') == 'true') this.hiddenClient = false;
     if(localStorage.getItem('logged') == 'true') this.isLogged = true;
  }

  createForm(){
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      password: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ]
    });

    this.loginForm.valueChanges //valueChanges is an observable
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set form validation messages 
  }

  onValueChanged(data?: any) { //parameter is optional
    if (!this.loginForm) { return; } //has been created?
    
    const form = this.loginForm;
    
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {//make sure that the object contain the property
        
        this.formErrors[field] = ''; // clear previous error message (if any)

        const control = form.get(field); //const form = this.feedbackForm;

        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) { // const control = form.get(field);
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  async onSubmit() {
    this.login = this.loginForm.value;
    console.log(this.login);

    this.usertoCheck = await this.userService.checkUser(this.login);

    console.log(this.usertoCheck)
    if(this.usertoCheck){

       this.closebutton.nativeElement.click();

      if(this.usertoCheck.employee == true){
        localStorage.setItem('employee', 'true')
        this.router.navigate(["/requests"]); 
      }else{
        localStorage.setItem('client', 'true')
        this.router.navigate(["/lista"]);  
      } 
      
      localStorage.setItem('logged', 'true')
      localStorage.setItem('user', JSON.stringify(this.usertoCheck));

      this.loginForm.reset({
        username: '',
        password: ''
      });
      this.swal.success('Logged correctly')
      this.loginFormDirective.resetForm(); //ensure a completely reset
      //#fform="ngForm"
      // window.location.reload()
      this.ngOnInit()
    }
    
  }


  logout(): void{
    localStorage.removeItem('logged');
    localStorage.removeItem('employee');
    localStorage.removeItem('client');
    this.hiddenEmployee = true;
    this.hiddenClient = true;
    this.isLogged = false;
    this.swal.info('See you son!', 'Closing session')
    this.router.navigate(['/']);
  }

  

}

