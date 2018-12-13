import { ProjectionStore, ID } from 'onewallet.library.framework';
interface ProjectionAttributes {
    id: string;
    lastEvent: string;
}
export default class implements ProjectionStore {
    private model;
    constructor();
    initialize(): Promise<void>;
    findById(id: ID): Promise<any>;
    upsert(params: ProjectionAttributes): Promise<boolean>;
}
export {};
//# sourceMappingURL=index.d.ts.map