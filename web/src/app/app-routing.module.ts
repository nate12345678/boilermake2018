import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { HomeComponent } from './home/home.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { FriendsComponent } from './friends/friends.component';
import {CalendarComponent} from './calendar/calendar.component';

const routes: Routes = [
  {
    path: 'log-in',
    component: LogInComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'schedule',
    component: ScheduleComponent
  },
  {
    path: 'friends',
    component: FriendsComponent
  },
  {
    path: 'calendar',
    component: CalendarComponent
  },
  {
    path: '',
    redirectTo: '/log-in',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
