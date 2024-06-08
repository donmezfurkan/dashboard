import { Component, OnInit } from '@angular/core';
import { error } from 'console';
import { DataService } from 'src/app/core/services/data.service';
import { SharedService } from 'src/app/core/services/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  userName: any;
  userInfoId: any;
  courseInfoId: any;

  listCourses: any = [];

  courseNameValue: any;
  courseCRNValue: any;
  courseCodeValue: any;

  errorMessage: any;

  constructor(private dataService: DataService, private sharedService: SharedService) { }

  ngOnInit(): void {
    //this.getUser();
    this.showCourses();
  }
  //.subscribe((res)=>{},(err) =>{})
  // getUser() {

  //   this.userName = localStorage.getItem('kullanıcı adı');
  //   const params = {
  //     "userName": this.userName
  //   }
  //   this.dataService.getUserInfo(params).subscribe((res) => {
  //     this.userInfoId = res.userProfile.userId
  //   }, (error) => {

  //   })
  // }

  showCourses() {
    // this.dataService.showCourse(this.userInfoId).subscribe((res) => {
    //   if (res.status === 200) {
    //     this.listCourses = res.courseArray;
    //     this.courseInfoId = res.courseArray.courseId
    //     this.sharedService.changeCourseId(this.courseInfoId);

    //   }
    // }, (err) => {

    // })
    this.sharedService.currentCourseId.subscribe(courseId => {
      this.listCourses = courseId;
    });
  }


  async editCourse(i: number, courseId: any, name: any, crn: any, code: any) {
    const { value: formValues } = await Swal.fire({
      imageUrl: '../../assets/Icons/User.png',
      title: name + ' İçin Düzenle',
      html: '<input id="swal-input1" class="swal2-input" placeholder="ders crn" value="' + crn + '"><input id="swal-input2" class="swal2-input" placeholder="ders kodu" value="' + code + '"><input id="swal-input3" class="swal2-input" placeholder="ders adı" value="' + name + '">',
      backdrop: "rgba(0, 0, 0, 0.8)",
      showCloseButton: true,
      confirmButtonText: 'Kaydet',
      customClass: {
        popup: 'custom-popup-class',
        closeButton: 'custom-swal-close',
        image: 'custom-image-class cancel-radius-border',
        title: 'custom-title-class',
        confirmButton: 'custom-confirm-button-class',
      },

      preConfirm: () => {
        const input1 = (<HTMLInputElement>document.getElementById('swal-input1')).value;
        const input2 = (<HTMLInputElement>document.getElementById('swal-input2')).value;
        const input3 = (<HTMLInputElement>document.getElementById('swal-input3')).value;

        if (input1.length > 0 && input2.length > 0 && input3.length > 0) {
          return [input1, input2, input3];
        } else {
          Swal.showValidationMessage('Lütfen Tüm Bilgileri Giriniz.');
          return false;  // Burada false döndürerek kodun her zaman bir değer döndürmesini sağlıyoruz
        }
      }
    })
    if (formValues) {
      const params = {
        "courseId": courseId,
        "courseName": formValues[2],
        "courseCode": formValues[1],
        "courseCRN": formValues[0],
      }
      this.dataService.editCourse(params).subscribe(res => {


        Swal.fire({
          icon: 'success',
          //title: 'Oops...',
          text: 'İşlem Başarılı',
          confirmButtonText: 'Tamam'
          //footer: '<a href>Why do I have this issue?</a>'
        })

      }, err => {
        Swal.fire({
          icon: 'error',
          //title: 'Oops...',
          text: err.userMessage,
          confirmButtonText: 'Tamam'
          //footer: '<a href>Why do I have this issue?</a>'
        })
      })

    }
  }

  deleteCourse(i: number, courseId: any, name:any) {
    debugger
    const params = {
      "courseId": courseId,
    }

    Swal.fire({
      title: 'Emin Misin?',
      text: name +' Siliyorsun',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sil',
      cancelButtonText: 'Vazgeç'
    }).then((result) => {
      if (result.value) {
        this.dataService.deleteCourse(params).subscribe((res) => {

          if (res.status == 200) {
            Swal.fire({
              icon: 'success',
              //title: 'Oops...',
              text: 'İşlem Başarılı',
              confirmButtonText: 'Tamam'
              //footer: '<a href>Why do I have this issue?</a>'
            })
          }
        }, (err) => {
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Item is safe.)',
          'error'
        )
      }
    })
  }

  createCourse() {
    debugger
    if (this.courseNameValue == '' || this.courseCRNValue == '' || this.courseCodeValue == '' ||
      this.courseNameValue == undefined || this.courseCRNValue == undefined || this.courseCodeValue == undefined) {
      this.errorMessage = 'Lütfen tüm alanları doldurunuz!'
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000)
    } else {

      const params = {
        "courseName": this.courseNameValue,
        "courseCode": this.courseCodeValue,
        "courseCRN": this.courseCRNValue,
        "userId": this.userInfoId,
      }

      this.dataService.createCourse(params).subscribe((res) => {
        if (res.status == 200) {
          Swal.fire({
            title: this.courseNameValue,
            text: "Başarı ile oluşturuldu",
            icon: "success"
          })

        }
      }, (err) => {

      })
    }

  }

}
