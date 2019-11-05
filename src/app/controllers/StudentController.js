import * as Yup from 'yup';

import Student from '../models/Student';

class StudentController {

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().required().email(),
            age: Yup.number().required(),
            weight: Yup.number().required(),
            height: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Todos os campos são necessários!' });
        }

        const { email } = req.body;
        const hasStudent = await Student.findOne({where: { email }});

        if(hasStudent){
            return res.status(400).json({error: 'Estudante já existe na base de dados.'})
        }

        const { id, name, age, weight, height } = await Student.create(req.body);

        return res.json({ id, name, email, age, weight, height });     
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().required().email(),
            age: Yup.number().required(),
            weight: Yup.number().required(),
            height: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Todos os campos são necessários!' });
        }

        const identificado  = req.params.id
        const hasEmail      = req.body.email;
        const student       = await Student.findByPk(identificado);
        
        if(hasEmail != student.email){
            const hasStudent = await Student.findOne({ where: { email: hasEmail } });
            if(hasStudent){
                return res.status(400).json({error: 'Estudante já existe na base de dados.'})
            }
        }

        const { id, name } = await student.update(req.body);
        return res.json({ 
            id,
            name,
            hasEmail
        });
    }

}

export default new StudentController();