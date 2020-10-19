import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  

  constructor(public http: HttpClient) { }

  obtenerCliente(headers: any, id: string){
    return this.http.get(`/clientes/${id}`, headers);
  }
}
