import { Button } from 'antd';
import 'antd/dist/antd.css';
import './index.css';
const EditorHtml = () => {
  return (
    <div className='eidtor'>
      <div className='editor__header'>
        <Button>btn1</Button>
        <Button>btn1</Button>
        <Button>btn1</Button>
      </div>
      <div className='editor__content'>
        <div className='editor__menu'>

        </div>
        <div className='editor__page'></div>
        <div className='editor__config'></div>
      </div>
    </div>
  );
}

export default EditorHtml;