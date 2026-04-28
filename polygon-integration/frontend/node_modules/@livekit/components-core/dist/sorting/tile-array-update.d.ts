import type { TrackReferenceOrPlaceholder } from '../track-reference';
type VisualChanges<T> = {
    dropped: T[];
    added: T[];
};
export type UpdatableItem = TrackReferenceOrPlaceholder | number;
/** Check to see if anything visually changes on the page. */
export declare function visualPageChange<T extends UpdatableItem>(state: T[], next: T[]): VisualChanges<T>;
export declare function findIndex<T extends UpdatableItem>(trackReference: T, trackReferences: T[]): number;
/** Swap items in the complete list of all elements */
export declare function swapItems<T extends UpdatableItem>(moveForward: T, moveBack: T, trackReferences: T[]): T[];
export declare function dropItem<T extends UpdatableItem>(itemToDrop: T, list: T[]): T[];
export declare function divideIntoPages<T>(list: T[], maxElementsOnPage: number): Array<T[]>;
/** Divide the list of elements into pages and and check if pages need updating. */
export declare function updatePages<T extends UpdatableItem>(currentList: T[], nextList: T[], maxItemsOnPage: number): T[];
export {};
//# sourceMappingURL=tile-array-update.d.ts.map