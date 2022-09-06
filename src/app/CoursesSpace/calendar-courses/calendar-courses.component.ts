import {
  Component, OnInit, ChangeDetectionStrategy,
  ViewChild,
  TemplateRef, ViewEncapsulation, Input,
} from '@angular/core';

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView} from "angular-calendar";
import {addClass, Browser, closest, Internationalization, L10n} from "@syncfusion/ej2-base";
import {
  AgendaService, CellClickEventArgs,
  DayService, DragAndDropService, EventSettingsModel, GroupModel,
  MonthService, NavigatingEventArgs, PopupOpenEventArgs, ResizeService, ScheduleComponent, TimelineMonthService,
  TimelineViewsService, TimeScaleModel,
  WeekService, WorkHoursModel,
  WorkWeekService
} from "@syncfusion/ej2-angular-schedule";
import {AddEditFormerComponent} from "../add-edit-former/add-edit-former.component";
import {DialogComponent} from "@syncfusion/ej2-angular-popups";
import {ComboBox, DropDownList} from "@syncfusion/ej2-angular-dropdowns";
import {ToastComponent} from "@syncfusion/ej2-angular-notifications";
import {DragAndDropEventArgs, TreeViewComponent} from "@syncfusion/ej2-angular-navigations";
import {CalendarSettings} from "../../calendar-settings";
import {Formation} from "../../core/model/Formation";
import {User} from "../../core/model/User";
import {FormationService} from "../services/formation.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CalendarOptions} from "@fullcalendar/angular";
import {DataManager, WebApiAdaptor} from "@syncfusion/ej2-data";
import {ChangeEventArgs} from "@syncfusion/ej2-angular-inputs";
import {TokenService} from "../services/token.service";
import {ActivatedRoute} from "@angular/router";


L10n.load({
  'en-US': {
    schedule: {
      newEvent: 'Add Courses',
      editEvent: 'Edit Courses'
    }
  }
});

declare var $: any;

@Component({
  selector: 'app-calendar-courses',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar-courses.component.html',
  styleUrls: ['./calendar-courses.component.scss'],
  providers: [
    DayService, WeekService, WorkWeekService, MonthService, AgendaService, TimelineViewsService,
    TimelineMonthService, ResizeService, DragAndDropService
  ],
  encapsulation: ViewEncapsulation.None
})
export class CalendarCoursesComponent implements OnInit {

  @ViewChild('scheduleObj') scheduleObj: ScheduleComponent;

  @ViewChild('addEditFormerObj') addEditDoctorObj: AddEditFormerComponent;

  @ViewChild('specialistObj') specialistObj: DialogComponent;

  @ViewChild('dropdownObj') dropdownObj: DropDownList;
  @ViewChild('calendarToast') toastObj: ToastComponent;
  @ViewChild('treeObj') treeObj: TreeViewComponent;
  @ViewChild('waitingObj') waitingObj: DialogComponent;

  public footerTemplate = `<div class="add-doctor"><div class="e-icon-add e-icons"></div>
    <div class="add-doctor-text">Add New Former</div></div>`;

  public itemTemplate: string = '<div class="specialist-item"><img class="value" style="width: 50px ;height: 50px" src="${image}" alt="doctor"/>' +
    '<div class="doctor-details"><div class="name">${title}</div><div class="designation">${domain}</div></div></div>';

  public animationSettings: Record<string, any> = { effect: 'None' };

  public group: GroupModel = { enableCompactView: false, resources: ['Departments', 'Doctors'] };
  public comboBox: ComboBox;
  public currentDate: Date;
  public calendarSettings: CalendarSettings;
  @Input() fr:Formation=new Formation;
  @Input() user:User=new User;
  public scheduleInstance : ScheduleComponent;




  public position: Record<string, any> = { X: 'Right', Y: 'Bottom' };

  public toastWidth = '580px';
  public toastContent: string;

  public workDays: Array<number> = [0, 1, 2, 3, 4, 5, 6];
  public workHours: WorkHoursModel = { start: '08:00', end: '21:00' };
  public firstDayOfWeek = 1;
  public startHour: string;
  public endHour: string;
  idF : string='';

  public path : string ;


  public allowDragAndDrop = true;
  @Input() formation: Formation ;
  public idFormateur: string;
  public ListApprenant: Record<string, any>[];

