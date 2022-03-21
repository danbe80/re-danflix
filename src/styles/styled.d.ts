import 'styled-components';

// and extend theme!
declare module 'styled-components' {
	export interface DefaultTheme {
		red: {
			normal: string;
			darker: string;
		};
		black: {
			dark: string;
			darker: string;
			lighter: string;
		};
		white: {
			darker: string;
			lighter: string;
		};
		// responsive
		size:{
			mobile: string;
			mobileL: string;
			tablet: string;
			desktop: string;
		};
	}
}