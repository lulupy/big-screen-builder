import React from 'react';
import { Form } from 'antd'; 
import FormItems from '../../../../components/FormItems';
import { EditorContext } from '../../../EditorContext';
import { IItem } from '../../../../item';


interface IBaseConfigProps  {
  item: IItem,
};

const rules = [ {required: true} ];

const BaseConfig = ({ item }: IBaseConfigProps) => {
  const { properties } = item.component;
  const editor = React.useContext(EditorContext);
  if(!editor) {
    throw new Error('editor is necessary!');
  }

  const [form] = Form.useForm();
  const fields = [
    {name: 'x', label: '横向位移', type: 'number',rules, inputProps: {
      onBlur: async () => {
        const { x } = await form.validateFields(['x']);
        item.setX(x);
      },
    }},
    {name: 'y', label: '纵向位移', type: 'number', inputProps: {
      onBlur: async () => {
        const { y } = await form.validateFields(['y']);
        item.setY(y);
      },
    }},
    {name: 'width', label: '组件宽度', type: 'number', inputProps: {
      onBlur: async () => {
        const { width } = await form.validateFields(['width']);
        item.setWidth(width);
      },
    }},
    {name: 'height', label: '组件高度', type: 'number', inputProps: {
      onBlur: async () => {
        const { height } = await form.validateFields(['height']);
        item.setHeight(height);
      },
    }},
    {name: 'rotate', label: '旋转', type: 'number', inputProps: {
      onBlur: async () => {
        const { rotate } = await form.validateFields(['rotate']);
        item.setRotate(rotate);
      },
    }},
    ...properties.map(property => ({
      ...property,
      inputProps: {
        onBlur: async () => {
          const { name } = property;
          const values = await form.validateFields([name]);
          item.setPropConfigValue(name, values[name]);
        },
      }
    }))
  ];

  // 监听拖拽改变size, position时, 同步表单数据
  React.useEffect(() => {
    item.on('shapeChange', (shape) => {
      const values = {
        ...shape.size,
        ...shape.position,
        rotate: shape.rotate,
      };
      form.setFieldsValue(values);
    });
  }, [item, form]);

  // 切换currentItem时, 重置表单
  React.useEffect(() => {
    const shape = item.getShape();
    const values = {
      ...shape.size,
      ...shape.position,
      rotate: shape.rotate,
      ...item.getPropConfigValue(),
    };
    form.setFieldsValue(values);
  }, [item, form]);


  return (
    <Form
      form={form}
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 14 }}
    >
      <FormItems fields={fields} editor={editor} />
    </Form>
  );
}

export default React.memo(BaseConfig);