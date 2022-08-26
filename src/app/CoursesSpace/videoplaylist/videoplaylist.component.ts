import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {FormationService} from "../services/formation.service";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {Formation} from "../../core/model/Formation";
import {User} from "../../core/model/User";
import {PostComment} from "../../core/model/PostComment";
import {TokenService} from "../services/token.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Rating} from "../../core/model/Rating";

@Component({
  selector: 'app-videoplaylist',
  templateUrl: './videoplaylist.component.html',
  styleUrls: ['./videoplaylist.component.scss']
})
export class VideoplaylistComponent implements OnInit {

  @ViewChild('thenfirst', {static: true}) thenfirst: TemplateRef<any>|null = null;
  @ViewChild('thenSec', {static: true}) thenSec: TemplateRef<any>|null = null;

  public filePath :FileList;

  public comment: Record<string, any>[];

  public listComment: Record<string, any>[];

  @Input() post : PostComment = new PostComment;
  @Input() rat : Rating = new Rating();
  rating: number;
  retrieveResonse : any;

  public retrieveFiles: any[]=[];
  public retrieveVideo: any[]=[];
  public retrieveImage: any[]=[];

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

  public pathUrl : string ;

  public listFormation: Formation;
  PathURL: any;
  public List: Formation[];

  constructor(private serviceForm : FormationService,private sanitizer : DomSanitizer,private snackbar:MatSnackBar ,private http: HttpClient, private route:ActivatedRoute,private token: TokenService) {
    this.currentUser = this.token.getUser();
  }

