import { SheetModel } from '@stayfocus/core';

export function generateSimpleModel() {
  return SheetModel.create({
    "sheetModels": [
      {
        "title": "画布1",
        "rootTopicKey": "5f60aec8-a4f9-46e1-96c4-497e38ef0524",
        "editorRootTopicKey": "5f60aec8-a4f9-46e1-96c4-497e38ef0524",
        "focusKey": "5f60aec8-a4f9-46e1-96c4-497e38ef0524",
        "topics": [
          {
            "key": "5f60aec8-a4f9-46e1-96c4-497e38ef0524",
            "parentKey": null,
            "subKeys": [
              "06272534-84a3-4fcc-98d9-67faa5ee214e",
              "a0c7d94e-4bc9-4fae-9fc7-f261a46675dc"
            ],
            "collapse": false,
            "style": null,
            "blocks": [
              {
                "type": "CONTENT",
                "data": "鲍勃"
              }
            ]
          },
          {
            "key": "06272534-84a3-4fcc-98d9-67faa5ee214e",
            "parentKey": "5f60aec8-a4f9-46e1-96c4-497e38ef0524",
            "subKeys": [],
            "collapse": false,
            "style": null,
            "blocks": [
              {
                "type": "CONTENT",
                "data": "我以"
              }
            ]
          },
          {
            "key": "a0c7d94e-4bc9-4fae-9fc7-f261a46675dc",
            "parentKey": "5f60aec8-a4f9-46e1-96c4-497e38ef0524",
            "subKeys": [],
            "collapse": false,
            "style": null,
            "blocks": [
              {
                "type": "CONTENT",
                "data": "问他"
              }
            ]
          }
        ],
        "config": {
          "viewMode": "MindMap",
          "readOnly": false,
          "allowUndo": true,
          "layoutDir": 0,
          "theme": {
            "name": "theme2",
            "randomColor": false,
            "background": "#F3E1E1",
            "highlightColor": "#F5A623",
            "marginH": 45,
            "marginV": 10,
            "contentStyle": {
              "lineHeight": "1.5"
            },
            "linkStyle": {
              "lineRadius": 5,
              "lineType": "curve"
            },
            "rootTopic": {
              "contentStyle": {
                "background": "#50C18A",
                "color": "#fff",
                "fontSize": "34px",
                "borderRadius": "5px",
                "padding": "16px 18px 16px 18px"
              },
              "subLinkStyle": {
                "lineType": "curve",
                "lineWidth": "2px",
                "lineColor": "#43a9ff"
              }
            },
            "primaryTopic": {
              "contentStyle": {
                "background": "#ffffff",
                "borderWidth": "1px",
                "borderStyle": "solid",
                "borderColor": "rgb(221, 170, 68)",
                "borderRadius": "5px",
                "color": "rgb(103,103,103)",
                "fontSize": "18px",
                "padding": "5px"
              },
              "subLinkStyle": {
                "lineType": "round",
                "lineRadius": 5,
                "lineWidth": "2px",
                "lineColor": "#43a9ff"
              }
            },
            "normalTopic": {
              "contentStyle": {
                "background": "#fff",
                "borderRadius": "5px",
                "color": "rgb(103,103,103)",
                "fontSize": "13px",
                "padding": "0",
                "boxShadow": "1px 1px 1px #ccc"
              },
              "subLinkStyle": {
                "lineType": "round",
                "lineRadius": 5,
                "lineWidth": "1px",
                "lineColor": "#43a9ff"
              }
            }
          }
        }
      }
    ],
    "extData": {},
    "currentSheetIndex": 0,
    "formatVersion": "0.1"});
}
