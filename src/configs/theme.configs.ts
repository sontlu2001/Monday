import { ThemeConfig, theme } from "antd";
import colorConfigs from "./color.configs";

const themeModes = {
	light: "light",
	dark: "dark",
};

type tCustomThemeConfig = {
	custom: (mode: string) => ThemeConfig;
};

export const getThemeConfig: tCustomThemeConfig = {
	custom: (mode: string): ThemeConfig => {
		const modeTheme: ThemeConfig =
			mode === themeModes.light
				? {
						token: {
							// colorPrimary: colorConfigs.mainColor,
							// colorTextBase: colorConfigs.black,
						},
						components: {
							Input: {
								algorithm: true,
							},
							Card: {
								headerHeight: 46,
								headerPadding: 16
							},
							Collapse: {
								headerBg: '#ffffff',
							}
						},
						algorithm: theme.defaultAlgorithm,
				  }
				: {
						algorithm: theme.darkAlgorithm,
				  };

		return {
			...modeTheme,
		};
	},
};
