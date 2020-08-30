import { TopicContentStyle } from '@stayfocus/core';
import { BaseProps } from '../../common';

export interface ContentStyleEditorProps extends BaseProps {
  contentStyle: TopicContentStyle;
  setContentStyle: (TopicContentStyle) => void;
}
