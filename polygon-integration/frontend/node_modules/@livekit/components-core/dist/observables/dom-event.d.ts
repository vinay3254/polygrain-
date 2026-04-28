import type { Observable } from 'rxjs';
/**
 * Returns true if the user is interacting with the HTML element,
 * and returns false if there is no interaction for a specified period of time.
 *
 * @internal
 */
export declare function createInteractingObservable(htmlElement: HTMLElement | null, inactiveAfter?: number): Observable<boolean>;
//# sourceMappingURL=dom-event.d.ts.map