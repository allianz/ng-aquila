import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProductTileBasicExampleComponent } from './product-tile-basic/product-tile-basic-example';
import { ProductTileBodyContentExampleComponent } from './product-tile-body-content/product-tile-body-content-example';
import { ProductTileCarouselExampleComponent } from './product-tile-carousel/product-tile-carousel-example';
import { ProductTileColorSchemesExampleComponent } from './product-tile-color-schemes/product-tile-color-schemes-example';
import { ProductTileFeatureStatusExampleComponent } from './product-tile-feature-status/product-tile-feature-status-example';
import { ProductTileHeaderContentExampleComponent } from './product-tile-header-content/product-tile-header-content-example';
import { ProductTileLabelledByExampleComponent } from './product-tile-labelled-by/product-tile-labelled-by-example';
import { ProductTilePriceSizeExampleComponent } from './product-tile-price-size/product-tile-price-size-example';
import { ProductTilePromotionExampleComponent } from './product-tile-promotion/product-tile-promotion-example';
import { ProductTileSelectButtonExampleComponent } from './product-tile-select-button/product-tile-select-button-example';
import { ProductTileSelectionExampleComponent } from './product-tile-selection/product-tile-selection-example';

const EXAMPLES = [
  ProductTileBasicExampleComponent,
  ProductTileColorSchemesExampleComponent,
  ProductTileSelectionExampleComponent,
  ProductTilePromotionExampleComponent,
  ProductTileCarouselExampleComponent,
  ProductTileHeaderContentExampleComponent,
  ProductTilePriceSizeExampleComponent,
  ProductTileSelectButtonExampleComponent,
  ProductTileBodyContentExampleComponent,
  ProductTileLabelledByExampleComponent,
  ProductTileFeatureStatusExampleComponent,
];

@NgModule({
  imports: [CommonModule, ...EXAMPLES],
  exports: [...EXAMPLES],
})
export class ProductTileExamplesModule {
  static components() {
    return {
      'product-tile-basic': ProductTileBasicExampleComponent,
      'product-tile-color-schemes': ProductTileColorSchemesExampleComponent,
      'product-tile-selection': ProductTileSelectionExampleComponent,
      'product-tile-promotion': ProductTilePromotionExampleComponent,
      'product-tile-carousel': ProductTileCarouselExampleComponent,
      'product-tile-header-content': ProductTileHeaderContentExampleComponent,
      'product-tile-price-size': ProductTilePriceSizeExampleComponent,
      'product-tile-select-button': ProductTileSelectButtonExampleComponent,
      'product-tile-body-content': ProductTileBodyContentExampleComponent,
      'product-tile-labelled-by': ProductTileLabelledByExampleComponent,
      'product-tile-feature-status': ProductTileFeatureStatusExampleComponent,
    };
  }
}
