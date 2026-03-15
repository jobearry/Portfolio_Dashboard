import { Component } from '@angular/core';
import { TRANSITION_MOVE_UP } from '../../../../shared/constants/styles.constants';
import { LucideAngularModule } from 'lucide-angular';
import { Marquee } from "../../../../components/marquee/marquee";
import { TechStack } from "../tech-stack/tech-stack";

@Component({
  selector: 'app-profile',
  imports: [LucideAngularModule, Marquee, TechStack],
  templateUrl: './profile.html',
  styles: ``,
})
export class Profile {
  TRANSITION_MOVE_UP = TRANSITION_MOVE_UP
}
