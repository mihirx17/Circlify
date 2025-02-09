import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for two-way binding
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-home',
  standalone: true, // ✅ Add this if using standalone components
  imports: [CommonModule, FormsModule], // ✅ Ensure FormsModule is imported
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  messages: string[] = [];
  messageText: string = '';
  isChatOpen: boolean = false;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.receiveMessage().subscribe((message: string) => {
      this.messages.push(message);
    });
  }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  sendMessage() {
    if (this.messageText.trim()) {
      this.chatService.sendMessage(this.messageText);
      this.messageText = '';
    }
  }
}
