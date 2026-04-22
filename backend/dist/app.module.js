"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const participants_module_1 = require("./participants/participants.module");
const participant_entity_1 = require("./participants/participant.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (config) => {
                    const url = config.get('DATABASE_URL');
                    const isProd = config.get('NODE_ENV') === 'production';
                    return {
                        type: 'postgres',
                        url: url,
                        host: !url ? '127.0.0.1' : undefined,
                        port: !url ? 5432 : undefined,
                        username: !url ? 'postgres' : undefined,
                        password: !url ? config.get('DB_PASS') : undefined,
                        database: !url ? 'tobeone_phuket' : undefined,
                        entities: [participant_entity_1.Participant],
                        ssl: isProd ? { rejectUnauthorized: false } : false,
                        synchronize: !isProd,
                    };
                },
            }),
            participants_module_1.ParticipantsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map