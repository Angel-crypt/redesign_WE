import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { Asignacion, Estudiante } from '../../../../interfaces/entities';
import { GruposService } from '../../../../services/maestro/asignaciones/grupos';
import { CalificacionesS } from '../../../../services/maestro/calificaciones/calificaciones-s';

interface GradeAvailability {
  can_upload: boolean;
  message: string;
}

@Component({
  selector: 'app-students-list',
  standalone: false,
  templateUrl: './students-list.html',
  styleUrls: ['./students-list.less'],
})
export class StudentsSection implements OnInit, OnDestroy {
  @Input() assignment!: Asignacion;

  // Component state
  isExpanded = false;
  isLoadingStudents = false;
  isLoadingAvailability = false;
  isSavingGrades = false;
  students: Estudiante[] = [];
  errorMessage: string | null = null;
  successMessage: string | null = null;

  // Form and grade management
  studentsForm: FormGroup;
  gradeColumns = ['1', '2', '3']; // Parcial numbers
  gradeAvailability: { [key: string]: GradeAvailability } = {};
  loadedGrades: Set<string> = new Set(); // Track loaded grades in format 'studentId-parcial'

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private gruposService: GruposService,
    private calificacionesService: CalificacionesS
  ) {
    this.studentsForm = this.fb.group({
      students: this.fb.array([]),
    });
  }

  ngOnInit() {
    this.checkGradeAvailability();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get studentsFormArray(): FormArray {
    return this.studentsForm.get('students') as FormArray;
  }

  toggleStudentsSection() {
    this.isExpanded = !this.isExpanded;
    if (this.isExpanded && this.students.length === 0) {
      this.loadStudents();
    }
  }

  private loadStudents() {
    if (!this.assignment?.grupo?.id_grupo) {
      this.errorMessage = 'No se encontró información del grupo.';
      return;
    }

    this.isLoadingStudents = true;
    this.errorMessage = null;

    this.gruposService
      .getDetallesGrupo(String(this.assignment.grupo.id_grupo))
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isLoadingStudents = false))
      )
      .subscribe({
        next: (response) => {
          if (response.success && response.data?.estudiantes) {
            this.students = response.data.estudiantes;
            this.initializeStudentsForm();
            this.loadGrades();  // Load existing grades after students are initialized.
          } else {
            this.errorMessage =
              'No se encontraron estudiantes para este grupo.';
          }
        },
        error: (err) => {
          console.error('Error fetching students:', err);
          this.errorMessage = 'Error al cargar la lista de estudiantes.';
        },
      });
  }

  private loadGrades() {
    this.gradeColumns.forEach((parcial) => {
      this.calificacionesService
        .getCalificaciones(String(this.assignment.id_asignacion), parcial)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            console.log('Grades API response:', response); // Debug log
            this.patchGradesToForm(response, parcial);
          },
          error: (err) => {
            console.error('Error loading grades:', err);
            this.errorMessage = 'Error al cargar calificaciones.';
          },
        });
    });
  }

  private patchGradesToForm(response: any, parcial: string) {
    // Handle different response structures
    let calificaciones: any[] = [];
    
    if (Array.isArray(response)) {
      // Response is directly an array
      calificaciones = response;
    } else if (response && response.data && Array.isArray(response.data)) {
      // Response has data property containing array
      calificaciones = response.data;
    } else if (response && response.calificaciones && Array.isArray(response.calificaciones)) {
      // Response has calificaciones property containing array
      calificaciones = response.calificaciones;
    } else {
      // Response structure is unknown or empty
      console.warn('Unknown response structure for calificaciones:', response);
      return;
    }

    this.studentsFormArray.controls.forEach((studentControl) => {
      const studentId = studentControl.get('id_alumno')?.value;
      const calificacion = calificaciones.find(
        (c: any) => c.id_alumno === studentId
      );

      if (calificacion) {
        studentControl.get(`grades.${parcial}`)?.setValue(calificacion.calificacion);
        this.loadedGrades.add(`${studentId}-${parcial}`);
      }
    });
  }

  private initializeStudentsForm() {
    const studentsArray = this.fb.array<FormGroup>([]);

    this.students.forEach((student) => {
      const studentGroup = this.fb.group({
        id_alumno: [student.id_alumno],
        nombre: [student.nombre],
        apellido_paterno: [student.apellido_paterno],
        apellido_materno: [student.apellido_materno],
        grades: this.fb.group({
          '1': new FormControl({
            value: null,
            disabled: this.isGradeFieldDisabled('1')
          }, [
            Validators.min(0),
            Validators.max(10),
            Validators.pattern(/^\d*\.?\d*$/),
          ]),
          '2': new FormControl({
            value: null,
            disabled: this.isGradeFieldDisabled('2')
          }, [
            Validators.min(0),
            Validators.max(10),
            Validators.pattern(/^\d*\.?\d*$/),
          ]),
          '3': new FormControl({
            value: null,
            disabled: this.isGradeFieldDisabled('3')
          }, [
            Validators.min(0),
            Validators.max(10),
            Validators.pattern(/^\d*\.?\d*$/),
          ]),
        }),
      });

      studentsArray.push(studentGroup);
    });

    this.studentsForm.setControl('students', studentsArray);
  }

  private checkGradeAvailability() {
    if (!this.assignment?.id_asignacion) {
      return;
    }

    this.isLoadingAvailability = true;

    this.gradeColumns.forEach((parcial) => {
      this.calificacionesService
        .checkGradesAvailability(String(this.assignment.id_asignacion), parcial)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.gradeAvailability[parcial] = {
              can_upload: response.can_upload,
              message: response.message,
            };
            this.isLoadingAvailability = false;
            this.updateFormControlStates(); // Update form control states after availability check
          },
          error: (error) => {
            console.error(
              `Error checking availability for parcial ${parcial}:`,
              error
            );
            this.gradeAvailability[parcial] = {
              can_upload: false,
              message:
                error.error?.error || 'Error al verificar disponibilidad',
            };
            this.isLoadingAvailability = false;
            this.updateFormControlStates(); // Update form control states after availability check
          },
        });
    });
  }

  canEditGrade(parcial: string): boolean {
    return this.gradeAvailability[parcial]?.can_upload || false;
  }

  getGradeTooltip(parcial: string): string {
    return this.gradeAvailability[parcial]?.message || '';
  }

  isGradeFieldDisabled(parcial: string): boolean {
    return !this.canEditGrade(parcial) || this.isLoadingAvailability;
  }

  saveGrades(parcial: string) {
    if (!this.canEditGrade(parcial)) {
      this.errorMessage = `No se pueden subir calificaciones para el Parcial ${parcial}: ${this.getGradeTooltip(
        parcial
      )}`;
      return;
    }

    const gradesData = this.getGradesForParcial(parcial);
    if (gradesData.length === 0) {
      this.errorMessage = `No hay calificaciones válidas para el Parcial ${parcial}`;
      return;
    }

    this.isSavingGrades = true;
    this.errorMessage = null;
    this.successMessage = null;

    this.calificacionesService
      .uploadCalificaciones(
        String(this.assignment.id_asignacion),
        parcial,
        gradesData
      )
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isSavingGrades = false))
      )
      .subscribe({
        next: (response) => {
          this.successMessage = `Calificaciones del Parcial ${parcial} guardadas exitosamente. Se procesaron ${gradesData.length} calificaciones.`;
          this.clearGradesForParcial(parcial);
          this.checkGradeAvailability(); // Refresh availability
          this.loadGrades(); // Reload grades to show updated data
        },
        error: (error) => {
          console.error(`Error saving grades for parcial ${parcial}:`, error);
          this.errorMessage =
            error.error?.error ||
            `Error al guardar calificaciones del Parcial ${parcial}`;
        },
      });
  }

  public getGradesForParcial(parcial: string) {
    const gradesData: { id_alumno: string; calificacion: number }[] = [];

    this.studentsFormArray.controls.forEach((studentControl) => {
      const gradeValue = studentControl.get(`grades.${parcial}`)?.value;
      const studentId = studentControl.get('id_alumno')?.value;

      if (gradeValue !== null && gradeValue !== '' && !isNaN(gradeValue)) {
        gradesData.push({
          id_alumno: studentId,
          calificacion: parseFloat(gradeValue),
        });
      }
    });

    return gradesData;
  }

  private clearGradesForParcial(parcial: string) {
    this.studentsFormArray.controls.forEach((studentControl) => {
      const studentId = studentControl.get('id_alumno')?.value;
      studentControl.get(`grades.${parcial}`)?.setValue(null);
      // Remove from loaded grades tracking
      this.loadedGrades.delete(`${studentId}-${parcial}`);
    });
  }

  getStudentFullName(student: any): string {
    return `${student.nombre} ${student.apellido_paterno} ${student.apellido_materno}`;
  }

  hasValidGrades(parcial: string): boolean {
    return this.getGradesForParcial(parcial).length > 0;
  }

  refreshAvailability() {
    this.checkGradeAvailability();
  }

  dismissMessage() {
    this.errorMessage = null;
    this.successMessage = null;
  }

  // Helper method to check if a grade was loaded from the database
  isGradeLoadedFromDatabase(studentId: string, parcial: string): boolean {
    return this.loadedGrades.has(`${studentId}-${parcial}`);
  }

  // Helper method to get CSS classes for grade input field
  getGradeInputClasses(studentId: string, parcial: string): string {
    const isLoaded = this.isGradeLoadedFromDatabase(studentId, parcial);
    const isActive = this.canEditGrade(parcial);
    const isDisabled = this.isGradeFieldDisabled(parcial);
    
    let classes = 'grade-input';
    
    if (isLoaded && isActive) {
      classes += ' grade-loaded-active';
    } else if (isLoaded && !isActive) {
      classes += ' grade-loaded-inactive';
    }
    
    if (isDisabled) {
      classes += ' grade-disabled';
    }
    
    return classes;
  }

  // Helper method to get tooltip text for grade input
  getGradeInputTooltip(studentId: string, parcial: string): string {
    const isLoaded = this.isGradeLoadedFromDatabase(studentId, parcial);
    const baseTooltip = this.getGradeTooltip(parcial);
    
    if (isLoaded) {
      return `Calificación existente en la base de datos. ${baseTooltip}`;
    }
    
    return baseTooltip;
  }

  // Method to update form control states dynamically
  private updateFormControlStates() {
    this.studentsFormArray.controls.forEach((studentControl) => {
      this.gradeColumns.forEach((parcial) => {
        const gradeControl = studentControl.get(`grades.${parcial}`);
        if (gradeControl) {
          if (this.isGradeFieldDisabled(parcial)) {
            gradeControl.disable();
          } else {
            gradeControl.enable();
          }
        }
      });
    });
  }
}
