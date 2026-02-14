import { Type } from "@angular/core";
import { Profile } from "../components/profile/profile";
import { About } from "../components/about";
import { Timeline } from "../components/timeline/timeline";
import { TimelineEvents } from "../components/timeline/timeline.constants";

export interface BlockContent<T = unknown>{
  id: string
  title?: string
  class?: string
  icon?: string
  description?: string
  content?: Type<T>,
  inputs?: Record<string, unknown>// set on created compnent
}

export const SIDE_BLOCK_CONTENT: BlockContent<any>[] = [
  {
    id: "side_block_1",
    class: "md:col-span-2",
    icon: "",
    content: Profile
  },
  {
    id: "side_block_2",
    title: "About",
    class: "md:col-span-2",
    icon: "IdCard",
    content: About
  },
  {
    id: "side_block_3",
    title: "Timeline",
    class: "md:col-span-2",
    icon: "History",
    content: Timeline,
    inputs: {data: TimelineEvents}
  },
]