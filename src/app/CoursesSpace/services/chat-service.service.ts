import { Injectable } from '@angular/core';
import {io} from "socket.io-client";



@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
private socket = io('http://localhost:4000/');

  constructor() { }
}
