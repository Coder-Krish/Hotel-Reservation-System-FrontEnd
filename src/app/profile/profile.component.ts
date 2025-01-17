import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  id:any;
  currentUser:any;
  uploadDir:any;
  retrievedImage:any;
  profilePic:any;
  selectedFile:any;
  isSelectedFile:any;
  progress:any;

  username:any;
  email:any;
  document:any;
  


  constructor( 
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

this.currentUser=this.tokenStorageService.getUser();
this.getPhotoOfAdmin(this.currentUser.id);

  }

  selectFileHandler(event:any){
    this.selectedFile=event.target.files[0];
    this.isSelectedFile=true;
    // console.log(this.selectedFile);
    
     }

   //reload the page
   refresh() {
    window.location.reload();
  }

getPhotoOfAdmin(id:any){
this.userService.getProfilePicture(id).subscribe(

  res=>{
    this.uploadDir=res.uploadDir;
    this.id=res.id;
    
    this.userService.loadProfilePicture(this.uploadDir).subscribe(
      res=>{
        console.log(res.type);
       this.getImageFromBlob(res);
      },
      err=>{
        console.log(err);
      }
    );
    
  },
  err=>{
    console.log(err);
    
  }
);
}


//photo received method
getImageFromBlob(image:Blob){
let reader=new FileReader();
reader.addEventListener("load",()=>{
  this.retrievedImage=reader.result;
},
false);
if(image){
  reader.readAsDataURL(image);
}
}

onSubmit(){
  
}

editProfilePic(){

  // console.log(this.currentUser.id);
  const uploadProfileImage:FormData = new FormData();
  uploadProfileImage.append('profile',this.selectedFile, this.selectedFile.name);
  this.userService.updateProfilePicture(this.currentUser.id,uploadProfileImage).subscribe(
   (res: HttpEvent<any>) =>{

    switch(res.type){
      case HttpEventType.Sent:
        console.log('Request has been made!');
        break;
      case HttpEventType.ResponseHeader:
        console.log('Response header has been received!');
        break;
      case HttpEventType.UploadProgress:

        break;
      case HttpEventType.Response:

        this.snackBar.open(res.body.message,'Dismiss',{
          duration: 4000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          panelClass:['success-snackBar'],
 
        });

        setTimeout(()=>{
           window.location.reload();
        },5000)
        break;
      
        default:
        console.log(res.type);
    }
    },
    err =>{
        console.log(err);
    }
  );

}

removeProfilePic(id:any){
  this.userService.deleteProfilePic(id).subscribe(
res=>{
  this.snackBar.open(res.message, 'Dismiss', {
    duration: 4000,
    verticalPosition: 'bottom',
    horizontalPosition: 'right',
    panelClass: ['red-snackBar'],
  });
  this.refresh();
},

err=>{
  console.log(err);
}
  );
}

uploadProfilePicture(){

  // this.isLoading = true;
 const uploadProfileImage:FormData = new FormData();
 uploadProfileImage.append('profile',this.selectedFile, this.selectedFile.name);
 this.userService.addProfile(this.currentUser.id,uploadProfileImage).subscribe(
 (res:any)=>{

  this.snackBar.open(res.message, 'Dismiss', {
    duration: 4000,
    verticalPosition: 'bottom',
    horizontalPosition: 'right',
    panelClass: ['success-snackBar'],
  });
  this.refresh();
//  this.isLoading = false;

 },
 err =>{
 this.progress = 0;
 this.snackBar.open(err.body.message,'Dismiss',{
 duration: 4000,
 verticalPosition: 'bottom',
 horizontalPosition: 'right',
 panelClass:['red-snackBar'],
 });
 
  setTimeout(()=>{
 window.location.reload();
 },5000)
 }
 );
 
  }

}
