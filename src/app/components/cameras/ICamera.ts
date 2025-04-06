export interface ICamera {
  id?: string;
  name: string;
  sectionId?: string | null;
  streamUrl?: string;
  streamToken?: string;
  lastKnownIp?: string;
  sectionName?: string;
}
