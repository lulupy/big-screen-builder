import { ComponentModel } from '../component';
import { PageModel } from '../page';
import EditorModel  from './EditorModel';

describe('EditorModel', () => {
  it('serialize', () => {
    const editor = new EditorModel();
    const buttonComponent = new ComponentModel({name: 'button',label: '按钮', icon: ''});
    const imageComponent = new ComponentModel({name: 'image',label: '图片', icon: ''});

    editor.resisterComponent('button', buttonComponent);
    editor.resisterComponent('image', imageComponent);

    const page = new PageModel();
    editor.setPage(page);
    buttonComponent.addToPage({width: 10, height: 10}, {x: 10, y: 10});
    imageComponent.addToPage({width: 20, height: 20}, {x: 20, y: 20});
    buttonComponent.addToPage({width: 30, height: 30}, {x: 30, y: 30});

    const data = editor.serializePage();
    // 不比较item的id, 因为是生成的，无法确定
    data.items.forEach((item: any) => {
      delete item.id;
    })
    expect(data).toEqual({
      "size": {
        "width": 1000,
        "height": 1000
      },
      "scaleMode": 0,
      "items": [
        {
          // "id": "-1657016141581",
          "size": {
            "width": 10,
            "height": 10
          },
          "position": {
            "x": 10,
            "y": 10
          },
          "rotate": 0,
          "propConfigValue": {},
          "dataConfigValue": {
            "filters": [],
            "dataMaps": {},
            "dataSource": {
              "type": "static",
              "options": {
                "json": "[]"
              }
            }
          },
          "eventConfigValue": {},
          "component": "button"
        },
        {
          // "id": "-1657016141581",
          "size": {
            "width": 20,
            "height": 20
          },
          "position": {
            "x": 20,
            "y": 20
          },
          "rotate": 0,
          "propConfigValue": {},
          "eventConfigValue": {},
          "dataConfigValue": {
            "filters": [],
            "dataMaps": {},
            "dataSource": {
              "type": "static",
              "options": {
                "json": "[]"
              }
            }
          },
          "component": "image"
        },
        {
          // "id": "-1657016141581",
          "size": {
            "width": 30,
            "height": 30
          },
          "position": {
            "x": 30,
            "y": 30
          },
          "rotate": 0,
          "propConfigValue": {},
          "eventConfigValue": {},
          "dataConfigValue": {
            "filters": [],
            "dataMaps": {},
            "dataSource": {
              "type": "static",
              "options": {
                "json": "[]"
              }
            }
          },
          "component": "button"
        }
      ]
    })
    
  });
  it('deserialize', () => {
    const editor = new EditorModel();
    const buttonComponent = new ComponentModel({name: 'button',label: '按钮', icon: ''});
    const imageComponent = new ComponentModel({name: 'image',label: '图片', icon: ''});

    editor.resisterComponent('button', buttonComponent);
    editor.resisterComponent('image', imageComponent);


    const data = {
      "size": {
        "width": 1000,
        "height": 1000
      },
      "scaleMode": 0,
      "items": [
        {
          "id": "-1657016141581",
          "size": {
            "width": 10,
            "height": 10
          },
          "position": {
            "x": 10,
            "y": 10
          },
          "rotate": 0,
          "propConfigValue": {},
          "dataConfigValue": {
            "filters": [],
            "dataMaps": {},
            "dataSource": {
              "type": "static",
              "options": {
                "json": "[]"
              }
            }
          },
          "component": "button"
        },
        {
          "id": "-1657016141581",
          "size": {
            "width": 20,
            "height": 20
          },
          "position": {
            "x": 20,
            "y": 20
          },
          "rotate": 0,
          "propConfigValue": {},
          "dataConfigValue": {
            "filters": [],
            "dataMaps": {},
            "dataSource": {
              "type": "static",
              "options": {
                "json": "[]"
              }
            }
          },
          "component": "image"
        },
        {
          "id": "-1657016141581",
          "size": {
            "width": 30,
            "height": 30
          },
          "position": {
            "x": 30,
            "y": 30
          },
          "rotate": 0,
          "propConfigValue": {},
          "dataConfigValue": {
            "filters": [],
            "dataMaps": {},
            "dataSource": {
              "type": "static",
              "options": {
                "json": "[]"
              }
            }
          },
          "component": "button"
        }
      ]
    };
    const page = editor.deserializePage(data);
    expect(page.items.length).toBe(3);
    expect(page.items[0].id).toBe('-1657016141581');
  });
});