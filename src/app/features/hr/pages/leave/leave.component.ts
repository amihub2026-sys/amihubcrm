import { HrService } from '../../services/hr.service';

import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

import { RecordPageController } from '../../../../shared/controllers/record-page.controller';

import { RecordTableComponent } from '../../../../shared/components/record-table/record-table.component';

import { RecordEditorComponent } from '../../../../shared/components/record-editor/record-editor.component';

@Component({

  selector: 'app-hr-leave',

  standalone: true,

  imports: [
    CommonModule,
    RecordTableComponent,
    RecordEditorComponent
  ],

  templateUrl: './leave.component.html',

  styleUrl: './leave.component.css'

})

export class LeavePageComponent extends RecordPageController {

  private router = inject(Router);

  constructor() {
    super('hr', 'leave', inject(HrService));
  }

  get isMyLeave() {
    return this.router.url.startsWith('/my-leave');
  }

  override get visibleFields() {

    const fields = super.visibleFields;

    if (this.isMyLeave) {
      return fields.filter(
        (field) => field.key !== 'employeeId'
      );
    }

    return fields;
  }

  override get showStatusField() {
    return !this.isMyLeave;
  }

  override open(x: any = null) {

    super.open(x);

    if (this.isMyLeave && !x && this.modal) {

      this.draft.employeeId =
        this.auth.user()?.employeeId;

      this.draft.status = 'PENDING';

    }
  }

}