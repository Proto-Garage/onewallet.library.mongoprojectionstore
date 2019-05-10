import { ProjectionStore, ID } from 'onewallet.library.framework';
import { Connection, Document, Model, Schema } from 'mongoose';

interface ProjectionAttributes {
  id: string;
  lastEvent: string;
}

export default class implements ProjectionStore {
  private model: Model<Document & ProjectionAttributes>;
  constructor(connection: Connection) {
    const schema = new Schema({
      _id: {
        type: String,
        required: true,
      },
      lastEvent: {
        type: String,
        required: true,
      },
    });

    schema.set('toJSON', {
      transform: function(doc: any, ret: any) {
        ret.id = doc.id;
        delete ret._id;
        delete ret.__v;
      },
    });

    this.model = connection.model<Document & ProjectionAttributes>(
      'Projection',
      schema
    );
  }

  async initialize() {
    await this.model.init();
  }
  async findById(id: ID) {
    const projection = await this.model.findById(id);

    if (projection) {
      return projection.toJSON();
    }

    return null;
  }
  async upsert(params: ProjectionAttributes) {
    await this.model.findOneAndUpdate(
      { _id: params.id },
      { _id: params.id, lastEvent: params.lastEvent },
      { upsert: true }
    );
    return true;
  }
}