  constructor(private serviceForm : FormationService,private snackbar:MatSnackBar,private token: TokenService,private route:ActivatedRoute ) {

    this.currentUser = this.token.getUser();

    this.idFormateur = this.route.snapshot.params['idFormer'];

    this.path = "http://localhost:8099/Courses/getFormationByFormateur/"+this.route.snapshot.params['idFormer'];
    this.getformation();
    // (FieldValidator.prototype as any).errorPlacement = this.dataService.errorPlacement;
  }
  public listFormation : Formation[]=[];
  public listFormateur : User[]=[];



  public instance: Internationalization = new Internationalization();
  public getDateHeaderText: Function = (value: Date): string => this.instance.formatDate(value, { skeleton: 'MMMEd' }).toUpperCase();

  event :[];

  public  field : {[key : string]:any};

  public fields: Object = { text: 'domain', value: 'id' };
  // set the placeholder to DropDownList input element
  public waterMark: string = 'Select a game';
  // set the value to select an item based on mapped value at initial rendering
  public value: string = 'Game3';

  title : string ="Calendar Courses ";

  public currentView: string='Month';

  public formateur :User;

  eventObject : EventSettingsModel;

  calendarOptions: CalendarOptions;

  handleDateClick(arg: { dateStr: string; }) {
    alert('date click! ' + arg.dateStr);
  }
  currentUser: any = [];
  id : number =this.currentUser.id;

  ngOnInit(): void {


    this.id = this.currentUser.id;


    this.getformation();


    this.getdata();








    if (this.specialistObj) {
      this.specialistObj.hide();
    }
    if (Browser.isDevice && this.dropdownObj) {
      this.toastWidth = '300px';
      addClass([this.dropdownObj.element], 'e-specialist-hide');
    }




  }

  formData : any;
  addFormateur()
  {

    this.serviceForm.register(this.formData).subscribe(data=>console.log(data));
  }
  getAllFormateur()
  {
    this.serviceForm.getFormateur().subscribe((data:User[])=>{this.listFormateur = data});
  }

  UpdateFormation(f: Formation)
  {
    this.serviceForm.updateFormation(f,this.formation.id).subscribe(
      data=>{
        this.getformation();
        this.getdata();
      });
    this.snackbar.open(' Produit mise á jours avec succées', 'Undo', {
      duration: 2000
    });
  }

  getFormateur()
  {
    this.serviceForm.getFormateur().subscribe(
      data=> {
        this.listFormateur = data
      }
    );
    return this.listFormateur;
  }




  getdata()
  {

    setTimeout( () =>
    {




      this.eventObject = {
        dataSource :this.listFormation,
        fields : {
          subject : {name : 'title',default : " Event "},
          startTime : {name : 'start'},
          endTime : {name : 'end'}
        }
      };



/*

*/
    },500)





  }


  dataId(form : Formation)
  {
    this.idF = form.id;
    this.formation = form;
  }




  deleteFormation(i :string)
  {
    this.serviceForm.deleteFormation(i)
      .subscribe(response => {
        this.listFormation = this.listFormation.filter(item => item.id !== i);
        this.getformation();
        this.getdata();
      });
    this.snackbar.open(' delete successfully', 'Undo', {
      duration: 2000
    });
  }





  public waitingList : {[key : string]:Object}[]= [

    {
      Id:1,
      Name: 'Steven'
    }

  ];





  /*
    onDragStart(args : DragEventArgs ):void
    {
      args.interval = 1;

      args.navigation?.enable
    }

   */

  public onItemDrag(event: any): void {
    if (this.scheduleObj.isAdaptive) {
      const classElement: HTMLElement | null = this.scheduleObj.element.querySelector('.e-device-hover');
      if (classElement) {
        classElement.classList.remove('e-device-hover');
      }
      if (event.target.classList.contains('e-work-cells')) {
        addClass([event.target], 'e-device-hover');
      }
    }
    if (document.body.style.cursor === 'not-allowed') {
      document.body.style.cursor = '';
    }
    if (event.name === 'nodeDragging') {
      const tooltipElement: NodeListOf<HTMLElement> = document.querySelectorAll('.e-drag-item.e-treeview');
      let status: boolean;
      tooltipElement.forEach((node: HTMLElement) => {
        node.style.display = 'block';
        // status  =  document.querySelector('body').offsetWidth <= node.offsetLeft + node.offsetWidth ;
      });
      const targetEle: Element = closest(event.target, '.droppable');
      if (!targetEle ) {
        tooltipElement.forEach((node: HTMLElement) => node.style.display = 'none');
        event.cancel = true;
        return;
      }
      const dragElementIcon: NodeListOf<HTMLElement> = document.querySelectorAll('.e-drag-item.treeview-external-drag .e-icon-expandable');
      dragElementIcon.forEach((node: HTMLElement) => node.style.display = 'none');
    }
  }


