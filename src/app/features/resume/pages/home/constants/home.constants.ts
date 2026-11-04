import { About } from '../components/about';
import { Timeline } from '../components/timeline/timeline';
import { TIMELINE_EVENTS } from '../components/timeline/timeline.constants';
import { RecentRepositories } from '../components/recent-repositories/recent-repositories';
import { BlockContent } from '../types/block.type';
import { Maintenance } from '../../../components/maintenance';
import { TechStackList } from '../components/tech-stack-list/tech-stack-list';
import { Certifications } from '../components/certifications/certifications';

export const SIDE_BLOCK_CONTENT: BlockContent[] = [
  {
    id: 'side_block_1',
    title: 'About',
    class: 'md:col-span-2',
    icon: 'lucideIdCard',
    content: About,
  },
  {
    id: 'side_block_2',
    title: 'Timeline',
    class: 'md:col-span-2',
    icon: 'lucideHistory',
    content: Timeline,
    inputs: { data: TIMELINE_EVENTS },
  },
  {
    id: 'side_block_3',
    title: 'Certifications',
    class: 'md:col-span-2',
    icon: 'lucideAward',
    content: Certifications,
  },
];

export const MAIN_BLOCK_CONTENT: BlockContent[] = [
  {
    id: 'main_block_1',
    title: 'Recent Projects',
    class: 'md:col-span-2 md:bg-transparent ',
    icon: 'lucideBlocks',
    content: RecentRepositories,
  },
  {
    id: 'main_block_2',
    title: 'Technical Stack',
    class: 'md:col-span-2 md:bg-transparent',
    icon: 'lucideToolbox',
    content: TechStackList,
  },
  {
    id: 'main_block_3',
    title: '',
    class: 'md:col-span-2 md:bg-transparent',
    content: Maintenance,
    inputs: { subtitle: 'making more features' },
  },
];
