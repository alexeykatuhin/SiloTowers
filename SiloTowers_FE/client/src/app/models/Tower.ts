import { Indicator } from "./Indicator";

export interface Tower {
    id: number;
    name: string;
    indicatorLevel: Indicator;
    indicatorMass: Indicator;
  }