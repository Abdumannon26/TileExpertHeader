import { ChangeDetectionStrategy, Component, HostBinding, input, output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarComponent {
  readonly expanded = input<boolean>(false);
  readonly searchFocused = output<void>();

  @HostBinding('class.expanded')
  protected get expandedClass(): boolean {
    return this.expanded();
  }

  protected onInputFocus(): void {
    console.log(1)
    this.searchFocused.emit();
  }
}
