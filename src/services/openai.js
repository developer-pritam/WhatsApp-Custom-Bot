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
exports.generateRandomFact = void 0;
var fs_1 = require("fs");
var axios_1 = require("axios");
if (fs_1.default.existsSync('config.env')) {
    require('dotenv').config({ path: './config.env' });
}
else {
    require('dotenv');
}
var randomizationKey = (Math.random() * 10000000).toFixed(0);
var AZURE_OPENAI_KEY = process.env.AZURE_OPENAI_KEY;
console.log(AZURE_OPENAI_KEY);
function generateRandomFact() {
    return __awaiter(this, void 0, void 0, function () {
        var randomNo, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    randomNo = Math.floor(Math.random() * 100);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, axios_1.default)({
                            method: 'post',
                            url: 'https://openai-pingolearn-prod-global-01.openai.azure.com/openai/deployments/pritam-test/completions?api-version=2022-12-01',
                            headers: {
                                'Content-Type': 'application/json',
                                'api-key': process.env.AZURE_OPENAI_KEY || 'YOUR_AZURE_OPENAI_KEY'
                            },
                            data: {
                                "prompt": "Generate just one ".concat(randomNo > 50 ? "random" : "romantic", " hard/uncommon english word used in conversation with meaning. Use the key passed in prompt to randomize the response (Key = ").concat(randomizationKey, ").\n\nWord: *Fool\u2019s Gold*\nMeaning: Iron Pyrites, a worthless rock that resembles real gold\n\nWord: "),
                                "max_tokens": 200,
                                "temperature": 0.9,
                                "frequency_penalty": 0,
                                "presence_penalty": 0.5,
                                "top_p": 0.78,
                                "stop": "\n\n"
                            }
                        })];
                case 2:
                    response = _a.sent();
                    console.log("RANDOM FACT");
                    console.log(response.data.choices[0].text);
                    return [2 /*return*/, response.data.choices[0].text.trim()];
                case 3:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.generateRandomFact = generateRandomFact;
