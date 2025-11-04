/// <reference types="@vitest/browser-playwright" />

declare module '*.scss?raw' {
	const content: string;
	export default content;
}