import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {PostComment} from "../../core/model/PostComment";
import {Formation} from "../../core/model/Formation";
import {User} from "../../core/model/User";
import {FormationService} from "../services/formation.service";
import {DomSanitizer} from "@angular/platform-browser";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {TokenService} from "../services/token.service";
import {Result} from "../../core/model/Result";
import {Certificate} from "../../core/model/Certificate";

@Component({
  selector: 'app-portfelio-form-details',
  templateUrl: './portfelio-form-details.component.html',
  styleUrls: ['./portfelio-form-details.component.scss']
})
export class PortfelioFormDetailsComponent implements OnInit {

  public comment: Record<string, any>[];

  public listComment: Record<string, any>[];

  @Input() post : PostComment = new PostComment;
  @ViewChild('thenfirst', {static: true}) thenfirst: TemplateRef<any>|null = null;
  @ViewChild('thenSec', {static: true}) thenSec: TemplateRef<any>|null = null;


  rating: number;
  retrieveResonse : any;
  activeIndex = 0;
  index : number =0;

  dataa :any;
  showC : boolean = false;
  videoUrl: any;
  public idFormation :string;
  toggle: boolean = false;
  formation : Formation;
  currentUser: any = [];
  public formateur :User;
  public retrieveFiles: any[]=[];
  public retrieveVideo: any[]=[];
  public retrieveImage: any[]=[];
  public listFormation: Formation;
  public certificate: Certificate;


  constructor(private serviceForm : FormationService,private sanitizer : DomSanitizer,private snackbar:MatSnackBar ,private http: HttpClient, private route:ActivatedRoute,private token: TokenService) {
    this.currentUser = this.token.getUser();
  }

  ngOnInit(): void {

    this.idFormation = this.route.snapshot.params['idCourses'];
    console.log(this.idFormation);
    this.getFormation();





    setTimeout( () => {


      this.getCertifcateByCoursesAndUser();


    },1000);

    this.serviceForm.getFormationById(this.idFormation)
      .subscribe(
        data=> {

          this.listFormation =data;

          for (let l of this.listFormation.images)
          {


            if(l.toString().includes('mp4') || l.toString().includes('mkv') || l.toString().includes('wmv'))
            {
              this.retrieveVideo.push(l)  ;

            }else if(l.toString().includes('word') || l.toString().includes('pdf'))
            {
              this.retrieveFiles.push(l);
            }
            else if (l.toString().includes('jpg') || l.toString().includes('png') || l.toString().includes('jpeg'))
            {
              this.retrieveImage.push(l) ;
            }


          }
          this.pathUrl = 'http://localhost:4000/api/video/'+ this.retrieveVideo[this.index].slice(37);
        }
      );


  }

  getFormation()
  {
    this.serviceForm.getFormationById(this.idFormation).subscribe(data => {
      this.formation = data;
    });
    return this.formation;
  }


  playvideo( s :string) {
    this.serviceForm.DownloadFile(s).subscribe(
      x=>
      {
        const blob = new Blob([x],{type : 'video/mp4'});

        if(window.navigator && window.navigator.msSaveOrOpenBlob)
        {
          window.navigator.msSaveOrOpenBlob(blob);
          return;
        }

        const data = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = data;


        link.dispatchEvent( new MouseEvent('click',{bubbles:true,cancelable:true,view:window}))

        setTimeout(function () {
          window.URL.revokeObjectURL(data);
          link.remove();
        },1000)

      }
    )

  }

  downloadFiles( s :string) {
    this.serviceForm.DownloadFile(s).subscribe(
      data => window.navigator.msSaveOrOpenBlob(data),
           error => console.log(error)
    )

  }
  videoPlayerInit(data:any) {
    this.dataa = data;

    this.dataa.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.initVdo.bind(this));
    this.dataa.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
  }
  initVdo() {
    this.dataa.pause();
  }

  nextVideo() {
    this.index++;

    if (this.index === this.retrieveResonse.length) {
      this.activeIndex = 0;
    }

    this.retrieveVideo = this.retrieveVideo[this.index];
  }

  public pathUrl : string ;
  sendIndex($index: number ,path : string) {
    this.index =$index;
    this.retrieveFiles[this.index];
    this.retrieveVideo[this.index];



    this.pathUrl = 'http://localhost:4000/api/video/'+ path.slice(37);


   /* this.serviceForm.getVideo(path.slice(37)).subscribe( data => {
      this.pathUrl = data;
    });

    */

  }

  goToChatRoom(idFormation: string) {
    window.location.href = '#/chatRoom/'+idFormation;
  }


  getCertifcateByCoursesAndUser()
  {
    this.serviceForm.getCertifcateByCoursesAndUser(this.idFormation,this.currentUser.id).subscribe((data:Certificate) =>{
      this.certificate = data;
    })
  }
}