  onTreeDragStartStop(args : DragAndDropEventArgs ):void
  {
    const cellData : CellClickEventArgs = this.scheduleInstance.getCellDetails(args.target);

    let eventData : { [key :string]:Object } ={
      Subject: args.draggedNodeData.text,
      StartTime : cellData.startTime,
      EndTime : cellData.endTime,
      IsAllDay : cellData.isAllDay
    };

    this.scheduleInstance.addEvent(eventData);

    console.log(eventData);
  }

  /*  onResizStart(args : ResizeEventArgs):void{
      args.interval = 1 ;

    }

   */




  public eventData : DataManager = new DataManager(
    {
      url : 'https://js.syncfusion.com/demos/ejservices/api/Schedule/LoadData',
      adaptor: new WebApiAdaptor,
      crossDomain : true
    }
  );


  // setViews: View[] = ["Day","Month","Agenda","TimelineMonth","TimelineDay","TimelineWeek"];
  // public setView :View = "Month";
  public selectedDate : Date = new Date();
  public timeScale: TimeScaleModel = { enable: true, interval: 60 };

  StartTime: Date = new Date(2022, 3, 1, 10, 0);
  EndTime: Date = new Date(2018, 1, 7, 11, 0);



  getformation(){

    this.serviceForm.getFormationByFormateur(this.idFormateur).subscribe(
      (data)=>{this.listFormation = data});
    return this.listFormation;
  }


  Data: Record<string, any>[] = [
    {
      Id: 1000,
      Name: 'Milka',
      Subject : 'Test',
      StartTime: new Date(2022, 7, 5, 10, 30),
      EndTime: new Date(2022, 7, 5, 11, 30),
      Disease: 'Bone Fracture',
      DepartmentName: 'ORTHOPEDICS',
      DepartmentId: 4,
      DoctorId: 5,
      PatientId: 2,
      Symptoms: 'Swelling or bruising over a bone, Pain in the injured area'
    }];









  public onMultiSelectOpen(args: any): void {
    args.popup.element.querySelector('.add-doctor').onclick = this.onAddClick.bind(this);
  }

  public onAddClick(): void {
    this.addEditDoctorObj.onAddDoctor();
  }

  public onSpecialistSelect(args: Record<string, any>): void {
    const target: HTMLElement = closest(args.target, '.specialist-item') as HTMLElement;
    // const deptId: string = target.getAttribute('data-deptid');
    // const doctorId: string = target.getAttribute('data-doctorid');
    //  this.refreshDataSource(deptId, doctorId);
    //  const doctorImage: HTMLElement = this.scheduleObj.element.querySelector('.doctor-icon .active-doctor');
    //   doctorImage.setAttribute('src', './assets/images/' + this.activeDoctorData[0].Text + '.png');
    this.specialistObj.hide();
  }

  getFormateurByFormation()
  {
    this.serviceForm.getFormateurbyFormation(this.formateur.id).subscribe(
      (data:User)=>{this.formateur = data}
    );
    return this.formateur;
  }

  onActionBegin($event: any) {

  }

  public onPopupOpen(args: PopupOpenEventArgs): void {
  }

  public createNewEvent(e: MouseEvent): void {
    /* const args = e as CellClickEventArgs & MouseEvent;
     let data: CellClickEventArgs;
     const isSameTime: boolean =
       this.scheduleObj.activeCellsData.startTime.getTime() === this.scheduleObj.activeCellsData.endTime.getTime();
     if (this.scheduleObj.activeCellsData && !isSameTime) {
       data = this.scheduleObj.activeCellsData;
     } else {
       const interval: number = this.scheduleObj.activeViewOptions.timeScale.interval;
       const slotCount: number = this.scheduleObj.activeViewOptions.timeScale.slotCount;
       const msInterval: number = (interval * 60000) / slotCount;
       const startTime: Date = new Date(this.scheduleObj.selectedDate.getTime());
       startTime.setHours(new Date().getHours(), Math.round(startTime.getMinutes() / msInterval) * msInterval, 0);
       const endTime: Date = new Date(new Date(startTime.getTime()).setMilliseconds(startTime.getMilliseconds() + msInterval));
       data = { startTime, endTime, isAllDay: false };
     }
     this.scheduleObj.openEditor(extend(data, { cancel: false, event: args.event }), 'Add');

     */
  }



