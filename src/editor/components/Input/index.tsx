import React, { ChangeEvent } from 'react';
import { Input as AntInput, InputProps } from 'antd';


// 表现与AntInut略有不同, 当没有指定value时， defalutValue改变时，会修改valueState
const Input = (props: InputProps) => {
  const isControlled = 'value' in props;
  const { value, defaultValue, onChange } = props;
  const [valueState, setValueState] = React.useState(isControlled ? value : defaultValue);

  const handleChange = React.useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if(!isControlled) {
      setValueState(event.target.value);
    }
    onChange && onChange(event);
  }, [isControlled, setValueState, onChange]);

  React.useEffect(() => {
    setValueState(defaultValue);
  }, [defaultValue]);
  return <AntInput {...props} value={valueState} onChange={handleChange} />
}

export default React.memo(Input);
