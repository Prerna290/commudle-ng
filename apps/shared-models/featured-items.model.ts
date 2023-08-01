import { ICommunity, ICommunityChannel, ILab, IUser } from '@commudle/shared-models';
import { ICommunityBuild } from './community-build.model';
import { IEvent } from './event.model';

export interface IFeaturedItems {
  id: number;
  reason: string;
  active: boolean;
  entity_type: string;
  entity_id: number;
  community_build: ICommunityBuild;
  event: IEvent;
  community: ICommunity;
  lab: ILab;
  user: IUser;
  community_channel: ICommunityChannel;
}
