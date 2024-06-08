import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';
import { SharedService } from 'src/app/core/services/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss']
})
export class ExamsComponent implements OnInit {

  userName: any;
  userInfoId: any;
  courseInfoId: any;

  listCourses: any = [];
  listExams: any = [];

  examNameValue: any;
  examQnumValue: any;
  selectedCourseId:any;
  filtered :any;
  selected:any;

  errorMessage: any;

  constructor(private dataService: DataService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getUser();
    setTimeout(() => {
      this.showAllCourses();
    }, 500)
    
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

  showAllCourses() {
    const params = {
      "userId":this.userInfoId,
    }
    this.dataService.showAllCourse(params).subscribe((res) => {
      if (res.status === 200) {
        this.listCourses = res.courseArray;

      }
    }, (err) => {
    })
  }

  onOptionsSelected() {
  }

  createExam(){
    debugger
    if (this.examNameValue == '' || this.examQnumValue == 0 || this.selectedCourseId == '' ||
      this.examNameValue == undefined || this.examQnumValue == undefined || this.selectedCourseId == undefined) {
      this.errorMessage = 'Lütfen tüm alanları doldurunuz!'
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000)
    } else {

      const params = {
        "courseId": this.selectedCourseId,
        "examName": this.examNameValue,
        "questionNumber": this.examQnumValue,
      }

      this.dataService.createExam(params).subscribe((res) => {
        if (res.status == 200) {
          Swal.fire({
            title: this.examNameValue,
            text: "Başarı ile oluşturuldu",
            icon: "success"
          })
        }
      }, (err) => {

      })
    }

  }



}
