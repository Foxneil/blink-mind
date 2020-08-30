import { Controller } from '@stayfocus/core';

export function op(controller: Controller, args) {
  controller.run('operation', args);
}
