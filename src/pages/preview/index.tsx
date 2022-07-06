import React from 'react';
import editor from '../../default/editor';
import Preview from '../../preview';
const PreviewPage = () => {
  const data = localStorage.getItem('data');
  if(!data) return null;
  const page = editor.deserializePage(JSON.parse(data))
  return <Preview page={page} />;
}

export default PreviewPage;
