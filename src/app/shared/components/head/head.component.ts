import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-head',
  templateUrl: './head.component.html',
  styleUrl: './head.component.css',
})
export class HeadComponent {

  @Input()
  public title!: string;

  goBack(){
    
  }
}
