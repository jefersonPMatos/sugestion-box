"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmitFeedbackService = void 0;
class SubmitFeedbackService {
    constructor(feedbackRepository, mailAdapter) {
        this.feedbackRepository = feedbackRepository;
        this.mailAdapter = mailAdapter;
    }
    async execute(request) {
        const { type, comment, screenshot } = request;
        if (!type) {
            throw new Error('Type is required');
        }
        if (!comment) {
            throw new Error('Comment is required');
        }
        if (screenshot && !screenshot.startsWith('data:imagem/png;base64')) {
            throw new Error('Invalid screenshot format');
        }
        await this.feedbackRepository.create({
            type,
            comment,
            screenshot,
        });
        await this.mailAdapter.sendMail({
            subject: "Novo Feedback",
            body: [
                `<div style="font-family: sans-serif; font-size:16px; color:#111;">`,
                `<p>Tipo do feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                `</div>`,
                screenshot ? `<img src="${screenshot}" />` : ``
            ].join("\n"),
        });
    }
}
exports.SubmitFeedbackService = SubmitFeedbackService;
