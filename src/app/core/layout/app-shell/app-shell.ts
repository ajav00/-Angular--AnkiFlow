import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MobileNavigation } from '../mobile-navigation/mobile-navigation';
import { Sidebar } from '../sidebar/sidebar';
import { Topbar } from '../topbar/topbar';

@Component({
  selector: 'af-app-shell',
  imports: [RouterOutlet, Sidebar, Topbar, MobileNavigation],
  templateUrl: './app-shell.html',
  styleUrl: './app-shell.scss',
})
export class AppShell {}
