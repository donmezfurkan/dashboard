import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiteComponent } from './components/site/site.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './core/services/auth-guard.service';
import { CoursesComponent } from './components/courses/courses.component';
import { ExamsComponent } from './components/exams/exams.component';
import { GradesComponent } from './components/grades/grades.component';
import { UsersComponent } from './components/users/users.component';


export const AppRoutes: ModuleWithProviders<any> = RouterModule.forRoot([

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: SiteComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'dersler',
        component: CoursesComponent,
      },
      {
        path: 'sinavlar',
        component: ExamsComponent,
      },
      {
        path: 'notlar',
        component: GradesComponent,
      },
      {
        path: 'kullanici',
        component: UsersComponent,
      },
    ]
  },
  {
    path: 'login',
    canActivate: [],
    component: LoginComponent,
  }
])

export const RoutedComponents = [
  LoginComponent,
  HomeComponent,
  SiteComponent,
]
