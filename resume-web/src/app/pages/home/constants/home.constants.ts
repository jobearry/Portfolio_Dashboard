import { About } from '../components/about';
import { Timeline } from '../components/timeline/timeline';
import { TIMELINE_EVENTS } from '../components/timeline/timeline.constants';
import { Highlights } from '../../projects/components/highlights';
import { PROJECT_HIGHLIGHT } from '../../projects/constants/project.constant';
import { BlockContent } from '../types/block.type';
import { Heatmap } from '../../../features/github/components/heatmap';
import { Maintenance } from '../../../components/maintenance';

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
    title: 'Github Heatmap',
    class: 'md:col-span-2',
    icon: 'ChartScatter',
    content: Heatmap,
  },
];

export const MAIN_BLOCK_CONTENT: BlockContent<any>[] = [
  // {
  //   id: 'main_block_1',
  //   title: 'Recent Rrojects',
  //   class: 'md:col-span-2 md:bg-transparent',
  //   icon: 'Blocks',
  //   content: Highlights,
  //   inputs: { data: PROJECT_HIGHLIGHT },
  // },
  {
    id: 'main_block_2',
    title: '',
    class: 'md:col-span-2 md:bg-transparent',
    icon: 'Blocks',
    content: Maintenance,
    inputs: { subtitle: "making more features" },
  },
];
