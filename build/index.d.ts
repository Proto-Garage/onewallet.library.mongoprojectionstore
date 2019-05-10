import { ProjectionStore, ID } from 'onewallet.library.framework';
import { Connection } from 'mongoose';
interface ProjectionAttributes {
    id: string;
    lastEvent: string;
}
export default class implements ProjectionStore {
    private model;
    constructor(connection: Connection);
    initialize(): Promise<void>;
    findById(id: ID): Promise<any>;
    upsert(params: ProjectionAttributes): Promise<boolean>;
}
export {};
//# sourceMappingURL=index.d.ts.map