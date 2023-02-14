import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription, finalize } from 'rxjs';

@Component({
  selector: 'file-upload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent implements OnInit {
  @Output() onFileUpload = new EventEmitter<string>()

  fileName = '';



  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("image", file, this.fileName);
      this.http.post("http://localhost/api/users/upload", formData).subscribe({
        next: (data: any) => {
          console.log('====================================');
          console.log(data);
          console.log('====================================');
          this.onFileUpload.emit(data.image)
        },
        error: () => {
          alert("Error While Uploading")
        }

      })
    }
  }

}
