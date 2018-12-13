"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class default_1 {
    constructor() {
        const schema = new mongoose_1.default.Schema({
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
        this.model = mongoose_1.default.model('Projection', schema);
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