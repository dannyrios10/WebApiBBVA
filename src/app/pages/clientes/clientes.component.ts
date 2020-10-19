import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesService } from '../../services/clientes.service';
import { Cliente } from '../../interfaces/cliente.interface';
import { Usuario } from '../../interfaces/usuario.interface';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  token = localStorage.getItem('token');

  clientes: Cliente[];
  usuario: Usuario;
  campos: string;

  cargando = true;

  get headers(){
    return{
      headers: {
        'token': this.token
      }
    }
  }

  public formSubmitted = false;


  public clienteForm = this.fb.group({
    search: ['', [Validators.required, Validators.minLength(4)]],
  });

  constructor(private ngZone: NgZone,
              private fb: FormBuilder,
              private router: Router,
              private clientesService: ClientesService) {
                this.obtenerUsuario();
               }

  ngOnInit(): void {
  }

  buscarCliente(){

    this.formSubmitted = true;

    const parametro = this.clienteForm.value.search;
    if(this.clienteForm.valid){
      this.cargando = true;
      this.obtenerClientes(parametro);
    }
  }

  campoNoValido(campo:string){
    if(this.clienteForm.get(campo).invalid && this.formSubmitted){
      return true;
    }else{
      return false;
    }
  }

  logout(){

    localStorage.removeItem('token');

    this.ngZone.run(() =>{
      this.router.navigateByUrl('/login');
    });

  }

  obtenerClientes(parametro: string){
    this.clientesService.obtenerCliente(this.headers, parametro).subscribe((resp: any) =>{
      this.clientes = resp.cliente;
      this.usuario = resp.usuario;
      this.campos = resp.camposVacios;
      this.cargando = false;
    }, (err) =>{
      console.log(err);
       Swal.fire('', err.error.msg, 'info');
       this.cargando = false;
       this.clientes=[];
    })
  }

  obtenerUsuario(){
    this.clientesService.obtenerCliente(this.headers, '2070').subscribe((resp: any) =>{
      this.usuario = resp.usuario;
      this.cargando = false;
    }, (err) =>{
      console.log(err);
       Swal.fire('', err.error.msg, 'info');
    })
  }

}
