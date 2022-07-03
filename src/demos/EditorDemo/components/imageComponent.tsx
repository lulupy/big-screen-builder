import { ComponentModel } from "../../../editor";

const Image = () => { 
  return <div>Image</div>;
}

const ViewImage = () => {
  return <div>Image</div>;
}

const imageComponent = new ComponentModel({
  name: 'image',
  label: '图片',
  icon: '',
  properties: [],
  actions: [],
  events: [],
  dataFields: [],
  Component: Image,
  ViewComponent: ViewImage,
});


export default imageComponent;