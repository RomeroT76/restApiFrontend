import { Component } from '@angular/core';
import { Client } from '../../domain/Client';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent {
  clients: any[] = [];
  cli?: Client;
  name: string = '';
  direction: string = '';
  id: string = '';

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getClients();

  }

  getClients() {
    this.clients = [];
    this.api.getClients().subscribe(data => {
      data.map((c: any) => {
        this.cli = c;
        this.clients.push(this.cli)
      });
    });
  }

  createClient() {
    if (this.id != '' && this.direction != '' && this.name != '') {
      const data = {
        cedula: this.id,
        direccion: this.direction,
        nombre: this.name
      }
      this.api.createClient(data).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });;
      this.id = '';
      this.direction = '';
      this.name = '';
    } else {
      alert("Todos los campos son obligatorios")
    }
    this.ngOnInit();
  }

  deleteClient(cedula: any) {
    this.api.deleteClient(cedula)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (e) => console.error(e)
      });
    this.ngOnInit();
  }

  updateClient() {
    console.log("f");
    
    const data = {
      cedula: this.id,
      direccion: this.direction,
      nombre: this.name
    }
    this.api.updateClient(data).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => console.error(e)
    });;
    this.id = '';
    this.direction = '';
    this.name = '';
    this.ngOnInit();
  }

  getValues(c: any, d: any, n: any) {
    this.id = c;
    this.direction = d;
    this.name = n;
  }
}
