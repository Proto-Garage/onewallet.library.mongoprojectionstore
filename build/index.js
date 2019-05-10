"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class default_1 {
    constructor(connection) {
        const schema = new mongoose_1.Schema({
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
            transform: function (doc, ret) {
                ret.id = doc.id;
                delete ret._id;
                delete ret.__v;
            },
        });
        this.model = connection.model('Projection', schema);
    }
    async initialize() {
        await this.model.init();
    }
    async findById(id) {
        const projection = await this.model.findById(id);
        if (projection) {
            return projection.toJSON();
        }
        return null;
    }
    async upsert(params) {
        await this.model.findOneAndUpdate({ _id: params.id }, { _id: params.id, lastEvent: params.lastEvent }, { upsert: true });
        return true;
    }
}
exports.default = default_1;
//# sourceMappingURL=index.js.map