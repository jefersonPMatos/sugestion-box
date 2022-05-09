"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const nodemailer_mail_adapter_1 = require("./adapters/nodemailer/nodemailer-mail-adapter");
const prisma_feedback_repository_1 = require("./repositories/prisma/prisma-feedback-repository");
const submit_feedback_1 = require("./services/submit-feedback");
exports.routes = express_1.default.Router();
exports.routes.post("/feedbacks", async (req, res) => {
    const { type, comment, screenshot } = req.body;
    const prismaFeedbacksRepository = new prisma_feedback_repository_1.PrismaFeedbacksRepository();
    const nodemailerMailAdapter = new nodemailer_mail_adapter_1.NodemailerMailAdapter();
    const submitFeedbackService = new submit_feedback_1.SubmitFeedbackService(prismaFeedbacksRepository, nodemailerMailAdapter);
    await submitFeedbackService.execute({
        type,
        comment,
        screenshot,
    });
    return res.status(201).send();
});
