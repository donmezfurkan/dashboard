import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private userIdSource = new BehaviorSubject<string | null>(null);
  currentuserId = this.userIdSource.asObservable();

  private courseIdSource = new BehaviorSubject<string[]>([]);
  currentCourseId = this.courseIdSource.asObservable();

  private examIdSource = new BehaviorSubject<string[]>([]);
  currentExamId = this.examIdSource.asObservable();

  constructor() { }

  changeUserId(userId: string) {
    this.userIdSource.next(userId);
  }

  changeCourseId(courseId: string) {
    this.courseIdSource.next([...courseId]);
  }

  changeExamId(examId: string) {
    this.examIdSource.next([...examId]);
  }
}
