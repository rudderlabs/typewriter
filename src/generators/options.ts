// Which RudderStack SDK to generate for.
export enum SDK {
	WEB = 'analytics.js',
	NODE = 'analytics-node',
	IOS = 'analytics-ios',
	ANDROID = 'analytics-android',
}

// Which language to generate clients for.
export enum Language {
	TYPESCRIPT = 'typescript',
	JAVASCRIPT = 'javascript',
	OBJECTIVE_C = 'objective-c',
	SWIFT = 'swift',
	JAVA = 'java',
}

export type TypeScriptOptions = {
	sdk: SDK.WEB | SDK.NODE
	language: Language.TYPESCRIPT
}

export type JavaScriptOptions = {
	sdk: SDK.WEB | SDK.NODE
	language: Language.JAVASCRIPT
	// JavaScript transpilation settings:
	scriptTarget?:
		| 'ES3'
		| 'ES5'
		| 'ES2015'
		| 'ES2016'
		| 'ES2017'
		| 'ES2018'
		| 'ES2019'
		| 'ESNext'
		| 'Latest'
	moduleTarget?: 'CommonJS' | 'AMD' | 'UMD' | 'System' | 'ES2015' | 'ESNext'
}

export type ObjectiveCOptions = {
	sdk: SDK.IOS
	language: Language.OBJECTIVE_C
}

export type SwiftOptions = {
	sdk: SDK.IOS
	language: Language.SWIFT
}

export type JavaOptions = {
	sdk: SDK.ANDROID
	language: Language.JAVA
}

export type Options =
	| JavaScriptOptions
	| ObjectiveCOptions
	| SwiftOptions
	| JavaOptions
	| TypeScriptOptions
