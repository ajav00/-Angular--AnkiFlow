import { Component } from '@angular/core';
import { Avatar } from '../../../shared/ui/avatar/avatar';
import { IconButton } from '../../../shared/ui/icon-button/icon-button';
import { Icon } from '../../../shared/ui/icon/icon';

@Component({
  selector: 'af-topbar',
  imports: [Avatar, IconButton, Icon],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
})
export class Topbar {}
