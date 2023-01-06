import { Router } from 'express';
import Model from "../db/models/index.js";

const responsesRouter = Router();

responsesRouter.get('/form/:id/responses', async (request, response) => {
  try {
    const formId = request.params.id;
    const questionList = await Model.Questions.findAll({
      where: {
        form_id: formId
      }
    });
    const questionIds = questionList.map(each => each.dataValues.id);
    const responsesList = await Model.Responses.findAll({
      where: {
        form_id: formId,
        question_id: questionIds
      },
    });

    let updatedQuestionList = questionList.map(eachQues => eachQues.dataValues)
    let updatedResponsesList = responsesList.map(eachResponse => eachResponse.dataValues)

    let allQuestionResponses = {}
    updatedQuestionList.forEach(eachQues => {
      allQuestionResponses[eachQues.text] = [];
      updatedResponsesList.forEach(eachRes => {
        if (eachQues.id === eachRes.question_id) {
          allQuestionResponses[eachQues.text].push(eachRes.response)
        }
      })
    });
    response.status(200).send(allQuestionResponses);
  } catch (err) {
    response.status(500).send(err);
  }
});

responsesRouter.post('/form/responses', async (request, response) => {
  try {
    const formId = parseInt(request.body.formId);
    const responses = request.body.responses.map((eachResponse) => {
      return {
        form_id: formId,
        question_id: eachResponse.questionId,
        response: eachResponse.response
      }
    })
    await Model.Responses.bulkCreate(responses)
    response.status(200).send('Response successfully saved');
  } catch (err) {
    response.status(500).send(err);
  }
});

export default responsesRouter;