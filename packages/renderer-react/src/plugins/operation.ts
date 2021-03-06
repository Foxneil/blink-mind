import { DocModelModifier, OpType } from '@stayfocus/core';
import debug from 'debug';
import { isReadOnlyModeEnabledOpt } from '../utils/readonly-util';
const log = debug('plugin:operation');

export function OperationPlugin() {
  const {
    addSheet,
    setCurrentSheet,
    duplicateSheet,
    deleteSheet,
    setSheetTitle,

    addChild,
    addSibling,
    addMultiTopics,
    addMultiChild,
    addMultiChildWithExtData,
    addMultiSibling,
    toggleCollapse,
    collapseAll,
    expandAll,
    expandTo,
    focusTopic,
    topicContentToPlainText,
    setFocusMode,
    deleteTopics,
    setTopicBlockData,
    setTopicBlockContentData,
    deleteTopicBlock,
    setStyle,
    clearAllCustomStyle,
    setTheme,
    setConfig,
    setLayoutDir,
    setEditorRootTopicKey,
    startEditingContent,
    startEditingDesc,
    dragAndDropBegin,
    dragAndDrop,
    dragAndDropEnd,
    swapUp,
    swapDown
  } = DocModelModifier;
  const OpMap = new Map([
    [OpType.ADD_SHEET, addSheet],
    [OpType.SET_CURRENT_SHEET, setCurrentSheet],
    [OpType.DELETE_SHEET, deleteSheet],
    [OpType.DUPLICATE_SHEET, duplicateSheet],
    [OpType.SET_SHEET_TITLE, setSheetTitle],

    [OpType.TOGGLE_COLLAPSE, toggleCollapse],
    [OpType.COLLAPSE_ALL, collapseAll],
    [OpType.EXPAND_ALL, expandAll],
    [OpType.EXPAND_TO, expandTo],
    [OpType.ADD_CHILD, addChild],
    [OpType.ADD_SIBLING, addSibling],
    [OpType.ADD_MULTI_TOPICS, addMultiTopics],
    [OpType.ADD_MULTI_CHILD, addMultiChild],
    [OpType.ADD_MULTI_CHILD_WITH_EXTDATA, addMultiChildWithExtData],
    [OpType.ADD_MULTI_SIBLING, addMultiSibling],
    [OpType.DELETE_TOPIC, deleteTopics],
    [OpType.FOCUS_TOPIC, focusTopic],
    [OpType.SET_FOCUS_MODE, setFocusMode],
    [OpType.SET_STYLE, setStyle],
    [OpType.CLEAR_ALL_CUSTOM_STYLE, clearAllCustomStyle],

    [OpType.SET_CONFIG, setConfig],
    [OpType.SET_THEME, setTheme],
    [OpType.TOPIC_CONTENT_TO_PLAIN_TEXT, topicContentToPlainText],
    [OpType.SET_TOPIC_BLOCK, setTopicBlockData],
    [OpType.SET_TOPIC_BLOCK_CONTENT, setTopicBlockContentData],
    [OpType.DELETE_TOPIC_BLOCK, deleteTopicBlock],
    [OpType.START_EDITING_CONTENT, startEditingContent],
    [OpType.DESC_OPEN, startEditingDesc],
    [OpType.DRAG_AND_DROP, dragAndDrop],
    [OpType.DRAG_AND_DROP_BEGIN, dragAndDropBegin],
    [OpType.DRAG_AND_DROP_END, dragAndDropEnd],
    [OpType.SET_EDITOR_ROOT, setEditorRootTopicKey],
    [OpType.SET_LAYOUT_DIR, setLayoutDir],
    [OpType.SWAP_UP, swapUp],
    [OpType.SWAP_DOWN, swapDown]
  ]);

  let enabled = true;
  let whiteListOperation = new Set<string>();

  return {
    isOperationEnabled(props) {
      return enabled;
    },

    enableOperation() {
      enabled = true;
    },

    disableOperation({ whiteList }) {
      enabled = false;
      if (whiteList) whiteListOperation = new Set(whiteList);
      else whiteListOperation.clear();
    },

    /** plugin can extend Operation Map
     * for example: A plugin can write a function
     * getOpMap(ctx,next) {
     *   let opMap = next();
     *   opMap.set("OpTypeName",opFunc);
     *   return opMap;
     * }
     * @param ctx
     */
    getOpMap(ctx) {
      return OpMap;
    },

    //TODO 有空重构这个函数
    operation(ctx) {
      if (ctx.controller.docModel) {
        ctx = {
          ...ctx,
          docModel: ctx.controller.docModel,
          model: ctx.controller.docModel.currentSheetModel
        };
      }
      const { controller, opType, docModel, opArray, callback } = ctx;
      if (opArray != null && !Array.isArray(opArray)) {
        throw new Error('operation: the type of opArray must be array!');
      }
      if (opType != null && opArray != null) {
        throw new Error('operation: opType and opArray conflict!');
      }
      const isOperationEnabled = controller.run('isOperationEnabled', ctx);
      if (!isOperationEnabled) {
        // warning(
        //   true,
        //   `You have disabled operation,but you run operation ${props} now!`
        // );
        if (whiteListOperation.size === 0) return;

        if (opArray != null) {
          const opNotInWhiteList = opArray.filter(
            op => !whiteListOperation.has(op.opType)
          );
          if (opNotInWhiteList && opNotInWhiteList.length > 0) {
            return;
          }
        } else if (!whiteListOperation.has(opType)) {
          return;
        }
      }

      log('operation:', opType || opArray.map(op => op.opType), ctx);

      const opMap = controller.run('getOpMap', ctx);
      controller.run('beforeOperation', ctx);
      let event = {};
      let newDocModel;
      if (opArray != null) {
        newDocModel = opArray.reduce((acc, cur) => {
          const { opType } = cur;
          if (!opMap.has(opType))
            throw new Error(`opType:${opType} not exist!`);
          const opFunc = opMap.get(opType);
          const opFuncProps = { controller, ...cur, docModel: acc };
          let res = controller.run('beforeOpFunction', opFuncProps);
          const opResult = opFunc({ ...opFuncProps, docModel: res });
          res = opResult.docModel;
          res = controller.run('afterOpFunction', {
            ...opFuncProps,
            docModel: res
          });
          return res;
        }, docModel);
      } else {
        if (!opMap.has(opType)) throw new Error(`opType:${opType} not exist!`);
        const opFunc = opMap.get(opType);
        newDocModel = controller.run('beforeOpFunction', ctx);
        const opResult = opFunc({ ...ctx, docModel: newDocModel });
        newDocModel = opResult.docModel;
        newDocModel = controller.run('afterOpFunction', {
          ...ctx,
          docModel: newDocModel
        });
        event = opResult;
      }
      event['opType'] = opType;
      event['ctx'] = ctx;
      // log(
      //   'newDocModel:',
      //   newDocModel,
      //   newDocModel.currentSheetModel.focusKey,
      //   //TODO currentFocusTopic可能为空
      //   newDocModel.currentSheetModel.currentFocusTopic &&
      //     newDocModel.currentSheetModel.currentFocusTopic.contentData
      // );
      if (controller.run('getAllowUndo', ctx) && newDocModel !== docModel) {
        const { undoStack } = controller.run('getUndoRedoStack', ctx);
        controller.run('setUndoStack', {
          ...ctx,
          undoStack: undoStack.push(docModel)
        });
      }
      if(!(ctx.controller && ctx.controller.model.config&& ctx.controller.model.config.readOnly && !isReadOnlyModeEnabledOpt(opType) )){
        controller.change(event, callback ? callback(newDocModel) : null);
      }

      controller.run('afterOperation', ctx);

      // log(controller.model);
    },

    deleteRefKey(ctx) {},

    // 在整个Operation执行之前被调用
    beforeOperation(props) {},
    afterOperation(props) {},

    // 在单个OpFunction执行之前被调用
    beforeOpFunction(ctx) {
      const { docModel } = ctx;
      return docModel;
    },

    afterOpFunction(ctx) {
      return ctx.docModel;
    },

    openNewDocModel(ctx) {
      const { controller, newDocModel } = ctx;
      controller.run('operation', {
        ...ctx,
        opType: OpType.EXPAND_TO,
        model: newDocModel.currentSheetModel,
        topicKey: newDocModel.currentSheetModel.focusKey,
        docModel: newDocModel,
        callback: docModel => () => {
          controller.run('moveTopicToCenter', {
            ...ctx,
            docModel,
            topicKey: docModel.currentSheetModel.focusKey
          });
        }
      });
    }
  };
}