  ngOnInit(): void {
    this.idFormation = this.route.snapshot.params['idCourses'];


  this.getformationList();


   this.getFormation();

    setTimeout( () => {

      this.getCommentByFormation();

      this.getRatingByFormation();


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




  uploadFile()
  {

    const formData = new FormData();

    for (let i = 0 ;i<this.filePath.length ; i++)
    {
      const element  =  this.filePath[i];

      formData.append('files',element);
    }


    this.serviceForm.uploadFile(formData,this.idFormation).subscribe(res => {
      console.log(res)
    });

    this.snackbar.open(' files add with succees', 'Undo', {
      duration: 2000
    });

  }

  getFormation()
  {
    this.serviceForm.getFormationById(this.idFormation).subscribe(data => {
      this.formation = data;

    });
    return this.formation;
  }

  onFileSelected(event : any) {

    const file : FileList = event?.target?.files;

    const reader = new FileReader();

    this.filePath = file;

    reader.readAsDataURL(file[0]);
    reader.onload = (_event) => {
      this.PathURL = reader.result;
    };
    const formData = new FormData();

    for (let i = 0 ;i<this.filePath.length ; i++)
    {
      const element  =  this.filePath[i];

      formData.append('images',element);
    }
    this.serviceForm.uploadFile(formData,this.idFormation).subscribe(res => {
      console.log(res);


    });

    this.snackbar.open(' files add with success', 'Undo', {
      duration: 2000
    });

    setTimeout(()=> {    window.location.reload(); },10000);

  }

  deleteFiles(id:string)
  {
    this.serviceForm.deleteFiles(id).subscribe(
      (data) =>{console.log(data);
        this.retrieveVideo = this.retrieveVideo.filter(item => item.id !== id);
       // this.getData();
    } );
    this.snackbar.open(' files delete with success', 'Undo', {
      duration: 2000
    });
    setTimeout(()=> {    window.location.reload(); },5000);

  }









  public status: number;


  sendComments()
  {
    this.serviceForm.writeComment(this.post,this.idFormation,this.currentUser.id).subscribe(
      data=>{
        this.getFormation();
        // this.getCommentByFormation()

      },
      (error => {
        this.snackbar.open(' You are excluded with any comment write 20 days ', 'Undo', {
          duration: 2000
        });
      })
    );
  }

  getCommentByFormation()
  {




    this.serviceForm.getCommentByFormation(this.idFormation).subscribe(
      (data: PostComment[]) => {
        this.comment = data;



      }
    );
    return this.comment;
  }
  public stat : boolean = true;

  LikesComment(id:string)
  {
    let status = true;
    for (let c of this.formation.comments)
    {
      if (c.id == id)
      {
        for (let l of c.likes)
        {

          if(l.user.id == this.currentUser.id)
          {
            status=false;
          }

        }

      }

    }


    if (status) {
      this.serviceForm.addLikes(id, this.currentUser.id).subscribe(data => {
          console.log(data);


          this.getFormation();

        }
      );
    }


  }




  changeRating(){


    this.rat.typeRating = this.rating;


    this.serviceForm.addRatingFormation(this.idFormation,this.currentUser.id,this.rat).subscribe(
      data => {


        setTimeout(()=>
        {
          // this.ratTrue= true;
          this.getRatingByFormation();
          this.getFormation();

        },1000);

      },(err)=> {

        // if (this.ratTrue)
        this.snackbar.open(' You have one rating for this courses ', 'Undo', {
          duration: 2000
        });
      }
    );




  }

  getRatingByFormation()
  {
    this.serviceForm.getRatingFormation(this.idFormation).subscribe(data => { this.rating = data})
  }

  DisLikesComment(id:string)
  {

    let status = true;
    for (let c of this.formation.comments)
    {
      if (c.id == id)
      {
        for (let l of c.dislikes)
        {

          if(l.user.id == this.currentUser.id)
          {
            status=false;
          }

        }

      }

    }
    if (status) {
      this.serviceForm.addDisLikes(id, this.currentUser.id).subscribe(data => {
        this.getFormation();
      });
    }
  }


  getFormateurByFormation(id:string)
  {
    this.serviceForm.getFormateurbyFormation(id).subscribe(
      (data:User)=>{this.formateur = data}
    );
    return this.formateur;
  }

  videoPlayerInit(data:any) {
    this.dataa = data;

    this.dataa.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.initVdo.bind(this));
    this.dataa.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
  }
  initVdo() {
    this.dataa.play();
  }

  nextVideo() {
    this.index++;

    if (this.index === this.retrieveResonse.length) {
      this.activeIndex = 0;
    }

    this.retrieveVideo = this.retrieveVideo[this.index];
  }

  startPlaylistVdo(item :any, index: number) {
    this.activeIndex = index;
    this.videoUrl = item;
  }















  playvideo( s :string) {
    this.serviceForm.DownloadFile(s).subscribe(
      x=>
      {
        const blob = new Blob([x],{type : 'video/mp4'})

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
      x=>
      {
        const blob = new Blob([x],{type : 'video/mp4'})

        if(window.navigator && window.navigator.msSaveOrOpenBlob)
        {
          window.navigator.msSaveOrOpenBlob(blob);
          return;
        }

        const data = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = data;
        link.download = "video.mp4";

        link.dispatchEvent( new MouseEvent('click',{bubbles:true,cancelable:true,view:window}))

        setTimeout(function () {
          window.URL.revokeObjectURL(data);
          link.remove();
        },1000)

      }
    )

  }


  getformationList(){

    this.serviceForm.getFormationByFormateur(this.currentUser.id).subscribe(
      (data)=>{this.List = data});
    return this.listFormation;
  }

  previous() {
    if (this.index === 0) {
      this.index = 0;
    }else {
      this.index--;
    }
    this.retrieveVideo[this.index].play();

  }

  next() {
    if (this.index === this.retrieveImage.length) {
      this.index = 0;
    }else {
      this.index++;
    }
    this.retrieveVideo[this.index].play();
  }
  getF()
  {
    this.serviceForm.getFormationById(this.idFormation).subscribe(data => {
      this.formation = data;
    });
    return this.formation;
  }

  openPdf() {
    this.toggle= !this.toggle;
  }

  showComment() {
    this.showC = ! this.showC;
  }




}
