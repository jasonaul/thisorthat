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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var prismadb_1 = require("@/libs/prismadb");
var serverAuth_1 = require("@/libs/serverAuth");
function likeHandlerTwo(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var postId, currentUser_1, post, updatedLikedIdsTwo, post_1, error_1, updatedPost, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Reached the /api/likeTwo endpoint');
                    if (req.method !== 'POST' && req.method !== 'DELETE') {
                        console.log('Invalid request method:', req.method);
                        return [2 /*return*/, res.status(405).end()];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 12, , 13]);
                    postId = req.method === 'POST' ? req.body.postId : req.query.postId;
                    console.log('Post ID:', postId);
                    return [4 /*yield*/, (0, serverAuth_1.default)(req, res)];
                case 2:
                    currentUser_1 = (_a.sent()).currentUser;
                    console.log('Current user:', currentUser_1);
                    if (!postId || typeof postId !== 'string') {
                        console.log('Invalid ID:', postId);
                        throw new Error('Invalid ID');
                    }
                    return [4 /*yield*/, prismadb_1.default.post.findUnique({
                            where: {
                                id: postId,
                            },
                        })];
                case 3:
                    post = _a.sent();
                    console.log('Post:', post);
                    if (!post) {
                        console.log('Post not found');
                        throw new Error('Invalid ID');
                    }
                    updatedLikedIdsTwo = __spreadArray([], (post.likedIdsTwo || []), true);
                    if (!(req.method === 'POST')) return [3 /*break*/, 10];
                    updatedLikedIdsTwo.push(currentUser_1.id);
                    _a.label = 4;
                case 4:
                    _a.trys.push([4, 9, , 10]);
                    return [4 /*yield*/, prismadb_1.default.post.findUnique({
                            where: {
                                id: postId
                            }
                        })];
                case 5:
                    post_1 = _a.sent();
                    if (!(post_1 === null || post_1 === void 0 ? void 0 : post_1.userId)) return [3 /*break*/, 8];
                    return [4 /*yield*/, prismadb_1.default.notification.create({
                            data: {
                                body: 'Someone voted on an answer!',
                                userId: post_1.userId
                            }
                        })];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, prismadb_1.default.user.update({
                            where: {
                                id: post_1.userId
                            },
                            data: {
                                hasNotification: true
                            }
                        })];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8: return [3 /*break*/, 10];
                case 9:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 10];
                case 10:
                    if (req.method === 'DELETE') {
                        updatedLikedIdsTwo = updatedLikedIdsTwo.filter(function (likedId) { return likedId !== currentUser_1.id; });
                    }
                    return [4 /*yield*/, prismadb_1.default.post.update({
                            where: {
                                id: postId,
                            },
                            data: {
                                likedIdsTwo: updatedLikedIdsTwo,
                            },
                        })];
                case 11:
                    updatedPost = _a.sent();
                    console.log('Updated post:', updatedPost);
                    res.status(200).json(updatedPost);
                    return [3 /*break*/, 13];
                case 12:
                    error_2 = _a.sent();
                    console.log(error_2);
                    res.status(400).end();
                    return [3 /*break*/, 13];
                case 13: return [2 /*return*/];
            }
        });
    });
}
exports.default = likeHandlerTwo;
