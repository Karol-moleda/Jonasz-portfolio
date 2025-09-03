import {Component, OnInit, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SanityService} from '../../services/sanity.service';
import {Biography} from '../../models/biography';

@Component({
  selector: 'app-biography',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './biography.component.html',
  styleUrl: './biography.component.scss'
})
export class BiographyComponent implements OnInit {
  biography = signal<Biography | null>(null);
  constructor(private sanityService: SanityService,) {}
  ngOnInit() {
    this.getBiography();
  }

  private  getBiography(): void {
    this.sanityService.getBiography().subscribe((res:any) => {
      console.log(res)
      this.biography.set(res.result);
    });
  }

  portableTextToHtml(blocks: any[]): string {
    if (!blocks) return '';
    return blocks
      .map(block => {
        if (block._type === 'block') {
          return `<p>${block.children.map((child: any) => child.text).join('')}</p>`;
        }
        return '';
      })
      .join('');
  }
}