  public onNavigation(args: NavigatingEventArgs): void {
    this.currentDate = args.currentDate || this.selectedDate;
    if (this.listFormation.length > 0) {
      //this.updateBreakHours(this.currentDate);
      // this.eventData = this.generateEvents(this.activeDoctorData[0]);
      // this.scheduleObj.eventSettings.dataSource = this.eventData;
      //this.updateWaitingList(this.activeDoctorData[0].DepartmentId);
    } else {
      // this.updateWaitingList();
    }
  }

  public onEventRendered(args: Record<string, any>): void {
    if (args.element.classList.contains('e-appointment')) {
      const data: Record<string, any> = args.data as Record<string, any>;
      const eventStart = data.StartTime as Date;
      const eventEnd = data.EndTime as Date;
      let eventCollection = this.scheduleObj.blockProcessed;
      eventCollection = this.scheduleObj.eventBase.filterEvents(eventStart, eventEnd, eventCollection);
      if (eventCollection.length > 0) {
        args.cancel = true;
        return;
      }
      args.element.style.color = '#fff';
    }
  }


  public setDefaultData(): void {

    this.scheduleObj.eventSettings.dataSource = this.eventData;
    this.scheduleObj.refreshEvents();
    this.startHour = this.calendarSettings.calendar.start as string;
    this.endHour = this.calendarSettings.calendar.end as string;
    this.workDays = [0, 1, 2, 3, 4, 5, 6];
    this.workHours = { start: '08:00', end: '21:00' };
    this.scheduleObj.workHours = this.workHours;
  }

  public getEventDetails(data : Formation): string {

    return (this.instance.formatDate(new Date(data.start), { type: 'date', skeleton: 'long' }) +
      '(' + this.getString(new Date(data.start), 'hm') + '-' + this.getString(new Date(data.end), 'hm') + ')');

  }

  public getString(value: Date, type: string): string {
    return this.instance.formatDate(new Date(value), { type: 'dateTime', skeleton: type });
  }

  public specializationData: Record<string, any>[] = [
    { domain: "IT",Text: 'IT', Color: '#F538B2' },
    { domain: "ART",  Text: 'ART', Color: '#33C7E8' },
    { domain: "CINEMA", Text: 'CINEMA', Color: '#916DE4' },
    { domain: "MUSIC",  Text: 'MUSIC', Color: '#388CF5' },
    { domain: "DANCE",  Text: 'DANCE', Color: '#60F238' },
    { domain: "PHY", Text: 'PHY', Color: '#F29438' }
  ];

  public resource : Object[] = [

    { domain: "DEVELOPMENT", Text: 'DEVELOPMENT', Color: '#F538B2' },
    { domain: "BUSINESS", Text: 'BUSINESS', Color: '#33C7E8' },
    { domain: "FINANCE&ACCOUNTING", Text: 'FINANCE&ACCOUNTING', Color: '#916DE4' },
    { domain: "IT&SOFTWARE", Text: 'IT&SOFTWARE', Color: '#388CF5' },
    { domain: "OFFICEPRODUCTIVITY", Text: 'OFFICEPRODUCTIVITY', Color: '#60F238' },
    { domain: "PERSONALDEVELOPMENT", Text: 'PERSONALDEVELOPMENT', Color: '#f21526' },
    { domain: "DESIGN", Text: 'DESIGN', Color: '#a7a7a7' },
    { domain: "MARKETING", Text: 'MARKETING', Color: '#4adede' },
    { domain: "LIFESTYLE", Text: 'LIFESTYLE', Color: '#319413' },
    { domain: "PHOTOGRAPHY&VIDEO", Text: 'PHOTOGRAPHY&VIDEO', Color: '#9a141a' },
    { domain: "HEALTH&FITNESS", Text: 'HEALTH&FITNESS', Color: '#3a76d3' },
    { domain: "MUSIC", Text: 'MUSIC', Color: '#ffd923' },
    { domain: "TEACHING&ACADEMICS", Text: 'TEACHING&ACADEMICS', Color: '#f27f13' },
  ];


