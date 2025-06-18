"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./user.validation"), exports);
__exportStar(require("./course.validation"), exports);
__exportStar(require("./module.validation"), exports);
__exportStar(require("./lecture.validation"), exports);
__exportStar(require("./resource.validation"), exports);
__exportStar(require("./quiz.validation"), exports);
__exportStar(require("./question.validation"), exports);
__exportStar(require("./courseProgress.validation"), exports);
__exportStar(require("./enrollment.validation"), exports);
__exportStar(require("./review.validation"), exports);
__exportStar(require("./discussion.validation"), exports);
__exportStar(require("./reply.validation"), exports);
__exportStar(require("./vote.validation"), exports);
