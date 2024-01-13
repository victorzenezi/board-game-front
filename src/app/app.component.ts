import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  private socket?: WebSocket;
  public title: string = 'Connecting...';
  public msg: string = "";

  ngOnInit() {
    this.socket = new WebSocket('wss://localhost:44385/board2');

    this.socket.addEventListener('open', (event) => {
      this.title = 'Connected to WebSocket!';
    });

    this.socket.addEventListener('message', (event) => {
      this.msg = event.data;

      if (event.data == "move")
      {
        const jg = document.getElementById('jg')!;
        const valorAtualRight = jg.style.right;
        const valorNumericoAtual = parseFloat(valorAtualRight.replace('px', '')) || 0;
        const novoValor = valorNumericoAtual + 10;
        jg.style.right = `${novoValor}px`;
      }
      
    });

    this.socket.addEventListener('close', (event) => {
      this.title = 'WebSocket connection closed.';
    });

    this.socket.addEventListener('error', (event) => {
      this.title = 'WebSocket error occurred.';
    });
  }

  send() {
    this.socket?.send("roll");
  }
}
