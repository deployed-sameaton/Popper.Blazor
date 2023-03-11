﻿import './popper.min.js'

let popperMap = new Map();
let handlerMap = new Map();

const isChildOf = (parent, element) => {
    console.log(parent, element);
    
    if (element === undefined || element === null) {
        return false;
    }

    if (element === parent) {
        return true;
    }

    return isChildOf(element.parentElement);
}

const addOffClick = (id, content, dotnetRef) => {
    let offClick = (e) => {
        if (isChildOf(content, e.target)) {
            return;
        }

        dotnetRef.invokeMethodAsync('HidePopper').then(() => {
            document.removeEventListener('click', offClick);
            handlerMap.delete(id);
        });
    };

    if (!handlerMap.has(id)) {
        document.addEventListener('click', offClick);
        handlerMap.set(id, offClick);
    }
}

export function createPopper(id, anchor, content, settings, autoClose, dotnetRef) {
    if(popperMap.has(id)) {
        throw "This shouldn't happen in create";
    }
    
    popperMap.set(id, Popper.createPopper(anchor, content, settings));

    if (autoClose) {
        addOffClick(id, content, dotnetRef);
    }
}

export function updatePopper(id, content, settings, autoClose, dotnetRef) {
    if(!popperMap.has(id)) {
        throw "This shouldn't happen in update";
    }
    
    let popper = popperMap.get(id);
    popper.setOptions(settings);

    if (autoClose) {
       addOffClick(id, content, dotnetRef);
    }
}

export function destroyPopper(id) {
    popperMap.delete(id);
    if(handlerMap.has(id)) {
        document.removeEventListener('click', handlerMap.get(id));
        handlerMap.delete(id);
    }
}