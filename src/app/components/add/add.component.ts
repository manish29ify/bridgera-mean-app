import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  addForm!: FormGroup
  constructor(private fb: FormBuilder, private us: UserService, private router: Router) {
    this.addForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.pattern(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )]],
      phone: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      image: ["", Validators.required]
    })
  }

  // name, email, phone number, and image


  ngOnInit(): void {
  }


  onSubmit() {
    this.us.addUser(this.addForm.value).subscribe({
      next: (data: any) => {
        alert(`User ${data.data.name} added`);
        this.router.navigate(["../"])
      },
      error: () => {
        alert("Either User is already register")
      }
    })
  }

  onFileUpload = (ev: string) => this.addForm.patchValue({ image: ev })

}
