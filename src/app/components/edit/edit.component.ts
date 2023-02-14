import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  userData!: User;
  addForm!: FormGroup

  constructor(private fb: FormBuilder, private us: UserService, private router: Router, private route: ActivatedRoute) {
    this.addForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.pattern(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )]],
      phone: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      image: ["", Validators.required]
    })
  }


  ngOnInit(): void {
    this.fetchUser()
  }


  fetchUser() {
    let id = this.route.snapshot.paramMap.get('id')
    this.us.getSingleUser(id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.userData = data
        this.addForm.patchValue({ name: this.userData.name, email: this.userData.email, phone: this.userData.phone, image: this.userData.image })
      },
      error: () => alert("Error while we are fetching data")
    })
  }





  // name, email, phone number, and image




  onSubmit() {
    this.us.updateUser(this.userData._id, this.addForm.value).subscribe({
      next: (data: any) => {
        alert(`User ${data.data.name} updated`);
        this.router.navigate(["../"])
      },
      error: () => {
        alert("Error while updating")
      }
    })
  }

  onFileUpload = (ev: string) => this.addForm.patchValue({ image: ev })
}
