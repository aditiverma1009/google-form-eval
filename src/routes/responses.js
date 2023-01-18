import { text } from "express";
import { Router } from "express";
import Model from "../db/models/index.js";
import { body } from "express-validator";

const responsesRouter = Router();

// needs form title too
responsesRouter.get("/form/:id/responses", async (request, response) => {
  try {
    const formId = request.params.id;
    const questionList = await Model.Questions.findAll({
      where: {
        form_id: formId,
      },
    });
    const questionIds = questionList.map((each) => each.dataValues.id);
    const responsesList = await Model.Responses.findAll({
      where: {
        form_id: formId,
        question_id: questionIds,
      },
    });

    let updatedQuestionList = questionList.map(
      (eachQues) => eachQues.dataValues
    );
    let updatedResponsesList = responsesList.map(
      (eachResponse) => eachResponse.dataValues
    );

    let allQuestionResponses = {};
    updatedQuestionList.forEach((eachQues) => {
      allQuestionResponses[eachQues.text] = [];
      updatedResponsesList.forEach((eachRes) => {
        if (eachQues.id === eachRes.question_id) {
          allQuestionResponses[eachQues.text].push(eachRes.response);
        }
      });
    });
    response.status(200).send(allQuestionResponses);
  } catch (err) {
    response.status(500).send(err);
  }
});

const validateFields = (allResponses) => {
  return true;
};
// needs to send error for not sending required fields
// need to send error if type does not match text type/ length
responsesRouter.post("/form/responses", async (request, response) => {
  validateFields(request.body.responses);

  try {
    validateFields(request.body.responses);
    const formId = parseInt(request.body.formId);
    const responses = request.body.responses.map((eachResponse) => {
      return {
        form_id: formId,
        question_id: eachResponse.questionId,
        response: eachResponse.response,
      };
    });
    await Model.Responses.bulkCreate(responses);
    response.status(200).send({ message: "Response successfully saved" });
  } catch (err) {
    response.status(500).send(err);
  }
});

export default responsesRouter;
