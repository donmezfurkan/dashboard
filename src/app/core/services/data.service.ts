import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IResponse } from '../model/IResponse';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';





@Injectable({providedIn: 'root'})
export class DataService extends BaseService {

  constructor(public override  http: HttpClient) {
    super(http);
  }

  //Login Service
  userLogin(params: any): Observable <IResponse>{
    return this.makePOST('auth/login',params)
  }

  // User Service

  getUserInfo(params:any): Observable <IResponse>{
    return this.makePOST('userProfile',params)
  }

  // Courses Service
  createCourse(params:any): Observable <IResponse>{
    return this.makePOST('courses/course-create',params)
  }
  showAllCourse(params:any): Observable <IResponse>{
    return this.makePOST('courses/course-showAll',params)
  }
  showCourse(params:any): Observable <IResponse>{
    return this.makePOST('courses/course-show',params)
  }
  editCourse(params:any): Observable <IResponse>{
    return this.makePOST('courses/course-edit',params)
  }
  deleteCourse(params:any): Observable <IResponse>{
    return this.makePOST('courses/course-delete',params)
  }
  

  // Exams Services
  createExam(params:any): Observable <IResponse>{
    return this.makePOST('exam/exam-create',params)
  }
  showExam(params:any): Observable <IResponse>{
    return this.makePOST('exam/exam-show',params)
  }
  editExam(params:any): Observable <IResponse>{
    return this.makePOST('exam/exam-edit',params)
  }
  deleteExam(params:any): Observable <IResponse>{
    return this.makePOST('exam/exam-delete',params)
  }

  // Grades Services
  
  createGrade(params:any): Observable <IResponse>{
    return this.makePOST('grade/grade-create',params)
  }
  showGrade(params:any): Observable <IResponse>{
    return this.makePOST('grade/grade-show',params)
  }
  editGrade(params:any): Observable <IResponse>{
    return this.makePOST('grade/grade-edit',params)
  }
  deleteGrade(params:any): Observable <IResponse>{
    return this.makePOST('grade/grade-delete',params)
  }
}
