import { About } from '../components/about';
import { Timeline } from '../components/timeline/timeline';
import { TIMELINE_EVENTS } from '../components/timeline/timeline.constants';
import { Highlights } from '../../projects/components/highlights';
import { PROJECT_HIGHLIGHT } from '../../projects/constants/project.constant';
import { BlockContent } from '../types/block.type';
import { Heatmap } from '../../../features/github/components/heatmap';
import { Maintenance } from '../../../components/maintenance';
import { TechStackList } from '../components/tech-stack-list/tech-stack-list';
import { Certifications } from '../components/certifications/certifications';

export const SIDE_BLOCK_CONTENT: BlockContent<any>[] = [
  {
    id: 'side_block_1',
    title: 'About',
    class: 'md:col-span-2',
    icon: 'IdCard',
    content: About,
  },
  {
    id: 'side_block_2',
    title: 'Timeline',
    class: 'md:col-span-2',
    icon: 'History',
    content: Timeline,
    inputs: { data: TIMELINE_EVENTS },
  },
    {
    id: 'side_block_3',
    title: 'Certifications',
    class: 'md:col-span-2',
    icon: 'Award',
    content: Certifications,
  },
  // {
  //   id: 'side_block_4',
  //   title: 'Github Heatmap',
  //   class: 'md:col-span-2',
  //   icon: 'ChartScatter',
  //   content: Heatmap,
  // },
];

export const MAIN_BLOCK_CONTENT: BlockContent<any>[] = [
  {
    id: 'main_block_1',
    title: 'Recent Projects',
    class: 'md:col-span-2 md:bg-transparent ',
    icon: 'Blocks',
    content: Highlights,
    inputs: { data: PROJECT_HIGHLIGHT, style: "" },
  },
  {
    id: 'main_block_2',
    title: 'Technical Stack',
    class: 'md:col-span-2 md:bg-transparent',
    icon: 'Toolbox',
    content: TechStackList,
  },
  {
    id: 'main_block_3',
    title: '',
    class: 'md:col-span-2 md:bg-transparent',
    icon: '',
    content: Maintenance,
    inputs: { subtitle: "making more features" },
  },
];
