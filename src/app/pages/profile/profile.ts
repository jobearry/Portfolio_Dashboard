import { Component } from '@angular/core';
import { Card } from "../../components/card/card";
import {HlmH1, HlmMuted, HlmP} from '@spartan-ng/helm/typography';
import { HlmButton } from "@spartan-ng/helm/button";
import { HlmIcon } from "@spartan-ng/helm/icon";
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMoveRight } from '@ng-icons/lucide';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [HlmH1, HlmMuted, HlmP, HlmButton, HlmIcon, NgIcon, RouterModule],
  templateUrl: './profile.html',
  providers: [provideIcons({lucideMoveRight})],
  styles: ``,
})
export class Profile {
  title = "Jonathan Golimlim";
  description = "Metro Manila | PH";
  content = "Full-stack developer that focuses on developing web applications through Angular and .NET.";
  hasCta = false;
}
