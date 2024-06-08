import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/core/services/data.service';


@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss']
})
export class GradesComponent implements OnInit {

  userName: any;
  userInfoId: any;
  courseInfoId: any;

  listCourses: any = [];
  listExams: any = [];
  studentGrades: any = [];
  numberOfQuestions: number = 0;
  numberOfStudents: number = 0;
  numberOfExamQuestions: number = 0;

  selectedCourseId:any;
  selectedExamId:any;

  errorMessage: any;
  checkShowTable: boolean = false;

  constructor(private dataService: DataService,) {}

  ngOnInit() {
    // Örnek veri, bunu API çağrısı ile değiştirebilirsiniz
    this.getUser();
    setTimeout(() => {
      this.showAllCourses();
    }, 300)
    this.studentGrades = [];

    this.numberOfStudents = this.studentGrades.length;
    if (this.studentGrades.length > 0) {
      this.numberOfQuestions = this.studentGrades[0].grades.length;
    }
  }
  onOptionsSelected() {
    this.showAllCourses();
  }
  onOptionsSelectedExam(){}
  getUser() {
    this.userName = localStorage.getItem('kullanıcı adı');
    const params = {
      "userName": this.userName
    }
    this.dataService.getUserInfo(params).subscribe((res) => {
      this.userInfoId = res.userProfile.userId
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
        console.log(this.listCourses)
        for (let index = 0; index < this.listCourses.length; index++) {
          if (this.listCourses[index]._id === this.selectedCourseId) { 
            const params = {
              "courseId":this.selectedCourseId,
            }
            this.dataService.showExam(params).subscribe((res)=>{
              this.listExams = res.examArray 
            },(err) =>{

            })
          }
        }

      }
    }, (err) => {
    })
  }
  showGrade(){
    if (this.selectedExamId == '' || this.selectedCourseId == '' ||
       this.selectedExamId == undefined || this.selectedCourseId == undefined) {
      this.errorMessage = 'Lütfen tüm alanları doldurunuz!'
      this.checkShowTable = false;
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000)
    } else {
      this.checkShowTable =true;
      for (let index = 0; index < this.listExams.length; index++) {
        if (this.selectedExamId === this.listExams[index]._id) {
          this.numberOfExamQuestions = this.listExams[index].questionNumber;
        }
      }
      this.getGradeInfo(this.selectedExamId);
    }
  }

  getGradeInfo(examId: any){
    const params = {
      "examId":examId,
    }
    this.dataService.showGrade(params).subscribe((res)=>{
      if (res.status === 200) {
        this.studentGrades = res.gradeArray
        this.numberOfStudents = this.studentGrades.length
        debugger
        this.studentGrades.forEach((student:any) => {
          student.totalGrades = student.scores.reduce((a:any, b:any) => a + b, 0);
        });
        
      }
      this.studentGrades;
    },(err) =>{})
  }


  getQuestionAverage(questionIndex: number): number {
    let total = 0;
    for (let student of this.studentGrades) {
      total += student.scores[questionIndex];
    }
    return total / this.numberOfStudents;
  }

  getTotalAverage(): number {
    let total = 0;
    for (let student of this.studentGrades) {
      debugger
      total += student.totalGrades;
    }
    return total / this.numberOfStudents;
  }

}
