import { About } from '../components/about';
import { Timeline } from '../components/timeline/timeline';
import { RecentRepositories } from '../components/recent-repositories/recent-repositories';
import { BlockContent } from '../types/block.type';
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
];
