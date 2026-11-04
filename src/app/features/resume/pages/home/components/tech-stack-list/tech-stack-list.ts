import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { Pill } from '../../../../components/pill';
import { getContent, SkillsSignalService, Skeleton, StateMessage } from '../../../../../../shared';
import { TechStackItem } from '../../../../../dashboard/core';

interface SkillGroup {
  category: string;
  skills: TechStackItem[];
}

@Component({
  selector: 'app-tech-stack-list',
  imports: [Pill, Skeleton, StateMessage],
  templateUrl: './tech-stack-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TechStackList implements OnInit {
  private readonly skillsService = inject(SkillsSignalService);

  protected readonly state = computed(() => this.skillsService.getState());
  protected readonly groups = computed(() => {
    const groups = new Map<string, TechStackItem[]>();
    for (const skill of this.state().content) {
      const skills = groups.get(skill.category) ?? [];
      skills.push(skill);
      groups.set(skill.category, skills);
    }

    return Array.from(groups, ([category, skills]): SkillGroup => ({ category, skills }));
  });

  ngOnInit(): void {
    void this.load();
  }

  protected load(): Promise<void> {
    return getContent<TechStackItem>('v1/skill', this.skillsService);
  }
}
