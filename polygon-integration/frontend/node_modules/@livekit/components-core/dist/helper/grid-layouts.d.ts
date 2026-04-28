/**
 * @public
 */
export type GridLayoutDefinition = {
    /** Column count of the grid layout. */
    columns: number;
    /** Row count of the grid layout. */
    rows: number;
    /**
     * Minimum grid container width required to use this layout.
     * @remarks
     * If this constraint is not met, we try to select a layout with fewer tiles
     * (`tiles=columns*rows`) that is within the constraint.
     */
    minWidth?: number;
    /**
     * Minimum grid container height required to use this layout.
     * @remarks
     * If this constraint is not met, we try to select a layout with fewer tiles
     * (`tiles=columns*rows`) that is within the constraint.
     */
    minHeight?: number;
    /**
     * For which orientation the layout definition should be applied.
     * Will be used for both landscape and portrait if no value is specified.
     */
    orientation?: 'landscape' | 'portrait';
};
export type GridLayoutInfo = {
    /** Layout name (convention `<column_count>x<row_count>`). */
    name: string;
    /** Column count of the layout. */
    columns: number;
    /** Row count of the layout. */
    rows: number;
    /** Maximum tiles that fit into this layout. */
    maxTiles: number;
    /** Minimum width required to use this layout. */
    minWidth: number;
    /** Minimum height required to use this layout. */
    minHeight: number;
    orientation?: 'landscape' | 'portrait';
};
export declare const GRID_LAYOUTS: GridLayoutDefinition[];
export declare function selectGridLayout(layoutDefinitions: GridLayoutDefinition[], participantCount: number, width: number, height: number): GridLayoutInfo;
/**
 * @internal
 */
export declare function expandAndSortLayoutDefinitions(layouts: GridLayoutDefinition[]): GridLayoutInfo[];
//# sourceMappingURL=grid-layouts.d.ts.map