import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideFileDown, lucideGithub, lucideMapPin } from '@ng-icons/lucide';
import { TRANSITION_MOVE_UP } from '../../../../shared/constants/styles.constants';
import { ThemeToggler } from '../../../../components/theme-toggler';
import { DashboardLink } from '../../../../components/dashboard-link';
import { Pill } from '../../../../components/pill';
import { site } from '../../../../../../core/config/site.config';
import { environment } from '../../../../../../../environments/environment';

@Component({
  selector: 'app-profile',
  imports: [NgIcon, ThemeToggler, DashboardLink, Pill],
  providers: [provideIcons({ lucideFileDown, lucideGithub, lucideMapPin })],
  templateUrl: './profile.html',
})
export class Profile {
  protected readonly CV_URL = environment.cvURL;
  protected readonly TRANSITION_MOVE_UP = TRANSITION_MOVE_UP;
  protected readonly profileImage = `${site.assets.profileAvatar}`;
}
