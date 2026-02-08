import { Type } from "@angular/core";
import { Profile } from "../components/profile/profile";
export interface BlockContent<T = unknown>{
  id: string
  title?: string
  class?: string
  icon?: string
  description?: string
  content?: Type<T>,
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
  },
]