import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-filters-panel',
  standalone: true,
  templateUrl: './filters-panel.component.html',
  styleUrl: './filters-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersPanelComponent {
  readonly detailed = input<boolean>(false);
}

