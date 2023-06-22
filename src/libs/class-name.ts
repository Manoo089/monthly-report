interface PredicateMap {
  [key: string]: any;
}
type ClassName = string | PredicateMap;
type ClassNames = ClassName[];

const compactObject = (obj: PredicateMap): string[] =>
  Object.keys(obj).reduce(
    (accumulator: string[], current: string) => (Boolean(obj[current]) ? [...accumulator, current] : accumulator),
    []
  );

const unfoldObject = (list: ClassNames): string[] =>
  list.reduce<string[]>((accumulator: string[], current: ClassName): string[] => {
    if (typeof current === "object") {
      return [...accumulator, ...compactObject(current)];
    } else if (typeof current === "undefined") {
      return accumulator;
    }
    return [...accumulator, current];
  }, []);

const wrapList = (name: ClassNames): ClassNames => (Array.isArray(name) ? name : [name]);

export const buildClassArray = (classNames: ClassNames): string[] => {
  return unfoldObject(wrapList(classNames));
};

const cn = (componentName: string, modifiers: ClassNames = [], globalClassNames: ClassNames = []): string => {
  const modifiersList = buildClassArray(modifiers).map((name: string) => `${componentName}--${name}`);
  const globalClassNameList = buildClassArray(globalClassNames);

  return [componentName, ...modifiersList, ...globalClassNameList].join(" ");
};

export default cn;
