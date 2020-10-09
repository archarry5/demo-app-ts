import { ReleaseItemInput } from './components/release-item-input.js';
import {ReleaseList} from './components/release-list.js';
import {ItemStatus, Domain} from './models/release-item-model.js';
import {releaseItemsState} from './models/release-item-state.js';



new ReleaseList(ItemStatus.DevPending);
new ReleaseList(ItemStatus.CodeReview);
new ReleaseList(ItemStatus.QAPending);
new ReleaseList(ItemStatus.ReadyToRelease);
export const inputForm = new ReleaseItemInput();
releaseItemsState.addOrUpdateReleaseItem('EDB-4', 'First Release Item', ItemStatus.CodeReview, Domain.HR, 'Emp1');
releaseItemsState.addOrUpdateReleaseItem('EDB-5', 'Second Release Item', ItemStatus.DevPending, Domain.Usage, 'Archana');
releaseItemsState.addOrUpdateReleaseItem('EDB-7', 'Third Release Item', ItemStatus.QAPending, Domain.GSCS, 'Emp2');
releaseItemsState.addOrUpdateReleaseItem('EDB-9', 'Fourth Release Item', ItemStatus.ReadyToRelease, Domain.GSCS, 'Emp3');



