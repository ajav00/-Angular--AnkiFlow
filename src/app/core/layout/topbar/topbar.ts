import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Avatar } from '../../../shared/ui/avatar/avatar';
import { IconButton } from '../../../shared/ui/icon-button/icon-button';
import { Icon } from '../../../shared/ui/icon/icon';

@Component({
  selector: 'af-topbar',
  imports: [Avatar, IconButton, Icon],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
})
export class Topbar {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly displayName = computed(() => {
    const user = this.authService.currentUser();
    return user ? `${user.name} ${user.lastName}`.trim() || user.userName : 'Guest';
  });

  protected logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
