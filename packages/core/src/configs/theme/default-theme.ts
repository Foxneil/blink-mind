import { ThemeType } from './types';

export const defaultTheme: ThemeType = {
  name: 'defaultTheme',
  randomColor: false,
  background: '#FAFAFB',
  highlightColor: '#01CCA7',
  marginH: 80,
  marginV: 20,
  contentStyle: {
    lineHeight: '1.2'
  },
  linkStyle: {
    lineRadius: 5,
    lineType: 'round'
  },
  rootTopic: {
    contentStyle: {
      background: 'linear-gradient(40deg, #02809C 0%, #00F6AC 100%)',
      color: '#fff',
      fontSize: '24px',
      borderRadius: '4px',
      padding: '8px 18px 8px 18px',
    },

    subLinkStyle: {
      lineType: 'round',
      lineWidth: '2px',
      lineColor: '#898A97'
    }
  },
  primaryTopic: {
    contentStyle: {
      background: '#F2F2F2',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: '#898A97',
      borderRadius: '4px',
      color: 'rgba(1, 3, 31, 0.85)',
      fontSize: '18px',
      padding: '5px'
    },

    subLinkStyle: {
      lineType: 'round',
      lineRadius: 5,
      lineWidth: '2px',
      lineColor: '#898A97'
    }
  },

  normalTopic: {
    contentStyle: {
      background: '#F2F2F2',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: '#898A97',
      borderRadius: '4px',
      color: 'rgba(1, 3, 31, 0.85)',
      fontSize: '18px',
      padding: '5px'
    },

    subLinkStyle: {
      lineType: 'round',
      lineRadius: 5,
      lineWidth: '1px',
      lineColor: '#898A97'
    }
  }
};
