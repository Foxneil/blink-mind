import { defaultTheme, youjihuaDefalutTheme, OpType, SheetModel, ThemeType } from '@stayfocus/core';
import {
  darkTheme1,
  theme1,
  theme2,
  theme3,
  theme4,
  themeRandomColorRound,
  themeRandomColorSquare,
  youjihuaDefalut
} from './themes';

export type ThemeMap = Map<string, ThemeType>;

export function ThemeSelectorPlugin() {
  const themeMap = new Map<string, ThemeType>([
    ['default', defaultTheme],
    ['dark-theme1', darkTheme1],
    ['random-color-square', themeRandomColorSquare],
    ['random-color-round', themeRandomColorRound],
    ['theme1', theme1],
    ['theme2', theme2],
    ['theme3', theme3],
    ['theme4', theme4],
    ['youjihuaDefalut',youjihuaDefalutTheme],
  ]);
  return {
    getAllThemes(props) {
      return themeMap;
    },

    getTheme(props) {
      const { controller, themeKey } = props;
      return controller.run('getAllThemes', props).get(themeKey);
    },

    setTheme(ctx) {
      const { controller, themeKey } = ctx;
      const allThemes: ThemeMap = controller.run('getAllThemes', ctx);
      if (!allThemes.has(themeKey)) {
        throw new Error(`the theme key ${themeKey} is not exist!`);
      }
      console.log("当前主题",themeKey);
      controller.run('operation', {
        ...ctx,
        opType: OpType.SET_THEME,
        theme: allThemes.get(themeKey)
      });
    },
    createNewSheetModel(ctx, next) {
      const { controller, themeKey = 'default' } = ctx;
      const theme = controller.run('getTheme', { ...ctx, themeKey });
      let model: SheetModel = next();
      model = model.setIn(['config', 'theme'], theme);
      return model;
    }
  };
}
