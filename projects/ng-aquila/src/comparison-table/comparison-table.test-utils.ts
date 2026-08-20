export const BASIC_COMPARISON_TABLE_TEMPLATE = `
  <nx-comparison-table>
          @for (el of data; track $index) {
            @let element = $any(el);
            @if ($any(element)['type'] === 'toggleSection') {
              <ng-container nxComparisonTableToggleSection>
                <nx-comparison-table-toggle-section-header>{{ element['header'] }}</nx-comparison-table-toggle-section-header>
                @for (row of $any(element)['content']; track $index) {
                  <ng-container nxComparisonTableRow>
                    @if (row['description']) {
                      <nx-comparison-table-description-cell>{{ row['description'] }}</nx-comparison-table-description-cell
                        >
                        }>
                        @for (cell of row['cells']; track $index) {
                          <nx-comparison-table-cell>{{ cell }}</nx-comparison-table-cell>
                        }
                        @if (row['intersection']) {
                          <nx-comparison-table-intersection-cell>{{ row['intersection'] }}</nx-comparison-table-intersection-cell>
                        }
                      </ng-container>
                    }
                  </ng-container>
                }
                @if (element['type'] !== 'toggleSection') {
                  <ng-container nxComparisonTableRow [type]="element['type']">
                    @if (element['description']) {
                      <nx-comparison-table-description-cell>{{ element['description'] }}</nx-comparison-table-description-cell
                        >
                        }>
                        @for (cell of element['cells']; track $index) {
                          <nx-comparison-table-cell [type]="element['type']">{{ cell }}</nx-comparison-table-cell>
                        }
                        @if (element['intersection']) {
                          <nx-comparison-table-intersection-cell>{{ element['intersection'] }}</nx-comparison-table-intersection-cell>
                        }
                      </ng-container>
                    }
                  }
                </nx-comparison-table>
`;
export const HIDDEN_INDEXES_COMPARISON_TABLE_TEMPLATE = `
  <nx-comparison-table [(selectedIndex)]="selected" [hiddenIndexes]="hiddenIndexes">
          @for (el of data; track $index) {
            @let element = $any(el);
            @if (element['type'] === 'header') {
              <ng-container nxComparisonTableRow [type]="element['type']">
                @if (element['description']) {
                  <nx-comparison-table-description-cell>{{ element['description'] }}</nx-comparison-table-description-cell
                    >
                    }>
                    @for (cell of element['cells']; track $index) {
                      <nx-comparison-table-cell [type]="element['type']">
                        @if (popular) {
                          <nx-comparison-table-popular-cell [forColumn]="popular">popular cell</nx-comparison-table-popular-cell>
                        }
                        {{ cell }}
                      </nx-comparison-table-cell>
                    }
                    @if (element['intersection']) {
                      <nx-comparison-table-intersection-cell>{{ element['intersection'] }}</nx-comparison-table-intersection-cell>
                    }
                  </ng-container>
                }
                @if (element['type'] === 'toggleSection') {
                  <ng-container nxComparisonTableToggleSection>
                    <nx-comparison-table-toggle-section-header>{{ element['header'] }}</nx-comparison-table-toggle-section-header>
                    @for (row of element['content']; track $index) {
                      <ng-container nxComparisonTableRow>
                        @if (row['description']) {
                          <nx-comparison-table-description-cell>{{ row['description'] }}</nx-comparison-table-description-cell
                            >
                            }>
                            @for (cell of row['cells']; track $index) {
                              <nx-comparison-table-cell>{{ cell }}</nx-comparison-table-cell>
                            }
                            @if (row['intersection']) {
                              <nx-comparison-table-intersection-cell>{{ row['intersection'] }}</nx-comparison-table-intersection-cell>
                            }
                          </ng-container>
                        }
                      </ng-container>
                    }
                    @if (element['type'] === 'content') {
                      <ng-container nxComparisonTableRow [type]="element['type']">
                        @if (element['description']) {
                          <nx-comparison-table-description-cell>{{ element['description'] }}</nx-comparison-table-description-cell
                            >
                            }>
                            @for (cell of element['cells']; track $index) {
                              <nx-comparison-table-cell [type]="element['type']">
                                {{ cell }}
                              </nx-comparison-table-cell>
                            }
                            @if (element['intersection']) {
                              <nx-comparison-table-intersection-cell>{{ element['intersection'] }}</nx-comparison-table-intersection-cell>
                            }
                          </ng-container>
                        }
                        @if (element['type'] === 'footer') {
                          <ng-container nxComparisonTableRow [type]="element['type']">
                            @if (element['description']) {
                              <nx-comparison-table-description-cell>{{ element['description'] }}</nx-comparison-table-description-cell
                                >
                                }>
                                @for (cell of element['cells']; track $index) {
                                  <nx-comparison-table-cell [type]="element['type']">
                                    {{ cell }}
                                  </nx-comparison-table-cell>
                                }
                                @if (element['intersection']) {
                                  <nx-comparison-table-intersection-cell>{{ element['intersection'] }}</nx-comparison-table-intersection-cell>
                                }
                              </ng-container>
                            }
                          }
                        </nx-comparison-table>
`;
