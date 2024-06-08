import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { DataService } from 'src/app/core/services/data.service';
import { SharedService } from 'src/app/core/services/shared.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  checkAdmin: Boolean = false;

  userName: any;
  userInfoId: any;
  courseInfoId: any;

  listCourses: any = [];
  listExams: any = [];

  constructor(private authService: AuthService, private dataService: DataService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.userName = localStorage.getItem('kullanıcı adı')
    if (this.userName == 'admin') {
      this.checkAdmin = true;
    }
    this.getUser();
    this.showCourses();
    //this.showExams();

  }

  getUser() {

    this.userName = localStorage.getItem('kullanıcı adı');
    const params = {
      "userName": this.userName
    }
    this.dataService.getUserInfo(params).subscribe((res) => {
      this.userInfoId = res.userProfile.userId
      this.sharedService.changeUserId(this.userInfoId)
    }, (error) => {

    })
  }

  showCourses() {
    this.dataService.showCourse(this.userInfoId).subscribe((res) => {
      if (res.status === 200) {
        this.listCourses = res.courseArray;
        this.courseInfoId = res.courseArray._id
        this.sharedService.changeCourseId(this.listCourses);

      }
    }, (err) => {
    })
  }

  // showExams() {
  //   debugger
  //   this.dataService.showExam(this.courseInfoId).subscribe((res) => {
  //     if (res.status === 200) {
  //       debugger
  //       //this.listExams = res.courseArray;
  //       //this.courseInfoId = res.courseArray.courseId
  //       //this.sharedService.changeCourseId(this.listCourses);

  //     }
  //   }, (err) => {
  //   })
  // }

  logOut() {
    this.authService.logout();
  }

}
