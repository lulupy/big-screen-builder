import React from 'react';
import { Form } from 'antd';
import { IProperty } from '../component';
import { IEditor } from '../editor';

interface IFormItemsProps {
  fields: IProperty[],
  editor: IEditor
};

const FormItems = ({ fields, editor } : IFormItemsProps) => {
  return (
    <>
      {fields.map(field => {
        const { name, type, inputProps = {}, ...other } = field;
        const input = editor.getInputType(type);
        return (
          <Form.Item key={field.name} name={name} {...other}>
            {React.cloneElement(input, inputProps)}
          </Form.Item>
        )
      })}
    </>
  );
}

export default React.memo(FormItems);