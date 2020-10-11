import { DocModelModifier, OpType } from '@stayfocus/core';
export const ReadOnlyModeEnabledOpt = [
    OpType.COLLAPSE_ALL,
    OpType.EXPAND_ALL,
    OpType.TOGGLE_COLLAPSE,
    OpType.FOCUS_TOPIC,
    OpType.SET_EDITOR_ROOT,
    OpType.INIT
];
export const  isReadOnlyModeEnabledOpt = (opType) => {
    for(const type of ReadOnlyModeEnabledOpt){
        if(opType == type){
            return true;
        }
    }
    return false;
};