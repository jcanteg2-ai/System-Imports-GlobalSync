import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TrackingComponent } from '../../tracking/tracking.component';

@Component({
  selector: 'app-public-page',
  standalone: true,
  imports: [CommonModule, RouterModule, TrackingComponent],
  templateUrl: './public-page.component.html',
  styleUrls: ['./public-page.component.css']
})
export class PublicPageComponent {}
