import { Hotkey, Hotkeys, HotkeysTarget } from '@blueprintjs/core';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/select/lib/css/blueprint-select.css';
import {
  Controller,
  DocModel,
  FocusMode,
  IDiagram,
  IDiagramProps,
  OnChangeFunction
} from '@stayfocus/core';
import '@stayfocus/icons';
import debug from 'debug';
import memoizeOne from 'memoize-one';
import * as React from 'react';
import { DefaultPlugin } from '../plugins';
import { HotKeysConfig } from '../types';
import './diagram.scss';
const log = debug('node:Diagram');


const contentData = {
  "sheetModels": [
    {
      "title": "画布1",
      "rootTopicKey": "5f60aec8-a4f9-46e1-96c4-497e38ef0524",
      "editorRootTopicKey": "5f60aec8-a4f9-46e1-96c4-497e38ef0524",
      "focusKey": "06272534-84a3-4fcc-98d9-67faa5ee214e",
      "topics": [
        {
          "key": "5f60aec8-a4f9-46e1-96c4-497e38ef0524",
          "parentKey": null,
          "subKeys": [
            "06272534-84a3-4fcc-98d9-67faa5ee214e",
            "a0c7d94e-4bc9-4fae-9fc7-f261a46675dc"
          ],
          "collapse": false,
          "style": null,
          "blocks": [
            {
              "type": "CONTENT",
              "data": "鲍勃"
            }
          ]
        },
        {
          "key": "06272534-84a3-4fcc-98d9-67faa5ee214e",
          "parentKey": "5f60aec8-a4f9-46e1-96c4-497e38ef0524",
          "subKeys": [],
          "collapse": false,
          "blocks": [
            {
              "type": "CONTENT",
              "data": "我以"
            },
            {
              "type": "DESC",
              "data": {
                "kind": "html",
                "data": "<div>fdafgdfgfdgfds</div>",
                "collapse": false
              }
            }
          ]
        },
        {
          "key": "a0c7d94e-4bc9-4fae-9fc7-f261a46675dc",
          "parentKey": "5f60aec8-a4f9-46e1-96c4-497e38ef0524",
          "subKeys": [],
          "collapse": false,
          "style": null,
          "blocks": [
            {
              "type": "CONTENT",
              "data": "问他"
            }
          ]
        }
      ],
    }
  ],
  "extData": {},
  "currentSheetIndex": 0,
  "formatVersion": "0.1"
};
// controller 可以为空
interface Props {
  docModel: DocModel | null | undefined;
  onChange?: OnChangeFunction;
  controller?: Controller;
  commands?: any;
  plugins?: any;
}
@HotkeysTarget
class Diagram extends React.Component<Props> implements IDiagram {
  controller: Controller;

  public getDiagramProps(): IDiagramProps {
    return this.controller.run('getDiagramProps');
  }

  renderHotkeys() {
    const props = this.props;
    const controller = props.controller || this.controller;
    const model = controller.model;
    log('renderHotkeys', model);
    const hotKeys: HotKeysConfig = controller.run('customizeHotKeys', {
      ...props,
      controller
    });
    if (hotKeys === null) return null;
    if (
      !(
        hotKeys.topicHotKeys instanceof Map &&
        hotKeys.globalHotKeys instanceof Map
      )
    ) {
      throw new TypeError('topicHotKeys and globalHotKeys must be a Map');
    }
    const children = [];
    if (
      model.focusMode === FocusMode.NORMAL ||
      model.focusMode === FocusMode.SHOW_POPUP ||
      model.focusMode === FocusMode.EDITING_CONTENT
    ) {
      hotKeys.topicHotKeys.forEach((v, k) => {
        children.push(<Hotkey key={k} {...v} global />);
      });

      hotKeys.viewModeTopicHotKeys.has(model.config.viewMode) &&
        hotKeys.viewModeTopicHotKeys
          .get(model.config.viewMode)
          .forEach((v, k) => {
            children.push(<Hotkey key={k} {...v} global />);
          });
    }
    hotKeys.globalHotKeys.forEach((v, k) => {
      children.push(<Hotkey key={k} {...v} global />);
    });
    return <Hotkeys>{children}</Hotkeys>;
  }

  public openNewDocModel(newModel: DocModel) {
    const props = this.getDiagramProps();
    const { controller } = props;
    controller.run('openNewDocModel', {
      ...props,
      newModel
    });
  }

  private diagramProps: IDiagramProps;

  private resolveController = memoizeOne((plugins = [], TheDefaultPlugin) => {
    const defaultPlugin = TheDefaultPlugin();
    this.controller = new Controller({
      plugins: [plugins, defaultPlugin],
      onChange: this.props.onChange
    });
  });

  render() {
    const { plugins, controller } = this.props;
    if (controller) this.controller = controller;
    else this.resolveController(plugins, DefaultPlugin);
    let { docModel } = this.props;
    if (!docModel) {
      // docModel = this.controller.run('createNewDocModel', {
      //   controller: this.controller
      // });

      docModel = this.controller.run('deserializeDocModel', { controller:this.controller, obj:contentData });
      this.controller.docModel = docModel;
    }
    this.diagramProps = {
      ...this.props,
      docModel,
      controller: this.controller
    };
    return this.controller.run('renderDiagram', this.diagramProps);
  }
}

export { Diagram };
