import mongoose from "mongoose";
export declare const User: mongoose.Model<{
    name?: string | null;
    email?: string | null;
    password?: string | null;
    role?: string | null;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    name?: string | null;
    email?: string | null;
    password?: string | null;
    role?: string | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    name?: string | null;
    email?: string | null;
    password?: string | null;
    role?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name?: string | null;
    email?: string | null;
    password?: string | null;
    role?: string | null;
}, mongoose.Document<unknown, {}, {
    name?: string | null;
    email?: string | null;
    password?: string | null;
    role?: string | null;
}, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<{
    name?: string | null;
    email?: string | null;
    password?: string | null;
    role?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    [path: string]: mongoose.SchemaDefinitionProperty<undefined, any, any>;
} | {
    [x: string]: mongoose.SchemaDefinitionProperty<any, any, mongoose.Document<unknown, {}, {
        name?: string | null;
        email?: string | null;
        password?: string | null;
        role?: string | null;
    }, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<{
        name?: string | null;
        email?: string | null;
        password?: string | null;
        role?: string | null;
    } & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    name?: string | null;
    email?: string | null;
    password?: string | null;
    role?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    name?: string | null;
    email?: string | null;
    password?: string | null;
    role?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export declare const Quiz: mongoose.Model<{
    questions: mongoose.Types.DocumentArray<{
        options: string[];
        text?: string | null;
        correctOptionIndex?: number | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        options: string[];
        text?: string | null;
        correctOptionIndex?: number | null;
    }> & {
        options: string[];
        text?: string | null;
        correctOptionIndex?: number | null;
    }>;
    title?: string | null;
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    questions: mongoose.Types.DocumentArray<{
        options: string[];
        text?: string | null;
        correctOptionIndex?: number | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        options: string[];
        text?: string | null;
        correctOptionIndex?: number | null;
    }> & {
        options: string[];
        text?: string | null;
        correctOptionIndex?: number | null;
    }>;
    title?: string | null;
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    questions: mongoose.Types.DocumentArray<{
        options: string[];
        text?: string | null;
        correctOptionIndex?: number | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        options: string[];
        text?: string | null;
        correctOptionIndex?: number | null;
    }> & {
        options: string[];
        text?: string | null;
        correctOptionIndex?: number | null;
    }>;
    title?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    questions: mongoose.Types.DocumentArray<{
        options: string[];
        text?: string | null;
        correctOptionIndex?: number | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        options: string[];
        text?: string | null;
        correctOptionIndex?: number | null;
    }> & {
        options: string[];
        text?: string | null;
        correctOptionIndex?: number | null;
    }>;
    title?: string | null;
}, mongoose.Document<unknown, {}, {
    questions: mongoose.Types.DocumentArray<{
        options: string[];
        text?: string | null;
        correctOptionIndex?: number | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        options: string[];
        text?: string | null;
        correctOptionIndex?: number | null;
    }> & {
        options: string[];
        text?: string | null;
        correctOptionIndex?: number | null;
    }>;
    title?: string | null;
}, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<{
    questions: mongoose.Types.DocumentArray<{
        options: string[];
        text?: string | null;
        correctOptionIndex?: number | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        options: string[];
        text?: string | null;
        correctOptionIndex?: number | null;
    }> & {
        options: string[];
        text?: string | null;
        correctOptionIndex?: number | null;
    }>;
    title?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    [path: string]: mongoose.SchemaDefinitionProperty<undefined, any, any>;
} | {
    [x: string]: mongoose.SchemaDefinitionProperty<any, any, mongoose.Document<unknown, {}, {
        questions: mongoose.Types.DocumentArray<{
            options: string[];
            text?: string | null;
            correctOptionIndex?: number | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            options: string[];
            text?: string | null;
            correctOptionIndex?: number | null;
        }> & {
            options: string[];
            text?: string | null;
            correctOptionIndex?: number | null;
        }>;
        title?: string | null;
    }, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<{
        questions: mongoose.Types.DocumentArray<{
            options: string[];
            text?: string | null;
            correctOptionIndex?: number | null;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
            options: string[];
            text?: string | null;
            correctOptionIndex?: number | null;
        }> & {
            options: string[];
            text?: string | null;
            correctOptionIndex?: number | null;
        }>;
        title?: string | null;
    } & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    questions: mongoose.Types.DocumentArray<{
        options: string[];
        text?: string | null;
        correctOptionIndex?: number | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        options: string[];
        text?: string | null;
        correctOptionIndex?: number | null;
    }> & {
        options: string[];
        text?: string | null;
        correctOptionIndex?: number | null;
    }>;
    title?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    questions: mongoose.Types.DocumentArray<{
        options: string[];
        text?: string | null;
        correctOptionIndex?: number | null;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, unknown, {
        options: string[];
        text?: string | null;
        correctOptionIndex?: number | null;
    }> & {
        options: string[];
        text?: string | null;
        correctOptionIndex?: number | null;
    }>;
    title?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=models.d.ts.map