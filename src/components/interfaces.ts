export interface IListComponent {
    type: string;
    options: any;
    list: Array<any>;
    _list: Array<any>;

    openPage(e: Event, item: any): void;
    trackBy(index: number, item: any): string | number;
}
export interface IItemComponent {
    type: string;
    options: any;
    item: any;
    _item: any;
}

