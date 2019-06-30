import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Persona } from 'src/app/models/persona';

@Component({
  selector: 'app-modal-persona',
  templateUrl: './modal-persona.component.html',
  styleUrls: ['./modal-persona.component.scss']
})
export class ModalPersonaComponent implements OnInit {
  titulo: string;

  formPersona: FormGroup;

  unaPersona: Persona = null;

  esEdicion = false;

  minDate;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalPersonaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.esEdicion) {
      this.unaPersona = data.unaPersona;
      this.titulo = 'Editar Persona';
      this.esEdicion = true;
    } else {
      this.titulo = 'Agregar Persona'
    }

    this.minDate = new Date();
  }

  ngOnInit() {
    this.construirForm();
  }

  toDate(dateStr) {
    const [day, month, year] = dateStr.split("/");
    return new Date(year, month - 1, day);
  }

  construirForm() {
    if (this.esEdicion) {
      this.formPersona = this.fb.group({
        perApellido: [this.unaPersona.perApellido, [Validators.required]],
        perFechaNacimiento: [this.toDate(this.unaPersona.perFechaNacimiento), [Validators.required]],
        perNombre: [this.unaPersona.perNombre, [Validators.required]],
        perNumeroDocumento: [this.unaPersona.perNumeroDocumento, [Validators.required]],
        perTipoDocumento: [this.unaPersona.perTipoDocumento, [Validators.required]],
      })
    } else {
      this.formPersona = this.fb.group({
        perApellido: ['', [Validators.required]],
        perFechaNacimiento: ['', [Validators.required]],
        perNombre: ['', [Validators.required]],
        perNumeroDocumento: ['', [Validators.required]],
        perTipoDocumento: ['', [Validators.required]],
      })
    }

  }

  registrarEditarPersona() {

    const unaPersona = Object.assign(this.formPersona.value);
    if (this.esEdicion) {
      unaPersona.perId = this.unaPersona.perId;
    }

    const fecha: Date = new Date(unaPersona.perFechaNacimiento);
    unaPersona.perFechaNacimiento = fecha.getUTCDate() + '/' + (fecha.getUTCMonth() + 1) + '/' + fecha.getUTCFullYear();
    this.dialogRef.close(unaPersona);
  }

  cerrarDialogo() {
    this.dialogRef.close();
  }


}
