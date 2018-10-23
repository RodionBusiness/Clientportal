export type TMerge<MainMap, SideMap> =
  MainMap & Pick<SideMap, Exclude<keyof SideMap, keyof MainMap>>;
