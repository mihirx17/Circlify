import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket = io('http://localhost:3000'); // Ensure this matches your backend URL

  sendMessage(message: string) {
    this.socket.emit('send-message', message); // Ensure this event name matches the backend
  }

  receiveMessage(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on('message', (message: string) => {
        observer.next(message);
      });

      // Cleanup function to avoid memory leaks
      return () => this.socket.off('message');
    });
  }
}
