import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  signal
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { FiltersPanelComponent } from '../filters-panel/filters-panel.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchBarComponent, FiltersPanelComponent, NgOptimizedImage],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  protected readonly isSearchOpen = signal(false);
  protected readonly isFiltersOpen = signal(false);
  protected readonly isPanelDetailed = signal(false);

  constructor(private readonly hostRef: ElementRef<HTMLElement>) {}

  @HostBinding('class.search-open')
  protected get searchOpenClass(): boolean {
    return this.isSearchOpen();
  }

  protected onSearchIconFocus(): void {
    this.isSearchOpen.set(true);
    this.isFiltersOpen.set(this.isMobileViewport());
  }

  protected onSearchIconClick(): void {
    this.isSearchOpen.set(true);
    this.isFiltersOpen.set(this.isMobileViewport());
  }

  protected onSearchTrackFocus(): void {
    this.isSearchOpen.set(true);
    this.isFiltersOpen.set(true);
  }

  protected closeSearch(): void {
    this.isSearchOpen.set(false);
    this.isFiltersOpen.set(false);
    this.isPanelDetailed.set(false);
  }

  private isMobileViewport(): boolean {
    return typeof window !== 'undefined' && window.matchMedia('(max-width: 414px)').matches;
  }

  @HostListener('focusin', ['$event'])
  protected onFocusIn(event: FocusEvent): void {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const panel = this.hostRef.nativeElement.querySelector('app-filters-panel');
    if (panel?.contains(target)) {
      this.isPanelDetailed.set(true);
      return;
    }

    if (target.id === 'header-search-input') {
      this.isPanelDetailed.set(false);
    }
  }

  @HostListener('document:click', ['$event'])
  protected onFocusOut(event: FocusEvent): void {
    if (this.isMobileViewport() && this.isSearchOpen()) {
      return;
    }

    const nextTarget = event.relatedTarget;
    if (nextTarget instanceof Node && this.hostRef.nativeElement.contains(nextTarget)) {
      return;
    }

    queueMicrotask(() => {
      const active = this.hostRef.nativeElement.ownerDocument.activeElement;
      if (active instanceof Node && this.hostRef.nativeElement.contains(active)) {
        return;
      }
      this.closeSearch();
    });
  }

  @HostListener('document:click', ['$event'])
  protected onDocumentMouseDown(event: MouseEvent): void {
    const target = event.target;
    if (!(target instanceof Node)) {
      return;
    }
    if (!this.hostRef.nativeElement.contains(target)) {
      this.closeSearch();
    }
  }
}
