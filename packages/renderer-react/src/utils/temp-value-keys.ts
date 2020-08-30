import { SheetModel } from '@stayfocus/core';

export function tvZoomFactorKey(model: SheetModel) {
  return `ZoomFactor-${model.id}-${model.config.viewMode}`;
}
