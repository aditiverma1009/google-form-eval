import { Router } from 'express';
import { body } from 'express-validator';
import Model from "../db/models/index.js";
const formsRouter = Router();

formsRouter.get('/forms', async (_, response) => {
  try {
    console.log('here');
    const forms = await Model.Forms.findAll()
    return response.status(200).send(forms);
  } catch (err) {
    return response.status(500).send({ error: err });
  }
});

formsRouter.get('/form/:id', async (request, response) => {
  let form;

  try {
    const formId = parseInt(request.params.id);
    form = await Model.Forms.findOne({
      where: { id: formId },
      // include: [{
      //   model: Model.Questions,
      //   as: 'questions',
      // }],
      attributes: ['title', 'id'],
    });
  } catch (err) {
    response.status(500).send({ error: 'Form could not be found' });
  }
  try {
    const questionList = await Model.Questions.findAll({
      where: {
        form_id: form.dataValues.id
      }
    });
    response.status(200).send({ formDetails: form.dataValues, questionList });
  } catch (err) {
    response.status(500).send({ error: 'Questions could not be found' });
  }
});

formsRouter.post('/form',
  async (request, response) => {
    const formBody = {
      title: request.body.title,
      questions: request.body.questions
    }
    let newForm;
    try {
      newForm = await Model.Forms.create({
        title: formBody.title,
      })
    } catch (err) {
      return response.status(500).send({ error: "Form title cannot be empty" });
    }
    let errorMsg = [];
    request.body.questions.map((eachQues, index) => {
      if (!['DATE', 'SHORTANS', 'LONGANS', 'NUMBER'].includes(eachQues.type)) {
        console.log('1111');
        errorMsg.push(`Questions text for question number ${index} should be date, shortans, logans, or number`);
      }
      if (eachQues.text.length < 1) {
        console.log('222');
        errorMsg.push(`Questions text for question number ${index} should not be empty`)
      }
    })
    if (errorMsg.length > 0) return response.status(500).send({ error: errorMsg });
    try {
      await Model.Questions.bulkCreate(formBody.questions.map((eachQuestion) => {
        return {
          form_id: newForm.id,
          text: eachQuestion.text,
          type: eachQuestion.type,
          is_required: eachQuestion.is_required | false
        }
      }))
      return response.status(200).send({ message: `Form id ${newForm.id} successfully created` });
    } catch (err) {
      response.status(500).send({ error: 'Form could not be created' });
    }
  });

export default formsRouter;