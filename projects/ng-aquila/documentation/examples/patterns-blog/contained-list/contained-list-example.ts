import { NxPlainButtonComponent } from '@allianz/ng-aquila/button';
import {
  NxContextMenuComponent,
  NxContextMenuItemComponent,
  NxContextMenuTriggerDirective,
} from '@allianz/ng-aquila/context-menu';
import { NxGridModule } from '@allianz/ng-aquila/grid';
import { NxIconComponent } from '@allianz/ng-aquila/icon';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  contentChildren,
  Directive,
  input,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'contained-list',
  standalone: true,
  template: `
    @if (!!label()) {
      <div class="contained-list-label">
        {{ label() }}
      </div>
    }
    <ul>
      <ng-content></ng-content>
    </ul>
  `,
  styles: `
    .contained-list-label {
      padding-left: 8px;
      padding-bottom: 8px;
      font-size: var(--small-label-font-size);
      font-weight: 600;
      line-height: var(--small-label-line-height);
    }
  `,
})
export class ContainedListComponent {
  readonly label = input('');
}

@Component({
  selector: 'li[containedListItem]',
  standalone: true,
  imports: [],
  template: `
    <ng-content select="[containedListItemIcon]"></ng-content>
    <div class="contained-list-text-container">
      @if (itemLabel()) {
        <div class="contained-list-item-label">
          <ng-content select="[containedListItemLabel]"></ng-content>
        </div>
      }
      @if (itemSubText()) {
        <div class="contained-list-item-subtext">
          <ng-content select="[containedListItemSubText]"></ng-content>
        </div>
      }
      <ng-content></ng-content>
    </div>
    @if (itemActions().length > 0) {
      <div class="contained-list-action">
        <ng-content select="[containedListItemInlineAction]"></ng-content>
      </div>
    }
  `,
  styles: `
    :host {
      display: flex;
      gap: 8px;
      padding: 8px;
      align-self: flex-start;
      width: 100%;
      border-bottom: 1px solid var(--ui-04);

      font-size: var(--paragraph-03-font-size);
      font-weight: 400;
      line-height: var(--paragraph-03-line-height);

      &:first-of-type {
        border-top: 1px solid var(--ui-04);
      }

      &.actionable {
        padding: 0;

        ::ng-deep button {
          padding: 8px;
          border: 0;
          font-size: var(--paragraph-03-font-size);
          font-weight: 400;
          line-height: var(--paragraph-03-line-height);
          color: var(--text-01);
          text-align: left;
          background-color: var(--ui-01);
        }

        ::ng-deep button:hover {
          cursor: pointer;
          background: var(--ui-02);
        }

        ::ng-deep button:active {
          cursor: pointer;
          background: var(--ui-03);
        }
      }
    }

    .contained-list-item-label {
      font-size: var(--small-label-font-size);
      font-weight: 600;
      line-height: var(--small-label-line-height);
    }

    .contained-list-item-subtext {
      font-size: var(-paragraph-04-font-size);
      font-weight: 400;
      line-height: var(--paragraph-04-line-height);
      letter-spacing: 0.2px;
    }

    .contained-list-text-container {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
    }

    .contained-list-action {
      flex-shrink: 0;
      align-self: flex-start;
    }
  `,
  host: {
    '[class.actionable]': 'isActionableListItem()',
  },
})
export class ContainedListItemComponent {
  protected readonly itemActions = contentChildren(
    ContainedListItemInlineActionDirective,
  );
  protected readonly itemLabel = contentChild(ContainedListItemLabelDirective);
  protected readonly itemSubText = contentChild(
    ContainedListItemSubTextDirective,
  );
  protected readonly itemIcon = contentChild(ContainedListItemIconDirective);
  protected readonly nativeButton = contentChild(
    ContainedListItemActionDirective,
  );

  protected readonly isActionableListItem = computed<boolean>(
    () => !!this.nativeButton() && this.itemActions().length === 0,
  );
}

@Directive({
  selector: '[containedListItemLabel]',
})
export class ContainedListItemLabelDirective {}

@Directive({
  selector: '[containedListItemIcon]',
})
export class ContainedListItemIconDirective {}

@Directive({
  selector: '[containedListItemInlineAction]',
})
export class ContainedListItemInlineActionDirective {}

@Directive({
  selector: '[containedListItemSubText]',
})
export class ContainedListItemSubTextDirective {}

@Directive({
  selector: '[containedListItemAction]',
})
export class ContainedListItemActionDirective {}

/**
 * @title AI Autofill for Inputs Example
 */
@Component({
  selector: 'contained-list-example',
  imports: [
    NxGridModule,
    FormsModule,
    NxIconComponent,
    NxContextMenuComponent,
    NxContextMenuItemComponent,
    NxContextMenuTriggerDirective,
    NxPlainButtonComponent,
    ContainedListComponent,
    ContainedListItemComponent,
    ContainedListItemIconDirective,
    ContainedListItemInlineActionDirective,
    ContainedListItemSubTextDirective,
    ContainedListItemLabelDirective,
    ContainedListItemActionDirective,
  ],
  templateUrl: './contained-list-example.html',
  styleUrl: './contained-list-example.css',
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainedListExampleComponent {}
