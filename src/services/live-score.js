"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scoreTYPE = void 0;
var axios_1 = require("axios");
exports.scoreTYPE = {
    LIVE: 'live',
    UPCOMING: 'upcoming',
    COMPLETED: 'completed',
};
function getScore(type) {
    return __awaiter(this, void 0, void 0, function () {
        var date, config, response, liveScore_1, scoreText_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    console.log(type);
                    date = new Date().getTime();
                    config = {
                        method: 'get',
                        maxBodyLength: Infinity,
                        url: 'https://crictimes.org/data/v1/scores.json?q=' + date,
                    };
                    return [4 /*yield*/, axios_1.default.request(config)];
                case 1:
                    response = _a.sent();
                    liveScore_1 = response.data[type];
                    scoreText_1 = "";
                    console.log(liveScore_1);
                    liveScore_1.forEach(function (element, idx) {
                        if (idx === 0) {
                            if (element.status === "COMPLETED" && liveScore_1.length > 1) {
                                scoreText_1 += "*".concat(liveScore_1[1].series, "*\n").concat(liveScore_1[1].spec, " \n").concat(liveScore_1[1].t_one, " ").concat(liveScore_1[1].t_one_s, " vs ").concat(liveScore_1[1].t_two, " ").concat(liveScore_1[1].t_two_s, "\n").concat(liveScore_1[1].m_status, "\n").concat(liveScore_1[1].dt, "\nStatus: ").concat(liveScore_1[1].status, "\n\n");
                            }
                            scoreText_1 += "*".concat(element.series, "*\n").concat(element.spec, " \n").concat(element.t_one, " ").concat(element.t_one_s, " vs ").concat(element.t_two, " ").concat(element.t_two_s, "\n").concat(element.m_status, "\n").concat(element.dt, "\nStatus: ").concat(element.status);
                        }
                    });
                    console.log(scoreText_1);
                    return [2 /*return*/, scoreText_1];
                case 2:
                    error_1 = _a.sent();
                    console.log("SCORE ERROR", error_1.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.default = getScore;
