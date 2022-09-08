import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {GoogleChartsModule} from "angular-google-charts";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgbCollapseModule, NgbModalModule, NgbModule, NgbNavModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from "ngx-pagination";
import {MatButtonModule} from "@angular/material/button";
import {MatSnackBarModule} from "@angular/material/snack-bar";

import {
  ScheduleAllModule,
  RecurrenceEditorModule, ScheduleModule
} from "@syncfusion/ej2-angular-schedule";
import { CalendarComponent } from './CoursesSpace/calendar/calendar.component';
import {ListFomateurComponent} from "./CoursesSpace/list-fomateur/list-fomateur.component";
import {FormationComponent} from "./CoursesSpace/formation/formation.component";
import {AddFomateurComponent} from "./CoursesSpace/add-fomateur/add-fomateur.component";
import { ListeFormationComponent } from './CoursesSpace/liste-formation/liste-formation.component';
import {DayPilotModule} from "daypilot-pro-angular";

import { FlatpickrModule } from 'angularx-flatpickr';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {SidebarModule, TreeViewModule} from "@syncfusion/ej2-angular-navigations";
import { QuizComponent } from './CoursesSpace/quiz/quiz.component';
import { ChangeBgDirective } from './change-bg.directive';
import {NgxQRCodeModule} from "ngx-qrcode2";
import { CoursesFormComponent } from './CoursesSpace/courses-form/courses-form.component';

import {WelcomeComponent} from "./CoursesSpace/welcome/welcome.component";
import { QuestionComponent } from './CoursesSpace/question/question.component';
import {DialogModule} from "@syncfusion/ej2-angular-popups";
import {ComboBoxModule, DropDownListModule, MultiSelectModule} from "@syncfusion/ej2-angular-dropdowns";
import {ButtonModule, CheckBoxModule, RadioButtonModule, SwitchModule} from "@syncfusion/ej2-angular-buttons";
import { AddEditFormerComponent } from './CoursesSpace/add-edit-former/add-edit-former.component';
import {MaskedTextBoxModule, TextBoxModule} from "@syncfusion/ej2-angular-inputs";
import {APP_BASE_HREF, CommonModule, HashLocationStrategy, LocationStrategy} from "@angular/common";
import {ToastModule} from "@syncfusion/ej2-angular-notifications";
import { CalendarCoursesComponent } from './CoursesSpace/calendar-courses/calendar-courses.component';
import {DragAndDropModule} from "angular-draggable-droppable";
import {Angulartics2Module} from "angulartics2";
import {environment} from "../environments/environment";
import {ClipboardModule} from "@angular/cdk/clipboard";
import {VgCoreModule} from "@videogular/ngx-videogular/core";
import {VgBufferingModule} from "@videogular/ngx-videogular/buffering";
import {VgOverlayPlayModule} from "@videogular/ngx-videogular/overlay-play";
import {VgControlsModule} from "@videogular/ngx-videogular/controls";
import { VideoplaylistComponent } from './CoursesSpace/videoplaylist/videoplaylist.component';
import { DashboardComponent } from './BackEnd/dashboard/dashboard.component';

import {DatePickerModule, TimePickerModule} from "@syncfusion/ej2-angular-calendars";
import {NgxWebstorageModule} from "ngx-webstorage";
import { RoutComponent } from './CoursesSpace/chat/rout/rout.component';
import { HomeFComponent } from './FontEnd/home-f/home-f.component';
import { BlogFormationComponent } from './CoursesSpace/blog-formation/blog-formation.component';
import {HomeComponent} from "./BackEnd/home/home.component";
import {FooterComponent} from "./BackEnd/footer/footer.component";
import {NavbarComponent} from "./BackEnd/navbar/navbar.component";
import {LayoutComponent} from "./BackEnd/layout/layout.component";
import {SidbarComponent} from "./BackEnd/sidbar/sidbar.component";
import {NavbarFComponent} from "./FontEnd/navbar-f/navbar-f.component";
import {LayoutFComponent} from "./FontEnd/layout-f/layout-f.component";
import {FooterFComponent} from "./FontEnd/footer-f/footer-f.component";
import { BlogDetailsComponent } from './CoursesSpace/blog-details/blog-details.component';
import { PortfelioFormComponent } from './CoursesSpace/portfelio-form/portfelio-form.component';
import { PortfelioFormDetailsComponent } from './CoursesSpace/portfelio-form-details/portfelio-form-details.component';
import { UserViewComponent } from './CoursesSpace/user-view/user-view.component';
import {MapComponent} from "./CoursesSpace/map/map.component";
import { MyCoursesComponent } from './CoursesSpace/my-courses/my-courses.component';
import { CalendarFrontComponent } from './CoursesSpace/calendar-front/calendar-front.component';
import { QestionQuizCoursesComponent } from './CoursesSpace/qestion-quiz-courses/qestion-quiz-courses.component';
import { E404Component } from './FontEnd/e404/e404.component';
import { CallVideoComponent } from './CoursesSpace/call-video/call-video.component';

