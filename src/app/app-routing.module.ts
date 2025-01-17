import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HotelComponent } from './hotel/hotel.component';
import { LoginComponent } from './login/login.component';
import { ReservationComponent } from './reservation/reservation.component';
import { RoomComponent } from './room/room.component';
import { RegisterComponent } from './register/register.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserComponent } from './user/user.component';
import { OtpComponent } from './otp/otp.component';
import { ProfileComponent } from './profile/profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { CustomerComponent } from './customer/customer.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  {path:'homepage',component:HomepageComponent},
  {path:'hotel',component:HotelComponent},
  {path:'hotel/:id',component:HotelComponent},
  {path:'hotel1/:id',component:HotelComponent},
  {path:'customer/:id',component:CustomerComponent},
  {path:'customer1/:id',component:CustomerComponent},
  {path:'room',component:RoomComponent},
  {path:'reservation',component:ReservationComponent},
  {path:'checkout',component:CheckoutComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'change-password',component:ChangePasswordComponent},
  { path:'user',component:UserComponent},
  { path:'homepage1/:id',component:HomepageComponent},
  { path:'homepage2/:id',component:HomepageComponent},
  { path:'homepage3/:id',component:HomepageComponent},
  { path:'profile',component:ProfileComponent},
  {path: 'forgot-password', component:ForgotPasswordComponent},
  { path:'otp',component:OtpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
