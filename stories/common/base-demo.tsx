import { DocModel } from '@stayfocus/core';
import debug from 'debug';
import * as React from 'react';
import { generateSimpleModel } from '../utils';
import './base-demo.css';
const log = debug('story:base-demo');

interface Props {}

interface State {
  docModel: DocModel;
}

export class BaseDemo extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.initModel();
  }
  onChange = (event, callback?: () => void) => {
    console.log("ChangeEvent",event);

    // if(event.topicKey){
    //   let topic = event.model.getTopic(event.topicKey);
    //   debugger
    // }
    this.setState(
      {
        docModel:event.docModel
      },
      callback
    );
  };

  initModel() {
    // const model = generateSimpleModel();
    // log('initModel:', model);
    // this.state = {
    //   model
    // };
  }

  renderDiagram() {
    return null;
  }

  render() {
    return <div className="app">{this.renderDiagram()}</div>;
  }
}
