import Model from "../db/models/index.js";

const formsController = () => {
  try {
    return Model.forms.findAll()
  } catch (error) {
    throw new Error('Could not find all forms');
  }
}

export default formsController;