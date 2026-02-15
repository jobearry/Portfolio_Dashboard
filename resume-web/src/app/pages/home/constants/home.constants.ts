import { Type } from '@angular/core';
import { Profile } from '../components/profile/profile';
import { About } from '../components/about';
import { Timeline } from '../components/timeline/timeline';
import { TIMELINE_EVENTS } from '../components/timeline/timeline.constants';
import { Highlights } from '../../projects/components/highlights';
import { PROJECT_HIGHLIGHT } from '../../projects/constants/project.constant';
import { BlockContent } from '../types/block.type';

export const SIDE_BLOCK_CONTENT: BlockContent<any>[] = [
  {
    id: 'side_block_1',
    class: 'md:col-span-2 bg-transparent',
    icon: '',
    content: Profile,
  },
  {
    id: 'side_block_2',
    title: 'About',
    class: 'md:col-span-2 bg-transparent',
    icon: 'IdCard',
    content: About,
  },
  {
    id: 'side_block_3',
    title: 'Timeline',
    class: 'md:col-span-2 bg-transparent',
    icon: 'History',
    content: Timeline,
    inputs: { data: TIMELINE_EVENTS },
  },
];

export const MAIN_BLOCK_CONTENT: BlockContent<any>[] = [
  {
    id: 'main_block_1',
    title: 'Recent Rrojects',
    class: 'md:col-span-2',
    icon: 'Blocks',
    content: Highlights,
    inputs: { data: PROJECT_HIGHLIGHT, hasBtn: true },
  },
];
