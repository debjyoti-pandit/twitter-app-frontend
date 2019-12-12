import { Component, OnInit, ChangeDetectionStrategy, Input, NgZone, AfterViewInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { PersonalData } from 'src/app/models/personalData';
import { BehaviorSubject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ViewChild, ElementRef} from '@angular/core';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BioComponent implements OnInit {

  @Input() bio: PersonalData

  @ViewChild('closeAddExpenseModal', { static : true }) closeAddExpenseModal: ElementRef;

  private subject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true)
  show$ = this.subject.asObservable()


  private subjectUpload: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  showUpload$ = this.subjectUpload.asObservable()

  fileData: File = null;
  previewUrl: any = null;
  fileSelected: boolean = false

  imageUpload = new FormControl('');

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

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

  preview() {
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
      this.subjectUpload.next(true)
      this.fileSelected = true
    }
  }

  async onSubmit(fileInput) {
    try {
      await this.httpService.uploadImage(this.fileData)
      this.previewUrl = null
      this.subjectUpload.next(false)
      fileInput.value = ""
      this.closeAddExpenseModal.nativeElement.click();
      alert('Successfully, uploaded your profile picture !! Please refresh, to get it reflected.');
    } catch (e) {
      alert("Please upload a file less than 1 MB!")
      this.fileSelected = false
    }
  }
}