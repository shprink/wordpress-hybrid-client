// Load html in Angular 2
// In content.html use:
// <div [innerHTML]="post.content.rendered | safeHtml " class="entry-body"></div>
// From: https://gist.github.com/klihelp/4dcac910124409fa7bd20f230818c8d1

import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform {
    constructor(private sanitized: DomSanitizer) {
    }
    transform(value: string) {
        return this.sanitized.bypassSecurityTrustHtml(value);
    }
}

