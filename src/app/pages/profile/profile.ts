import { Component } from '@angular/core';
import { Card } from "../../components/card/card";
import {HlmH1, HlmMuted, HlmP} from '@spartan-ng/helm/typography';

@Component({
  selector: 'app-profile',
  imports: [HlmH1, HlmMuted, HlmP],
  templateUrl: './profile.html',
  styles: ``,
})
export class Profile {
  title = "Jonathan Golimlim";
  description = "Metro Manila | PH";
  content = "Full-stack developer that focuses on developing web applications through Angular and .NET.";
  hasCta = false;
}