import { TeamComponent } from './CoursesSpace/team/team.component';

import { ChatComponent } from './CoursesSpace/chatClient/chat/chat.component';
import { UsersComponent } from './CoursesSpace/chatClent/users/users.component';
import {CartComponent} from "./CoursesSpace/cart/cart.component";


import {GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from "angularx-social-login";
import { UserListComponent } from './CoursesSpace/user-list/user-list.component';
import { VerificationAcountComponent } from './CoursesSpace/verification-acount/verification-acount.component';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatTabsModule} from "@angular/material/tabs";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDividerModule} from "@angular/material/divider";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSidenavModule} from "@angular/material/sidenav";
import {LoginComponent} from "./BackEnd/login/login.component";
import {RegisterComponent} from "./BackEnd/register/register.component";
import { LayoutCComponent } from './FontEnd/layout-c/layout-c.component';
import { LayoutMyComponent } from './FontEnd/layout-my/layout-my.component';
import { NavbarCComponent } from './FontEnd/navbar-c/navbar-c.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { Pages404Component } from './CoursesSpace/pages404/pages404.component';




FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin
]);


@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    ListFomateurComponent,
    AddFomateurComponent,
    FormationComponent,
    ListeFormationComponent,
    QuizComponent,
    ChangeBgDirective,
    CoursesFormComponent,
    HomeComponent,
    FooterComponent,
    CartComponent,
    NavbarComponent,
    LayoutComponent,
    SidbarComponent,
    WelcomeComponent,
    QuestionComponent,
    AddEditFormerComponent,
    CalendarCoursesComponent,
    VideoplaylistComponent,
    MapComponent,
    DashboardComponent,
    LoginComponent,
    RoutComponent,
    RegisterComponent,
    HomeFComponent,
    BlogFormationComponent,
    NavbarFComponent,
    FooterFComponent,
    LayoutFComponent,
    BlogDetailsComponent,
    PortfelioFormComponent,
    PortfelioFormDetailsComponent,
    UserViewComponent,
    MyCoursesComponent,
    CalendarFrontComponent,
    QestionQuizCoursesComponent,
    E404Component,
    CallVideoComponent,
    TeamComponent,
    ChatComponent,
    UsersComponent,
    UserListComponent,
    VerificationAcountComponent,
    LayoutCComponent,
    LayoutMyComponent,
    NavbarCComponent,
    Pages404Component,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScheduleModule,
    RecurrenceEditorModule,
    DropDownListModule,
    MultiSelectModule,
    ComboBoxModule,
    SocialLoginModule,
    CheckBoxModule,
    ButtonModule,
    SwitchModule,
    RadioButtonModule,
    TreeViewModule,
    DatePickerModule,
    TimePickerModule,
    SidebarModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    BrowserAnimationsModule,
    TextBoxModule,
    MaskedTextBoxModule,
    HttpClientModule,
    NgxPaginationModule,
    NgxQRCodeModule,
    GoogleChartsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDividerModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSidenavModule,
    MatSnackBarModule,
    NgbModule,
    FullCalendarModule,
    DayPilotModule,
    ScheduleAllModule,
    NgbNavModule,
    NgbCollapseModule,
    NgxWebstorageModule.forRoot(),
    NgbTooltipModule,
    ClipboardModule,
    DragAndDropModule,
    Angulartics2Module.forRoot({
      developerMode: !environment.production,
    }),
    CommonModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    MatCheckboxModule,

  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '340122199327-o9gdlce1uan9k434s0rf5lr75oi5ccb0.apps.googleusercontent.com' // add web app client id
            )
          }
        ]
      } as SocialAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
