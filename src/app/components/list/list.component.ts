import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  userList!: User[];
  constructor(private us: UserService) { }

  ngOnInit(): void {
    this.fetchUser()
  }


  fetchUser() {
    this.us.getUser().subscribe({
      next: (data: any) => {
        console.log(data);
        this.userList = data
      },
      error: () => alert("Error while we are fetching data")
    })
  }

  deleteUser(item: any) {
    this.us.deleteUser(item._id).subscribe({
      next: (data: any) => {
        this.fetchUser()
        alert(`User ${item.name} deleted successfully`)
      },
      error: () => alert("Error while deleting")
    })
  }

}
