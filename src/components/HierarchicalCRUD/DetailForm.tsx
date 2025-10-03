import React, { useEffect } from 'react';
import { Form, Input, Select } from 'antd';
import { SkillDetail } from '@/services/mockSkillData';
import { DetailFormData } from './types';

const { TextArea } = Input;
const { Option } = Select;

interface DetailFormProps {
  form: any;
  initialData?: SkillDetail | null;
  skillLevels: string[];
}

const DetailForm: React.FC<DetailFormProps> = ({
  form,
  initialData,
  skillLevels,
}) => {
  useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        skill_level: initialData.skill_level,
        requirements: JSON.stringify(initialData.requirements, null, 2),
      });
    }
  }, [initialData, form]);

  return (
    <Form form={form} layout="vertical">
      <Form.Item
        name="skill_level"
        label="Cấp độ"
        rules={[{ required: true, message: 'Vui lòng chọn cấp độ' }]}
      >
        <Select placeholder="Chọn cấp độ">
          {skillLevels.map(level => (
            <Option key={level} value={level}>
              {level}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="requirements"
        label="Yêu cầu (JSON format)"
        rules={[{ required: true, message: 'Vui lòng nhập yêu cầu' }]}
        extra='Ví dụ: [{"type": "cert", "value": "TOEIC 700 điểm"}]'
      >
        <TextArea
          rows={8}
          placeholder='[{"type": "cert", "value": "TOEIC 700 điểm"}]'
        />
      </Form.Item>
    </Form>
  );
};

export default DetailForm;
