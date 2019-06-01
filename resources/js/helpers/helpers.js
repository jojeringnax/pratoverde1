import axios from "axios";

export const setChildren = (currentElement, allElements) => {
    let children = [];
    let result = {
        problem: {},
        children: {}
    };

    allElements.forEach(element => {
        if(element.parent_id !== currentElement.id ) {
            return;
        }
        children.push(element);
    });

    result.problem = currentElement;
    children.forEach(el => {
        let hasChildren = false;

        allElements.forEach(problem => {
            if(el.id === problem.parent_id){
                result.children[el.id] = setChildren(el, allElements);
                hasChildren = true;
            }
        });
        if(!hasChildren){
            result.children[el.id] = {problem:el, children: {}}
        }
    });

    return result;

};

export const setProblemsArray = (problems) =>{
    let arrCom = [];
    problems.map(problem => {
        if(!problem.parent_id) {
            arrCom.push(setChildren(problem, problems));
        }
    });
    return arrCom;
};

export const axiosRequest = (url, settings={}, method='get') => {
    return axios[method](url, settings);
};
