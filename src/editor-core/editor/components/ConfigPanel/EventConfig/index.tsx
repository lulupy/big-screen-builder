import React from 'react';
import { QuestionCircleFilled } from '@ant-design/icons';
import { Cascader, Col, Row, Space, Tooltip } from 'antd';
import { IItem } from '../../../../item';
import { IEventItem } from '../../../../item/IItem';
interface IEventConfigProps {
  item: IItem,
}

const EventConfig = ({item}: IEventConfigProps) => {
  const { events } = item.component;
  const page = item.component.getPage();
  const items = page.getItems().filter(itemobj => itemobj.id !== item.id);
  const eventConfigValue = item.getEventConfigValue();

  const options = items
    .filter(item => item.component.actions.length !== 0)
    .map(item => {
    return {
      value: item.id,
      label: item.id,
      children: item.component.actions.map(action => ({
        label: action.label,
        value: action.name,
      })),
    };
  });
  const handleChange = React.useCallback((eventName: string, value: (string | number)[]) => {
    item.setEventConfigValue(eventName, { target: value[0] as string, action: value[1] as string });
  }, []);
  return (
    <div>
      {events.map(event => {
        const eventName = event.name;
        const evnetItem: IEventItem | undefined = eventConfigValue[eventName];
        return (
          <Row key={eventName} style={{ marginBottom: 10 }}>
            <Col span={8}>
              <span style={{ marginRight: 5 }}>{event.label}</span>
              <Tooltip title={event.description}>
                <QuestionCircleFilled />
              </Tooltip>
              
            </Col>
            <Col span={16}>
              <Cascader
                options={options}
                onChange={handleChange.bind(null, event.name)}
                defaultValue={evnetItem ? [evnetItem.target, evnetItem.action] : []}
              />
            </Col>
          </Row>
        );
      })}
    </div>
  );
}

export default React.memo(EventConfig);