  getBackGroundColor(data : Formation) {
    let color: string;
    if(data.domain === "DEVELOPMENT")
    {
      color = '#F538B2';
    }else if(data.domain == "BUSINESS") {
      color = '#33C7E8';
    }
    else if(data.domain == "FINANCE&ACCOUNTING") {
      color = '#916DE4';
    }
    else if(data.domain == "IT&SOFTWARE") {
      color = '#388CF5';
    }
    else if(data.domain == "OFFICEPRODUCTIVITY") {
      color = '#60F238';
    }
    else if(data.domain == "PERSONALDEVELOPMENT") {
      color = '#f21526';
    }
    else if(data.domain == "DESIGN") {
      color = '#a7a7a7';
    }else if(data.domain == "LIFESTYLE") {
      color = '#319413';
    }
    else if(data.domain == "PHOTOGRAPHY&VIDEO") {
      color = '#9a141a';
    }
    else if(data.domain == "HEALTH&FITNESS") {
      color = '#3a76d3';
    }
    else if(data.domain == "MUSIC") {
      color = '#ffc03c';
    }
    else if(data.domain == "TEACHING&ACADEMICS") {
      color = '#f27f13';
    }
    else if(data.domain == "MARKETING") {
      color = '#4adede';
    }
    else
    {
      color = '#ffc9da';
    }



    return { 'background-color': color, color: '#FFFFFF' };
  }
  public onItemChecked(args: ChangeEventArgs): void {
    /* const waitItemId: string = closest(args.event.currentTarget as HTMLElement, '.e-checkbox-wrapper').id;
     this.selectedWaitingItem.push(this.waitingList.filter((item: Record<string, any>) => item.Id === parseInt(waitItemId, 10))[0]);*/
  }

  public onItemAdd(): void {
    /* if (this.selectedWaitingItem.length > 0) {
       this.selectedWaitingItem.forEach((activeItem: Record<string, any>) => {
         const eventFilter: Record<string, any>[] = this.eventData.filter((event: Record<string, any>) => event.Id === activeItem.Id);
         if (eventFilter.length === 0) {
           const doctorData: Record<string, any>[] = this.activeDoctorData.length > 0 ?
             this.activeDoctorData.filter((data: Record<string, any>) => data.DepartmentId === activeItem.DepartmentId) : [];
           const isActiveDepartment: boolean = doctorData.length > 0;
           if (isActiveDepartment) {
             activeItem.DoctorId = doctorData[0].Id;
           } else {
             const filteredData: Record<string, any>[] = this.doctorsData.filter((data: Record<string, any>) =>
               data.DepartmentId === activeItem.DepartmentId);
             activeItem.DoctorId = filteredData[0].Id;
           }
           this.eventData.push(activeItem);
           this.refreshWaitingItems(activeItem.Id as number);
           if (this.activeDoctorData.length > 0) {
             this.hospitalData.push(activeItem);
           }
           this.dataService.addHospitalData(this.hospitalData);
         }
       });
       this.selectedWaitingItem = [];
       this.waitingObj.hide();
       this.scheduleObj.eventSettings.dataSource = this.eventData;
       this.scheduleObj.refreshEvents();
     } else {
       this.toastContent = 'Please select the waiting item to add';
       this.toastObj.show();
     }
     if (this.activeDoctorData.length > 0) {
       this.updateWaitingList(this.activeDoctorData[0].DepartmentId);
     } else {
       this.updateWaitingList();
     }*/
  }

  getApprenantByFormation(id:string)
  {
    this.serviceForm.getApprenantByFormation(id).subscribe(data => this.ListApprenant = data);
    return  this.ListApprenant;
  }
  public selectedDepartmentId: string;

  public onSpecializationChange(args?: Record<string, any>): void {
    let filteredData: Record<string, any>[];
    if (args && args.value) {
      this.selectedDepartmentId = args ? args.itemData.id : this.selectedDepartmentId;
      // filteredData = this.listFormation.filter((item: any) => item.apprenant.idFormation === this.selectedDepartmentId);
      filteredData = this.getApprenantByFormation(this.selectedDepartmentId);
      // filteredData = this.formateur;
    } else {
      this.selectedDepartmentId = '';
      filteredData = [];
    }
    this.ListApprenant = filteredData;

    this.field = {
      dataSource : this.ListApprenant,id:'id',text : 'lastName'
    };
  }
}
