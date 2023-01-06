import { Router } from 'express';
import Model from "../db/models/index.js";

const formsRouter = Router();

formsRouter.get('/forms', async (_, response) => {
  try {
    console.log('here');
    const forms = await Model.Forms.findAll()
    response.status(200).send(forms);
  } catch (err) {
    response.status(500).send(err);
  }
});


formsRouter.get('/form/:id', async (request, response) => {
  try {
    const formId = parseInt(request.params.id);
    const formTitle = await Model.Forms.findOne({
      attributes: ['title'],
      where: {
        id: formId
      }
    });
    const questionList = await Model.Questions.findAll({
      where: {
        form_id: formId
      }
    });
    response.status(200).send({ formTitle, questionList });
  } catch (err) {
    response.status(500).send(err);
  }
});

formsRouter.post('/form', async (request, response) => {
  try {
    const formBody = {
      title: request.body.title,
      questions: request.body.questions
    }
    let newForm = await Model.Forms.create({
      title: formBody.title,
    })
    await Model.Questions.bulkCreate(formBody.questions.map((eachQuestion) => {
      return {
        form_id: newForm.id,
        text: eachQuestion.text,
        type: eachQuestion.type,
        is_required: eachQuestion.isRequired
      }
    }))
    response.status(200).send('Form successfully created');
  } catch (err) {
    response.status(500).send(`Something went wrong`);
  }
});

export default formsRouter;