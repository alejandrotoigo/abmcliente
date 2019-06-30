import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { Persona } from '../models/persona';
import { UsuarioService } from '../services/usuario.service';
import { ModalPersonaComponent } from './modal-persona/modal-persona.component';
import { FormControl, Form } from '@angular/forms';


@Component({
  selector: 'app-abm-persona',
  templateUrl: './abm-persona.component.html',
  styleUrls: ['./abm-persona.component.scss']
})
export class AbmPersonaComponent implements OnInit {

  displayedColumns: string[] = ['perId', 'perApellido', 'perNombre', 'perFechaNacimiento', 'perNumeroDocumento', 'perTipoDocumento', 'actions'];
  dataSource: MatTableDataSource<Persona>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  tipoDocumentoFilter: FormControl = new FormControl();
  nombreFilter: FormControl = new FormControl();

  private filterValues = { perTipoDocumento: '', perNombre: '' }

  constructor(
    private usuarioService: UsuarioService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
    this.cargarDatos();
  }

  ngOnInit() {
    
  }

  filtrar() {
    this.filterValues['perNombre'] = this.nombreFilter.value.trim();
    this.filterValues['perTipoDocumento'] = this.tipoDocumentoFilter.value.trim();
    this.dataSource.filter = JSON.stringify(this.filterValues);


    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cargarDatos() {
    this.usuarioService.obtenerPersonas().subscribe(res => {
      if (res.id === '1') {
        this.dataSource = new MatTableDataSource(res.personaList);
      } else if (res.id === '2') {
        this.snackBar.open(res.mensaje, 'X', { duration: 2000 });
      }
    },
      error => {
        this.snackBar.open('No se pudo traer las personas', 'X', { duration: 2000 });
      },
      () => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.dataSource.filterPredicate = function (data, filter: string): boolean {
          let searchString = JSON.parse(filter);
          return data.perNombre.toString().includes(searchString.perNombre) &&
            data.perTipoDocumento.toString().includes(searchString.perTipoDocumento);
        };
      });
  }

  agregarPersona() {
    const dialogRef: any = this.dialog.open(ModalPersonaComponent, {
      width: '700px',
      disableClose: true,
      data: { esEdicion: false }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.usuarioService.registrarPersona(res).subscribe(resServ => {
          if (resServ.id === '2') {
            this.snackBar.open(resServ.mensaje, 'X', { duration: 2000 });
          }
        },
          error => {
            this.snackBar.open('No se pudo registrar', 'X', { duration: 2000 });
          },
          () => {
            this.snackBar.open('Se pudo registrar con exito!', 'X', { duration: 2000 });
            this.cargarDatos();
          })
      }
    });
  }

  eliminarPersona(idPersona, i) {
    this.usuarioService.eliminarPersona(idPersona).subscribe(res => {
      if (res.id === '2') {
        this.snackBar.open(res.mensaje, 'X', { duration: 2000 });
      }
    },
      error => {
        this.snackBar.open('No se pudo eliminar', 'X', { duration: 2000 });
      },
      () => {
        this.dataSource.data.splice(i, 1);
        this.dataSource = new MatTableDataSource(this.dataSource.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.snackBar.open('Se elimino con éxito!', 'X', { duration: 2000 });
      })
  }

  editarPersona(unaPersona: Persona) {
    const dialogRef: any = this.dialog.open(ModalPersonaComponent, {
      width: '700px',
      disableClose: true,
      data: { esEdicion: true, unaPersona: unaPersona }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.usuarioService.editarPersona(res).subscribe(resServ => {
          if (resServ.id === '2') {
            this.snackBar.open(res.mensaje, 'X', { duration: 2000 });
          }
        },
          error => {
            this.snackBar.open('No se pudo editar', 'X', { duration: 2000 });
          },
          () => {
            this.snackBar.open('Se edito con exito!', 'X', { duration: 2000 });
            this.cargarDatos();
          })

      }
    });
  }

}
