import { Injectable } from '@angular/core';
import menu from '../../config/menu.json';

@Injectable()
export class Menu {
    getRaw = () => menu;
}
