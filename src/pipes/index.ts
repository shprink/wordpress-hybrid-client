import { HighlightPipe } from './highlight/highlight';
import { SafeHtmlPipe } from './safehtml/safehtml';

export * from './highlight/highlight';
export * from './safehtml/safehtml';

export const PIPES = [
    HighlightPipe,
    SafeHtmlPipe
];
