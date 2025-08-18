import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'shared-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
})
export class InputComponent implements OnInit {

  @Input() id: string = '';
  @Input() label: string = '';
  @Input() formControlName: string = '';
  @Input() type: string = 'text';

  ngOnInit(): void {
    console.log(this.label);
  }

}
