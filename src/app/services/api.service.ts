import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../domain/Client';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getClients() {
    return this.http.get<Client[]>('http://localhost:8080/demojakarta/rs/clientes');
  }

  createClient(data: any) {
    return this.http.post('http://localhost:8080/demojakarta/rs/clientes', data);
  }

  deleteClient(id: any) {
    return this.http.delete(`http://localhost:8080/demojakarta/rs/clientes?id=${id}`);
  }

  updateClient(data: any) {
    return this.http.put('http://localhost:8080/demojakarta/rs/clientes', data);
  } 
}
