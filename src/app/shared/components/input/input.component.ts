import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  standalone: false
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
