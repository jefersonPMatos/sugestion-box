"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const submit_feedback_1 = require("./submit-feedback");
const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();
const submitFeedback = new submit_feedback_1.SubmitFeedbackService({ create: createFeedbackSpy }, { sendMail: sendMailSpy });
describe("Submit feedback", () => {
    it("should be able to submit a feedback", async () => {
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "example comment",
            screenshot: "teste.jpg",
        })).resolves.not.toThrow();
        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });
    it("should not ble able to submit feedback without type", async () => {
        await expect(submitFeedback.execute({
            type: "",
            comment: "example comment",
            screenshot: "teste.jpg",
        })).rejects.toThrow();
    });
    it("should not ble able to submit feedback without comment", async () => {
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "",
            screenshot: "teste.jpg",
        })).rejects.toThrow();
    });
    it("should not ble able to submit feedback with an invalid screenshot", async () => {
        await expect(submitFeedback.execute({
            type: "BUG",
            comment: "example comment",
            screenshot: "teste.jpg",
        })).rejects.toThrow();
    });
});
