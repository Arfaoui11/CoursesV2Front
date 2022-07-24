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

  currentUser: any = [];

  userName = '';
  message = '';
  messageList: {message: string, userName: string, mine: boolean}[] = [];
  userList: string[] = [];
  socket: any;


  heurs : Date = new Date();
  daysa : Date = new Date();
  id: string;
  constructor(private serviceForm : FormationService,private token: TokenService) {
    this.currentUser = this.token.getUser();



  }



  ngOnInit(): void {
this.chatApp();
  }

  chatApp(): void {
    this.socket = io.io(`localhost:4000?userName=${this.currentUser.lastName}`);
    this.userName = this.currentUser.lastName;

    this.socket.emit('set-user-name', this.currentUser.lastName);

    this.socket.on('user-list', (userList: string[]) => {
      this.userList = userList;
    });

    this.socket.on('message-broadcast', (data: {message: string, userName: string}) => {
      if (data) {
        this.messageList.push({message: data.message, userName: data.userName, mine: false});
      }
    });
  }

  sendMessage(): void {
    let msg = this.message;
    if (msg == '' || msg == undefined) return;

    this.socket.emit('message', msg);
    this.messageList.push({message: msg, userName: this.userName, mine: true});
    this.message = '';
  }


  initUserList() {
    this.serviceForm.listUserByCourses('').subscribe(response => {
      this.users = response;

    });
  }


}
