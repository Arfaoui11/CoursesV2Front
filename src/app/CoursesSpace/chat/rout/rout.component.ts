import {Component, OnInit} from '@angular/core';
import {HostListener}     from '@angular/core';
import {Message} from "../../../core/model/Message";
import {AppdataService} from "../../services/appdata.service";
import {WebsocketService} from "../../services/websocket.service";
import {User} from "../../../core/model/User";
import {AppService} from "../../services/app.service";
import {TokenService} from "../../services/token.service";
import * as io from "socket.io-client";
import {FormationService} from "../../services/formation.service";

@Component({
  selector: 'app-rout',
  templateUrl: './rout.component.html',
  styleUrls: ['./rout.component.scss']
})
export class RoutComponent implements OnInit {

  users: User[] = new Array();

  public user: User = new User();

  currentUser: any = [];

  userName = '';
  image = '';
  message = '';
  messageList: {message: string, userName: string,image : string, mine: boolean}[] = [];
  userList: any[] = [];
  socket: any;


  heurs : Date = new Date();
  daysa : Date = new Date();
  id: string;
   public keyName: string;


   constructor(private serviceForm : FormationService,private token: TokenService) {
    this.currentUser = this.token.getUser();



  }



  ngOnInit(): void {
this.chatApp();

    this.userDetails();
  }

  chatApp(): void {
    this.socket = io.io(`localhost:4000?userName=${this.currentUser.lastName+'&image='+ this.currentUser.file}`);
    this.userName = this.currentUser.lastName+','+ this.currentUser.file;
    this.image = this.currentUser.file;

    this.socket.emit('set-user-name', this.userName);

    this.socket.on('user-list', (userList: string[]) => {
      this.userList = userList;
    });

    this.socket.on('message-broadcast', (data: {message: string, userName: string,image : string}) => {
      if (data) {
        this.messageList.push({message: data.message, userName: data.userName ,image : data.image, mine: false});
      }
    });
  }

  sendMessage(): void {
    let msg = this.message;
    if (msg == '' || msg == undefined) return;

    this.socket.emit('message', msg);
    this.messageList.push({message: msg, userName: this.userName,image : this.image, mine: true});
    this.message = '';
  }

  userDetails()
  {
    return  this.serviceForm.getUserById(this.currentUser.id).subscribe(
      (data : User) => {this.user = data;

      });
  }


  initUserList() {
    this.serviceForm.listUserByCourses('').subscribe(response => {
      this.users = response;

    });
  }


  Search() {
    console.log(this.keyName);
    this.userList = this.userList.filter(l => l.split(',')[0].toLowerCase().toString().startsWith(this.keyName));
    console.log(this.userList);
  }
}
