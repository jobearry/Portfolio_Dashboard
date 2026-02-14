import { Type } from "@angular/core";

export interface BlockContent<T = unknown> {
  id: string;
  title?: string;
  class?: string;
  icon?: string;
  description?: string;
  content?: Type<T>;
  inputs?: Record<string, unknown>; // set on created compnent
}