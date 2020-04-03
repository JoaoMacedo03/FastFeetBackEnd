import * as Yup from 'yup';
import Recipient from "../models/Recipient";

class RecipientController {
  async list(req, res) {
    try {
      const recipient = await Recipient.findAll();
      return res.status(200).json(recipient);
    } catch(error) {
      return res.status(401).json(
        { 
          error: 'Something went wrong', 
          message: error.message 
        }
      )      
    }
  }

  async listById(req, res) {
    try {
      const { id } = req.params;
      const recipient = await Recipient.findByPk(id);
      if(!recipient) {
        return res.status(400).json({ error: 'Recipient not found.' });
      } 
      return res.json(recipient);
    } catch(error) {
      return res.status(401).json(
        { 
          error: 'Something went wrong', 
          message: error.message 
        }
      )      
    }
  }

  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string()
          .required(),
        street: Yup.string()
          .required(),
        number: Yup.number()
          .positive()
          .integer()
          .required(),
        complement: Yup.string(),
        state: Yup.string()
          .required()
          .uppercase(),
        city: Yup.string()
          .required(),
        zip_code: Yup.string()
          .required()
      });
      
      if(!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails.' });
      }

      const { id, name, street, number, complement, state, 
        city, zip_code } = await Recipient.create(req.body);
      
      return res.json({
        id, 
        name, 
        street, 
        number, 
        complement, 
        state, 
        city, 
        zip_code
      });
    } catch(error) {
      return res.status(401).json(
        { 
          error: 'Something went wrong', 
          message: error.message 
        }
      )
    }
  }

  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string(),
        street: Yup.string(),
        number: Yup.number()
          .positive()
          .integer(),
        complement: Yup.string(),
        state: Yup.string(),
        city: Yup.string(),
        zip_code: Yup.string()
      });
      
      if(!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation fails.' });
      }

      const { id } = req.params

      const recipient = await Recipient.findByPk(id)

      if(!recipient) {
        return res.status(400).json({ error: 'Recipient not found.' })
      }
      
      const { name, street, number, complement, state, 
        city, zip_code } = await recipient.update(req.body);
      
      return res.json({
        id, 
        name, 
        street, 
        number, 
        complement, 
        state, 
        city, 
        zip_code
      });
    } catch(error) {
      return res.status(401).json(
        { 
          error: 'Something went wrong', 
          message: error.message 
        }
      )
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const recipient = await Recipient.findByPk(id)

      if(!recipient) {
        return res.status(400).json({ error: 'Recipient not found.' })
      }

      await recipient.destroy();
      return res.json({ message: 'Data was deleted.' });
    } catch(error) {
      return res.status(401).json(
        { 
          error: 'Something went wrong', 
          message: error.message 
        }
      )
    }
  }

}

export default new RecipientController();