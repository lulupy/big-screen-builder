import React from 'react';
import { Form, Radio, Space } from 'antd';
import FormItems from '../../../../components/FormItems';
import { EditorContext } from '../../../EditorContext';
import { IPage } from '../../../../page';
import { ScaleMode } from '../../../../page/IPage';

interface IPageConfigProps {
  page: IPage,
}

const PageConfig = ({ page } : IPageConfigProps) => {
  const editor = React.useContext(EditorContext);
  if(!editor) {
    throw new Error('editor is necessary!');
  }
  const [form] = Form.useForm();
  const fields = [
    {name: 'height', label: '画布高度', type: 'number', inputProps: {
      onBlur: async () => {
        const { height } = await form.validateFields(['height']);
        page.setHeight(height);
      },
    }},
    {name: 'width', label: '画布宽度', type: 'number', inputProps: {
      onBlur: async () => {
        const { width } = await form.validateFields(['width']);
        page.setWidth(width);
      },
    }},
    {name: 'backgroundColor', label: '背景颜色', type: 'color', inputProps: {
      onBlur: async () => {
        const { backgroundColor } = await form.validateFields(['backgroundColor']);
        console.log(page, 'onBlur')
        page.setBackgroundColor(backgroundColor);
      },
    }},
  ];

  React.useEffect(() => {
    const values = {
      ...page.size,
      backgroundColor: page.backgroundColor,
      scaleMode: page.scaleMode,
    };
    form.setFieldsValue(values);
  }, [form, page]);
  return (
    <Form
      form={form}
      labelCol={{ span: 10 }}
      wrapperCol={{ span: 14 }}
    >
      <div style={{
        lineHeight: '50px',
        textAlign: 'center',
      }}>画布配置</div>
      <FormItems fields={fields} editor={editor} />
      <Form.Item
        label="画布缩放"
        name="scaleMode"
      >
        <Radio.Group onChange={(event) => {
          page.scaleMode = event.target.value;
        }}>
          <Space direction="vertical">
            <Radio value={ScaleMode.uniform}>等比缩放</Radio>
            <Radio value={ScaleMode.stretch}>拉伸</Radio>
            <Radio value={ScaleMode.filled}>充满屏幕</Radio>
            <Radio value={ScaleMode.noScale}>保持原始尺寸</Radio>
          </Space>
        </Radio.Group>
      </Form.Item>
    </Form>
  );
}

export default React.memo(PageConfig);