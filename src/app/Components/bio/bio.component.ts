import { Component, OnInit, ChangeDetectionStrategy, Input, NgZone, AfterViewInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { PersonalData } from 'src/app/models/personalData';
import { Subject, BehaviorSubject } from 'rxjs';
import { async } from 'q';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BioComponent implements OnInit {

  @Input() bio: PersonalData

  private subject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)
  show$ = this.subject.asObservable()

  selectedFile: ImageSnippet;

  constructor(private httpService: HttpService, private ngZone: NgZone) { }

  ngOnInit() {
    // console.log(this.bio)
    this.subject.next(this.bio.following)
  }

  async followUser() {
    try {
      if (!this.bio.following) {
        this.bio.following = await this.httpService.followUser(this.bio._id)
      } else {
        this.bio.following = await this.httpService.deleteFollowUser(this.bio._id)
      }
      this.subject.next(this.bio.following)
    } catch (e) {

    }
  }

  getName(val: boolean): string {
    if (val) {
      return 'UNFOLLOW'
    }
    return 'FOLLOW'
  }

  //here

  // async processFile(imageInput: any) {
  //   const file: File = imageInput.files[0];
  //   const reader = new FileReader();
  //   try {
  //     reader.addEventListener('load', async (event: any) => {
  //       this.selectedFile = new ImageSnippet(event.target.result, file);
  //       await this.httpService.uploadImage(this.selectedFile.file)
  //       alert('Image Successfully Uploaded!. Please refresh the view to get it reflected.')
  //     });
  //     reader.readAsDataURL(file);
  //   } catch (error) {
  //     // console.log(error)
  //     alert('Image Upload failed. Try uploading below 1 MB size.')
  //   }
  // }
}


class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) { }
}