import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../../core/model/User";
import {DialogComponent} from "@syncfusion/ej2-angular-popups";
import {AddEditFormerComponent} from "../add-edit-former/add-edit-former.component";
import {FormationService} from "../services/formation.service";


@Component({
  selector: 'app-courses-form',
  templateUrl: './courses-form.component.html',
  styleUrls: ['./courses-form.component.scss']
})
export class CoursesFormComponent implements OnInit {

  @ViewChild('addEditFormerObj') addEditFomerObj: AddEditFormerComponent;
  @ViewChild('breakHourObj') breakHourObj: DialogComponent;
  @ViewChild('deleteConfirmationDialogObj') deleteConfirmationDialogObj: DialogComponent;


  public selectedDepartmentId: string;

  public specializationData: Record<string, any>[];

  public  field : {[key : string]:any};

  public  listNew : {[key : string]:any};

  public fields: Record<string, any> = { text: 'Text', value: 'Id' };


  public formateur: Record<string, any>[];

  public listFormateur: Record<string, any>[];


  constructor(private serviceForm : FormationService) {

   this.getdata();

   this.specializationData = [
      { DepartmentId: 1, Id: '', Text: 'ALL', Color: '#516275' },
      { DepartmentId: 2, Id: 'DEVELOPMENT', Text: 'DEVELOPMENT', Color: '#F538B2' },
      { DepartmentId: 3, Id: 'BUSINESS', Text: 'BUSINESS', Color: '#33C7E8' },
      { DepartmentId: 4, Id: 'FINANCE&ACCOUNTING', Text: 'FINANCE&ACCOUNTING', Color: '#916DE4' },
      { DepartmentId: 5, Id: 'IT&SOFTWARE', Text: 'IT&SOFTWARE', Color: '#388CF5' },
      { DepartmentId: 6, Id: 'OFFICEPRODUCTIVITY', Text: 'OFFICEPRODUCTIVITY', Color: '#60F238' },
      { DepartmentId: 7, Id: 'PERSONALDEVELOPMENT', Text: 'PERSONALDEVELOPMENT', Color: '#F29438' },
      { DepartmentId: 8, Id: 'DESIGN', Text: 'DESIGN', Color: '#ca242c' },
      { DepartmentId: 8, Id: 'MARKETING', Text: 'MARKETING', Color: '#a7a7a7' },
      { DepartmentId: 8, Id: 'LIFESTYLE', Text: 'LIFESTYLE', Color: '#f2e736' },
      { DepartmentId: 8, Id: 'PHOTOGRAPHY&VIDEO', Text: 'PHOTOGRAPHY&VIDEO', Color: '#2e5aa7' },
      { DepartmentId: 8, Id: 'HEALTH&FITNESS', Text: 'HEALTH&FITNESS', Color: '#19001b' },
      { DepartmentId: 8, Id: 'MUSIC', Text: 'MUSIC', Color: '#f7f7f7' },
      { DepartmentId: 8, Id: 'TEACHING&ACADEMICS', Text: 'TEACHING&ACADEMICS', Color: '#eeccf2' }

    ];


  }

  public onSpecializationChange(args?: Record<string, any>): void {
    let filteredData: Record<string, any>[];
    if (args && args.value) {
      this.selectedDepartmentId = args ? args.itemData.Id : this.selectedDepartmentId;
      filteredData = this.formateur.filter((item: any) => item.profession === this.selectedDepartmentId);
     // filteredData = this.formateur;
    } else {
      this.selectedDepartmentId = '';
      filteredData = this.formateur;
    }
    this.listFormateur = filteredData;
  }

  public activeData: User;
  public formerId: number;
  ngOnInit(): void {

    this.getFormateur();
   // this.dataService.updateActiveItem('doctors');
  //  this.route.params.subscribe((params: any) => this.doctorId = parseInt(params.id, 10));
  //  this.doctorData = this.dataService.getDoctorsData();
   // this.activeData = this.formateur.filter(item => item.id === this.formerId)[0];
    const isDataDiffer: boolean = JSON.stringify(this.activeData) === JSON.stringify(this.formateur);
    if (!isDataDiffer) {
      this.formateur.push(this.activeData);
    }
   // this.breakDays = JSON.parse(JSON.stringify(this.activeData.WorkDays));

  //  this.listFormateur.push(this.formateur[1]);

  }

  public getEducation(text: string): string {
    return text.toUpperCase();
  }

  public getColor(args: Record<string, string>): string {
    return args.Color;
  }

  getdata()
  {

    let xx = new XMLHttpRequest();

    xx.onreadystatechange = ()=>
    {
      this.formateur = JSON.parse(xx.responseText)
    };

    xx.open('get','http://localhost:4000/api/user/getFormer',true);


    xx.send(null);


    setTimeout( () =>
    {

      this.field = {
        dataSource : this.formateur,value:'id',text : 'nom'
      };

    },700)





  }


  public  onAddDoctor(): void {
    this.addEditFomerObj.onAddDoctor();
  }

  onDomainClick($event: MouseEvent) {

  }





  getFormateur()
  {
    this.serviceForm.getFormateur().subscribe(
      (data: User[]) => {this.formateur = data;
       });
    return this.formateur;
  }


  getF()
  {
    this.formateur = this.getFormateur();
    if (this.selectedDepartmentId) {
      this.listFormateur = this.formateur.filter((item: any) => item.profession === this.selectedDepartmentId);
    }
  }
}
