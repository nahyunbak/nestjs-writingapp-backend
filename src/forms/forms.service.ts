import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Form, FormDocument } from './forms.schema';
import { CreateFormDto } from 'src/dto/create-form.dto';

@Injectable()
export class FormsService {
  constructor(@InjectModel(Form.name) private formModel: Model<FormDocument>) {}
  // 첫 생성하기: level은 뭐냐 그거지 params로 받아오고, userid는 body에서 받아오고,
  // title은 form에서 가져오고, answer만 가져오면 됨.

  async create(createFormDto: CreateFormDto): Promise<Form> {
    const createForm = new this.formModel(createFormDto);
    return createForm.save();
  }

  async getFormInfo(formId: string): Promise<Form> {
    const formInfo = this.formModel.findOne({ formId: formId });

    return formInfo.exec();
  }
}
