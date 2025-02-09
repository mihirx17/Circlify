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
  messages: string[] = []; // Array to store chat messages
  messageText: string = ''; // Variable to bind to the input field
  isChatOpen: boolean = false; // Boolean to track chat window state

  constructor(private chatService: ChatService) {} // Inject ChatService

  ngOnInit() {
    // Subscribe to receive messages from the chat service
    this.chatService.receiveMessage().subscribe((message: string) => {
      this.messages.push(message); // Add received message to messages array
    });
  }

  toggleChat() {
    // Toggle the chat window open/close state
    this.isChatOpen = !this.isChatOpen;
  }

  sendMessage() {
    // Send the message if the input is not empty
    if (this.messageText.trim()) {
      this.chatService.sendMessage(this.messageText); // Send message via ChatService
      this.messageText = ''; // Clear the input field
    }
  }
}
