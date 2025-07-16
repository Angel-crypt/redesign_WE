import { Component, Input } from '@angular/core';
import { Asignacion } from '../../../../interfaces/entities';
import { GruposService } from '../../../../services/maestro/asignaciones/grupos';
import { PlaneacionS } from '../../../../services/maestro/planeacion/planeacion-s';

interface Estudiante {
  id_alumno: string;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  fecha_nacimiento: string;
  sexo: string;
}

@Component({
  selector: 'app-assignment-card',
  standalone: false,
  templateUrl: './assignment-card.html',
  styleUrls: ['./assignment-card.less'],
})
export class AssignmentCard {
  @Input() assignment!: Asignacion;
  showStudents: boolean = false;
  students: Estudiante[] = [];
  loadingStudents: boolean = false;
  errorMessage: string | null = null;
  selectedFile: File | null = null;
  showUploadForm: boolean = false;
  isUploading: boolean = false;

  private colorPalette: string[] = [
    '#4CAF50',
    '#2196F3',
    '#F44336',
    '#FF9800',
    '#9C27B0',
    '#00BCD4',
    '#E91E63',
    '#8BC34A',
  ];

  constructor(
    private gruposService: GruposService,
    private planeacionService: PlaneacionS
  ) {}

  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  }

  getGroupColor(): string {
    if (!this.assignment?.grupo?.id_grupo) {
      return this.colorPalette[0];
    }
    const hash = this.hashString(String(this.assignment.grupo.id_grupo));
    const index = hash % this.colorPalette.length;
    return this.colorPalette[index];
  }

  toggleStudentList(): void {
    if (this.showStudents) {
      this.showStudents = false;
      this.students = [];
      this.errorMessage = null;
      return;
    }

    this.loadingStudents = true;
    this.errorMessage = null;

    this.gruposService
      .getDetallesGrupo(String(this.assignment.grupo.id_grupo))
      .subscribe({
        next: (response) => {
          if (response.success && response.data?.estudiantes) {
            this.students = response.data.estudiantes;
            this.showStudents = true;
          } else {
            this.errorMessage =
              'No se encontraron estudiantes para este grupo.';
          }
          this.loadingStudents = false;
        },
        error: (err) => {
          console.error('Error fetching students:', err);
          this.errorMessage = 'Error al cargar la lista de estudiantes.';
          this.loadingStudents = false;
        },
      });
  }

  openPlaneacion(url: string | undefined): void {
    if (url) {
      window.open(url, '_blank');
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFile = file;
    } else {
      alert('Por favor selecciona un archivo PDF válido');
      this.selectedFile = null;
    }
  }

  uploadPdf() {
    if (!this.selectedFile) {
      alert('Por favor selecciona un archivo PDF');
      return;
    }

    this.isUploading = true;

    // Asumiendo que tienes el ID del assignment
    const assignmentId = this.assignment.id_asignacion;

    this.planeacionService
      .uploadPdfFile(Number(assignmentId), this.selectedFile)
      .subscribe({
      next: (response) => {
        console.log('PDF subido exitosamente:', response);

        this.assignment.tiene_planeacion = true;
        this.assignment.planeacion_pdf_url = response.pdf_url;

        this.resetUploadForm();

        alert('PDF subido exitosamente');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      error: (error) => {
        console.error('Error al subir PDF:', error);
        alert('Error al subir el archivo. Intenta nuevamente.');
        this.isUploading = false;
      },
      });
  }

  // Cancelar subida
  cancelUpload() {
    this.resetUploadForm();
  }

  // Resetear formulario
  private resetUploadForm() {
    this.selectedFile = null;
    this.showUploadForm = false;
    this.isUploading = false;
  }
}