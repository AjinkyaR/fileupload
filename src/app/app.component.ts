import { Component } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  id: string;
  title = 'fileupload';
  fileName: string;
  file: any;
files:File
fileUrl= "";


  selectFile(event) {
    console.log(event)
    console.log(event.target.files[0]);
    this.fileName = event.target.files[0].name;
    this.file = event.target.files[0];
  }


  /* aws s3 file upload */
   uploadfile() {  
    this.id =
      new Date().getTime().toString(16);

    const params = {
      Bucket: 'devsumit',
      Key:  this.id,
      Body: this.file,
      ContentDisposition: 'attachment;filename ="' + this.file.name + '"',
      ContentType: this.file.type
    };
    console.log(params);

    const bucket = new S3({
      accessKeyId: 'AKIAIQSWX5PBXGVXMEMQ',
      secretAccessKey: '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',
      region: 'us-east-1'
    });

  bucket.upload(params, (err, data) => {
    if (err) {
      console.log('There was an error uploading your file: ', err);
    } else {
      alert(this.fileName + "uploaded Successfully");
      console.log('Successfully uploaded file.', data);
      this.fileUrl = data['Location'];
    }
  })
  console.log(this.fileUrl);
  } 
}
