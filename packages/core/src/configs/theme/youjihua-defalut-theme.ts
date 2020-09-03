import { ThemeType } from './types';

export const youjihuaDefalutTheme: ThemeType = {
  name: 'youjihuaDefalutTheme',
  randomColor: false,
  background: '#FAFAFB',
  highlightColor: '#01CCA7',
  marginH: 45,
  marginV: 10,
  contentStyle: {
    lineHeight: '1.5'
  },
  linkStyle: {
    lineRadius: 5,
    lineType: 'curve'
  },
  rootTopic: {
    contentStyle: {
      background: 'linear-gradient(40deg, #02809C 0%, #00F6AC 100%)',
      color: '#fff',
      fontSize: '34px',
      borderRadius: '4px',
      padding: '16px 18px 16px 18px',
      border: '3px solid',
      borderImage: 'linear-gradient(40deg, rgba(2, 128, 156, 1), rgba(0, 246, 172, 1)) 3 3'
    },

    subLinkStyle: {
      lineType: 'curve',
      lineWidth: '2px',
      lineColor: '#43a9ff'
    }
  },
  primaryTopic: {
    contentStyle: {
      background: '#F2F2F2',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'rgb(221, 170, 68)',
      borderRadius: '5px',
      color: 'rgb(103,103,103)',
      fontSize: '18px',
      padding: '5px'
    },

    subLinkStyle: {
      lineType: 'round',
      lineRadius: 5,
      lineWidth: '2px',
      lineColor: '#43a9ff'
    }
  },

  normalTopic: {
    contentStyle: {
      background: '#fff',
      borderRadius: '5px',
      color: 'rgb(103,103,103)',
      fontSize: '13px',
      padding: '0',
      boxShadow: '1px 1px 1px #ccc'
    },

    subLinkStyle: {
      lineType: 'round',
      lineRadius: 5,
      lineWidth: '1px',
      lineColor: '#43a9ff'
    }
  }
};
